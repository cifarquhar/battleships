import React from "react"
import Square from "./Square"

class Column extends React.Component{

  constructor(props){
    super(props)
    this.state = {

    }
  }

  render(){

    const squareValues = ["","","","","","","","","",""]

    const squares = squareValues.map((element,index) => {
      return(
        <Square
        type={this.props.type}
        columnName = {this.props.columnName}
        squareNumber = {index + 1}
        value = {element}
        key = {index}
        filledSquares={this.props.filledSquares}
        increaseFilledSquares = {this.props.increaseFilledSquares.bind(this)}
        />
      )
    })

    return(
      <div className="column">
      {squares}
      </div>
    )




  }

}

export default Column