import React from "react"
import Board from "../components/Board"

class GameContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      filledSquares: 0
    }
  }

  increaseFilledSquares(){
    this.setState({filledSquares: this.state.filledSquares + 1})
  }

  render(){
    return(
      <div className="container-div">
        <Board
        filledSquares={this.state.filledSquares}
        increaseFilledSquares={this.increaseFilledSquares.bind(this)}/>
      </div>
    )
  }

}

export default GameContainer