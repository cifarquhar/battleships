import React from "react"
import Row from "./Row"

class Board extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      filledSquares: 0
    }
  }

  increaseFilledSquares(){
    console.log(this.state.filledSquares)
    if (this.state.filledSquares < 17) {
      this.setState({filledSquares: this.state.filledSquares + 1})
    }
  }

  render(){

    const rowNames = ["A","B","C","D","E","F","G","H","I","J"]

    const rows = rowNames.map((element,index) => {
      return(
        <Row
        rowName = {element}
        key = {index}
        increaseFilledSquares = {this.increaseFilledSquares.bind(this)}
        />
      )
    })


    return(
      <div className="board">
        {rows}
      </div>
    )
  }

}

export default Board