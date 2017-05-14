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
        id = {this.props.socket}
        type={this.props.type}
        columnName = {this.props.columnName}
        squareNumber = {index + 1}
        value = {element}
        key = {index}
        squareArray = {this.props.squareArray}
        filledSquares={this.props.filledSquares}
        clickHandler = {this.props.clickHandler.bind(this)}
        addSquare={this.props.addSquare.bind(this)}
        currentShipPlacementSquares={this.props.currentShipPlacementSquares}
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