import React from "react"
import Row from "./Row"

class Board extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      
    }
  }



  render(){

    const rowNames = ["A","B","C","D","E","F","G","H","I","J"]

    const rows = rowNames.map((element,index) => {
      return(
        <Row
        type={this.props.type}
        rowName = {element}
        key = {index}
        filledSquares={this.props.filledSquares}
        increaseFilledSquares = {this.props.increaseFilledSquares.bind(this)}
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