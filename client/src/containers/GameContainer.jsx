import React from "react"
import Board from "../components/Board"
import io from 'socket.io-client';
import TurnDetails from "../components/TurnDetails"
import ShipValidation from "../components/ShipValidation"

class GameContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      player1Turn: true,
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
      validationMessage: ""
    }

    this.socket = io("http://localhost:3000")

    this.socket.on('connect', () => {
      this.setState({socket: this.socket.id})
    })

    this.socket.on('guessMade', this.respondToGuess.bind(this))
    this.socket.on('guessResponse', this.processResponse.bind(this))
  }


  primaryGridClickHandler(){
    if (this.state.filledSquares < 17){
    this.increaseFilledSquares()
  }
    console.log("primary grid clicked")
  }



  targetGridClickHandler(square){
    if (!this.state.previousGuesses.includes(square)){

    this.setState({guessedSquare: square}, () => {
      let packetToSend = {id: this.state.socket, coords: this.state.guessedSquare.state.coords}

        let newPreviousGuesses = this.state.previousGuesses
        newPreviousGuesses.push(square)
        this.setState({previousGuesses: newPreviousGuesses})

        this.socket.emit('guessMade', packetToSend)
       })
    }
  }


  respondToGuess(packet){

    if (packet.id !== this.socket.id){

      this.state.primarySquares.find((square) => {
       if ((square.state.coords.column === packet.coords.column) && (square.state.coords.row === packet.coords.row)){
        this.setState({targetedSquare: square})
      }
    })

      if (this.state.targetedSquare.state.full){
        let packetToSend = {id: this.state.socket, response: "hit"}
        this.socket.emit('guessResponse', packetToSend)
      }
      else if (!this.state.targetedSquare.state.full){
        let packetToSend = {id: this.state.socket, response: "miss"}
        this.socket.emit('guessResponse', packetToSend)
      }

      console.log(this.state.targetedSquare)

      console.log("guess from socket",packet.id,"received at socket",this.socket.id)
    }
  }

  processResponse(packet){

    if (packet.id !== this.socket.id){
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
    this.advanceTurn()
  }

  advanceTurn(){
    this.setState({player1Turn: !this.state.player1Turn})
  }

  addSquareToArray(square,array){
    array.push(square)
  }

  increaseFilledSquares(){
    this.setState({filledSquares: this.state.filledSquares + 1})
  }

  // sortSquaresByRow(square1,square2){
  //   return square1.state.coords.row - square2.state.coords.row
  // }

  // sortSquaresByColumn(square1,square2){
  //   return square1.state.coords.column - square2.state.coords.column
  // }

  checkSquaresInSameRow(squares){

    let rowChecks = []

    for (var i=0; i < squares.length - 1; i++){
      if (squares[i].state.coords.row === squares[i+1].state.coords.row){
        rowChecks.push(true)
      }
      else{
        rowChecks.push(false)
      }
    }

    if (rowChecks.includes(false)){
      return false
    }
    else{
      return true
    }
  }

  checkSquaresInSameColumn(squares){

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

    let rowCheck = this.checkSquaresInSameRow(squares)

    let columnCheck = this.checkSquaresInSameColumn(squares)

    if (rowCheck){
      squares.sort(function(square1,square2){
        return square1.state.coords.column - square2.state.coords.column
      })
      for (var i=0; i < squares.length - 1; i++){
        if ((squares[i].state.coords.column === squares[i+1].state.coords.column + 1) || (squares[i].state.coords.column === squares[i+1].state.coords.column - 1)){
          consecutiveChecks.push(true)
        }
        else{
          consecutiveChecks.push(false)
        }
      }
    }
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
    else{
      return false
    }

    if (consecutiveChecks.includes(false)){
      return false
    }
    else{
      return true
    }

  }

  validateShipPlacement(){

    let squares = this.state.currentShipPlacementSquares

    let currentShip = this.state.shipsToPlace[0]

    if (squares.length < currentShip){
      this.setState({validationMessage: "Not enough squares clicked"})
      return
    }
    else if  (squares.length > currentShip){
      this.setState({validationMessage: "Too many squares clicked"})
      return
    }

    
    let consecutiveCheck = this.checkSquaresConsecutive(squares)


    if (consecutiveCheck){
      this.setState({validationMessage: "Boat placed"})
      return
    }
    else{
      this.setState({validationMessage: "Selected squares must be placed consecutively in the same row/column"})
      return
    }


  }




  render(){
    return(
      <div className="container-div">
        <TurnDetails player1Turn={this.state.player1Turn}/>
        <div className="primary-board-div">
          <Board
          id = {this.state.socket}
          type="primary"
          squareArray={this.state.primarySquares}
          filledSquares={this.state.filledSquares}
          clickHandler={this.primaryGridClickHandler.bind(this)}
          addSquare={this.addSquareToArray.bind(this)}
          currentShipPlacementSquares={this.state.currentShipPlacementSquares}
          />
        </div>
        <ShipValidation 
        shipToPlace={this.state.shipsToPlace[0]}
        validationMessage={this.state.validationMessage}
        onButtonClick={this.validateShipPlacement.bind(this)}
        />
        <div className="tracking-board-div">
          <Board
          id = {this.state.socket}
          type="tracking"
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