import React from "react"
import Column from "./Column"

class Board extends React.Component{

  constructor(props){
    super(props)
  }



  render(){

    const columnNames = ["","","","","","","","","",""]

    const columns = columnNames.map((element,index) => {
      return(
        <Column
        id = {this.props.socket}
        type={this.props.type}
        columnName = {index + 1}
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
      <div className="board">
        {columns}
      </div>
    )
  }

}

export default Board