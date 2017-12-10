import React from "react"
import Board from "../components/Board"
import io from 'socket.io-client';
import TurnDetails from "../components/TurnDetails"
import ShipValidation from "../components/ShipValidation"

class GameContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      thisPlayerTurn: null,
      shipsToPlace: [5,4,3,3,2],
      currentShipPlacementSquares: [],
      primarySquares: [],
      targetSquares: [],
      previousGuesses: [],
      socket: null,
      filledSquares: 0,
      guessedSquare: null,
      targetedSquare: null,
      hitCount: 0,
      validationMessage: "",
      playerReady: false,
      opponentReady: false,
      gameWon: false
    }


    // Socket set-up and event handlers

    this.socket = io("http://localhost:3000")

    this.socket.on('connect', () => {
      this.setState({socket: this.socket.id})
    })

    this.socket.on('guessMade', this.respondToGuess.bind(this))
    this.socket.on('guessResponse', this.processResponse.bind(this))
    this.socket.on('readyNotification', this.processNotification.bind(this))
    this.socket.on("winNotification", this.processWinNotification.bind(this))
  }



  // Click event handlers for grids. Primary handler does nothing, but need to pass something to board component in props

  primaryGridClickHandler(){
  }

  targetGridClickHandler(square){

    // Check that it is the player's turn and that the square has not been clicked previously

    if (this.state.thisPlayerTurn && !this.state.previousGuesses.includes(square)){

    // Mark the guessed square in state, then construct an object (packetToSend) with the socket's ID and the square's coordinates. Add the square to the array of previous guesses before sending the packet via socket.

    this.setState({guessedSquare: square}, () => {
      let packetToSend = {id: this.state.socket, coords: this.state.guessedSquare.state.coords}

        let newPreviousGuesses = this.state.previousGuesses
        newPreviousGuesses.push(square)
        this.setState({previousGuesses: newPreviousGuesses})

        this.socket.emit('guessMade', packetToSend)
       })
    }
  }


  // Methods to process guesses

  respondToGuess(packet){

    // Make sure the information is handled by the correct socket, ie. not the one which it was sent from. All socket response methods have this line of code.

    if (packet.id !== this.socket.id){

      // Identify the square in the primary grid which matches the coordinates sent in the packet.Mark it as targetedSquare in state.

      this.state.primarySquares.find((square) => {
       if ((square.state.coords.column === packet.coords.column) && (square.state.coords.row === packet.coords.row)){
        this.setState({targetedSquare: square})
      }
    })

      // Check if the square contains a ship or not and send the appropriate response back via socket

      if (this.state.targetedSquare.state.full){
        let packetToSend = {id: this.state.socket, response: "hit"}
        this.socket.emit('guessResponse', packetToSend)
      }
      else if (!this.state.targetedSquare.state.full){
        let packetToSend = {id: this.state.socket, response: "miss"}
        this.socket.emit('guessResponse', packetToSend)
      }

    }
  }

  processResponse(packet){

    if (packet.id !== this.socket.id){

    // Check the response received and set the "hit" property of the square's state to the corresponding value. If the response is hit, also increment the hitCount value in state.

    if (packet.response === "hit"){
      console.log("Hit!")
      this.setState({hitCount: this.state.hitCount + 1})
      this.state.guessedSquare.setState({hit: true})
    }
    else if (packet.response === "miss"){
      console.log("Miss!")
      this.state.guessedSquare.setState({hit: false})
    }
    }

    // Check if there is a winner, then advance the turn if the shot missed. If the shot hits, the player should have another go.

    this.checkWinner()
    
    if (packet.response === "miss"){
      this.advanceTurn()
    }
  }

  
  advanceTurn(){
    this.setState({thisPlayerTurn: !this.state.thisPlayerTurn})
  }


  checkWinner(){

    // Check if the hitCount variable has reached 17, ie. if all the opposing player's ships have been sunk

    if (this.state.hitCount === 17){

      // Set the gameWon boolean to true and send a notification to the opponent via socket. Notify the player with a pop-up.

      this.setState({gameWon: true}, () => {
        let packetToSend = {id: this.state.socket, winner: true}
        this.socket.emit('winNotification', packetToSend)
        alert("You win!")
      })
    }
  }


  processWinNotification(packet){
    if (packet.id !== this.socket.id){

      // Check that the packet received showed the game to be won, then update the boolean and notify the player with a pop-up

      if (packet.winner){
        this.setState({gameWon: true}, () => {
          alert("Opponent wins")
        })
      }
    }
  }



  addSquareToArray(square,array){
    array.push(square)
  }


  increaseFilledSquares(){
    this.setState({filledSquares: this.state.filledSquares + 1})
  }




  // Methods for verifying ship positions



  checkSquaresInSameRow(squares){

    // Create an empty array to store the results of the checks

    let rowChecks = []

    // Compare each square in the array passed in with its successor. If both have the same value for "row" in their coordinates, add "true" to the array of check results. If not, add "false"

    for (var i=0; i < squares.length - 1; i++){
      if (squares[i].state.coords.row === squares[i+1].state.coords.row){
        rowChecks.push(true)
      }
      else{
        rowChecks.push(false)
      }
    }


    // Check that there are no instances of "false" in the results array, ie. that the squares are in the same row

    if (rowChecks.includes(false)){
      return false
    }
    else{
      return true
    }
  }


  checkSquaresInSameColumn(squares){

    // Similar to the previous method, but checking columns this time.

    let columnChecks = []

    for (var i=0; i < squares.length - 1; i++){
      if (squares[i].state.coords.column === squares[i + 1].state.coords.column){
        columnChecks.push(true)
      }
      else{
        columnChecks.push(false)
      }
    }

    if (columnChecks.includes(false)){
      return false
    }
    else{
      return true
    }
  }



  checkSquaresConsecutive(squares){

    let consecutiveChecks = []

    // Call methods to ensure all squares are in the same row or column

    let rowCheck = this.checkSquaresInSameRow(squares)

    let columnCheck = this.checkSquaresInSameColumn(squares)


    // If squares are in the same row, sort them so that they are ordered sequentially by column. This allows for them to be placed on the board in any order and still pass the test. Without the sorting function squares would have to be placed in a specific order in order to be valid.

    if (rowCheck){
      squares.sort(function(square1,square2){
        return square1.state.coords.column - square2.state.coords.column
      })

      // Check that the column coordinate for each square is 1 different from its neighbour. Add "true" or "false" to the checks array as required

      for (var i=0; i < squares.length - 1; i++){
        if ((squares[i].state.coords.column === squares[i+1].state.coords.column + 1) || (squares[i].state.coords.column === squares[i+1].state.coords.column - 1)){
          consecutiveChecks.push(true)
        }
        else{
          consecutiveChecks.push(false)
        }
      }
    }

    // Same process if squares are in the same column

    else if (columnCheck){
      squares.sort(function(square1,square2){
        return square1.state.coords.row - square2.state.coords.row
      })
      for (var i=0; i < squares.length - 1; i++){
        if ((squares[i].state.coords.row === squares[i+1].state.coords.row + 1) || (squares[i].state.coords.row === squares[i+1].state.coords.row - 1)){
          consecutiveChecks.push(true)
        }
        else{
          consecutiveChecks.push(false)
        }
      }
    }

    // If squares share neither row nor column, return false

    else{
      return false
    }


    // Check no "false"s in check array, ie. squares are positioned consecutively

    if (consecutiveChecks.includes(false)){
      return false
    }
    else{
      return true
    }

  }



  validateShipPlacement(){

    // Get the squares occupied by the ship being checked and its expected length from state

    let squares = this.state.currentShipPlacementSquares

    let currentShip = this.state.shipsToPlace[0]


    // Show error messages if number of squares clicked does not match expected length

    if (squares.length < currentShip){
      this.setState({validationMessage: "Not enough squares clicked"})
      return
    }
    else if  (squares.length > currentShip){
      this.setState({validationMessage: "Too many squares clicked"})
      return
    }


    // Check squares are correctly positioned using methods above
    
    let consecutiveCheck = this.checkSquaresConsecutive(squares)


    // If checks are passed notify player that the boat has been placed, reset the array listing the squares to validate, set the expected ship to the next in the array and increment the filledSquare counter appropriately. If the consecutive check fails, present an error message. The check on the playerReady attribute prevents the validate button being used again after the player has declared they are ready to play.

    // The commented-out code on lines 338-341 was intended to de-select squares if any of the validation checks failed. Unfortunately this does not currently work, although the program will run without interference if the comments are removed.

    if (consecutiveCheck && !this.state.playerReady){
      this.setState({validationMessage: "Boat placed"})
      this.setState({currentShipPlacementSquares: []})
      this.updateShipList()
      this.setState({filledSquares: this.state.filledSquares + squares.length}) 
      return
    }
    else if (!this.state.playerReady){
      this.setState({validationMessage: "Selected squares must be placed consecutively in the same row/column"})
      // this.state.currentShipPlacementSquares.forEach((square) => {
      //   square.setState({full: false})
      // })
      // this.setState({currentShipPlacementSquares: []})
      return
    }

  }


  // Removes the first item from the list of ships to be placed

  updateShipList(){
    let newShipsToPlace = this.state.shipsToPlace
    newShipsToPlace.shift()
    this.setState({shipsToPlace: newShipsToPlace})
  }



  //Methods for starting the game


  // Sets the playerReady attribute to "true" and notifies the opponent via socket, but only if all ships have been placed and the button has not already been pressed

  checkPlayerReady(){
    if (this.state.shipsToPlace.length === 0 && !this.state.playerReady){
      this.setState({validationMessage: "Ready to play"})
      this.setState({playerReady: true}, () => {
      let packetToSend = {id: this.state.socket, playerStatus: "ready"}
        this.socket.emit('readyNotification', packetToSend)
       })
    }
  }


  // When the notification is received updates the opponentReady attribute, then updates the thisPlayerTurn attribute if already ready. In this way whichever player is the first to click the "ready" button will take the first turn.

  processNotification(packet){
    if (packet.id !== this.socket.id){
      
      if (packet.playerStatus === "ready"){
        this.setState({opponentReady: true}, () =>{
          if (this.state.playerReady === true){
            this.setState({thisPlayerTurn: true})
          }
        })
      }
    }
  }

  // Check which player's turn it is for changing notifications

  setTurnNotification(){
    return this.state.thisPlayerTurn ? "Your turn" : "Opponent's turn"
  }

  // Renders the boards. Should include a div to show turn details before the second board, but this is not currently working.

  render(){
    return(
      <div className="container">
        <div className="primary-board-div">
          <Board
          id = {this.state.socket}
          type="primary"
          playerTurn={this.state.thisPlayerTurn}
          squareArray={this.state.primarySquares}
          filledSquares={this.state.filledSquares}
          clickHandler={this.primaryGridClickHandler.bind(this)}
          addSquare={this.addSquareToArray.bind(this)}
          currentShipPlacementSquares={this.state.currentShipPlacementSquares}
          />
        </div>
        <ShipValidation 
        shipToPlace={this.state.shipsToPlace[0]}
        validationMessage={(this.state.playerReady && this.state.opponentReady) ? this.setTurnNotification() : this.state.validationMessage}
        onButtonClick={this.validateShipPlacement.bind(this)}
        onReadyClick={this.checkPlayerReady.bind(this)}
        />
        
        <div className="tracking-board-div">
          <Board
          id = {this.state.socket}
          type="tracking"
          playerTurn={this.state.thisPlayerTurn}
          squareArray={this.state.targetSquares}
          filledSquares={this.state.filledSquares}
          clickHandler={this.targetGridClickHandler.bind(this)}
          addSquare={this.addSquareToArray.bind(this)}
          currentShipPlacementSquares={this.state.currentShipPlacementSquares}
          />
        </div>
      </div>
    )
  }

}

export default GameContainer