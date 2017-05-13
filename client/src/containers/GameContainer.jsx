import React from "react"
import Board from "../components/Board"
import io from 'socket.io-client';

class GameContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      socket: null,
      filledSquares: 0
    }

    this.socket = io("http://localhost:3000")

    this.socket.on('connect', () => {
      this.setState({socket: this.socket.id})
    })
  }



  increaseFilledSquares(){
    this.setState({filledSquares: this.state.filledSquares + 1})
  }

  render(){
    return(
      <div className="container-div">
        <Board
        filledSquares={this.state.filledSquares}
        increaseFilledSquares={this.increaseFilledSquares.bind(this)}
        />
      </div>
    )
  }

}

export default GameContainer