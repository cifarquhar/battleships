import React from "react"
import Board from "../components/Board"
import io from 'socket.io-client';

class GameContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      primarySquares: [],
      targetSquares: [],
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
  }


  primaryGridClickHandler(){
    if (this.state.filledSquares < 17){
    this.increaseFilledSquares()
  }
    console.log("primary grid clicked")
  }



  targetGridClickHandler(square){

    this.setState({guessedSquare: square}, () => {
      let packetToSend = {id: this.state.socket, coords: this.state.guessedSquare.state.coords}
        this.socket.emit('guessMade', packetToSend)
       })
  
  }


  respondToGuess(packet){

    if (packet.id !== this.socket.id){

    this.state.primarySquares.find((square) => {
     if ((square.state.coords.column === packet.coords.column) && (square.state.coords.row === packet.coords.row)){
      this.setState({targetedSquare: square})
     }
    })

    console.log(this.state.targetedSquare)

    console.log("guess from socket",packet.id,"received at socket",this.socket.id)
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