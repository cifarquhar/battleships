import React from "react"
import Board from "../components/Board"
import io from 'socket.io-client';

class GameContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      primarySquares: [],
      targetSquares: [],
      previousGuesses: [],
      socket: null,
      filledSquares: 0,
      guessedSquare: null,
      targetedSquare: null
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
    }
    else if (packet.response === "miss"){
      console.log("Miss!")
    }
  }
}



  addSquareToArray(square,array){
    array.push(square)
  }

  increaseFilledSquares(){
    this.setState({filledSquares: this.state.filledSquares + 1})
  }

  render(){
    return(
      <div className="container-div">
        <div className="primary-board-div">
          <Board
          id = {this.state.socket}
          type="primary"
          squareArray={this.state.primarySquares}
          filledSquares={this.state.filledSquares}
          clickHandler={this.primaryGridClickHandler.bind(this)}
          addSquare={this.addSquareToArray.bind(this)}
          />
        </div>
        <div className="tracking-board-div">
          <Board
          id = {this.state.socket}
          type="tracking"
          squareArray={this.state.targetSquares}
          filledSquares={this.state.filledSquares}
          clickHandler={this.targetGridClickHandler.bind(this)}
          addSquare={this.addSquareToArray.bind(this)}
          />
        </div>
      </div>
    )
  }

}

export default GameContainer