import React from "react"
import Column from "./Column"

class Board extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      
    }
  }



  render(){

    const columnNames = ["A","B","C","D","E","F","G","H","I","J"]

    const columns = columnNames.map((element,index) => {
      return(
        <Column
        id = {this.props.socket}
        type={this.props.type}
        columnName = {element}
        key = {index}
        squareArray = {this.props.squareArray}
        filledSquares={this.props.filledSquares}
        clickHandler = {this.props.clickHandler.bind(this)}
        addSquare={this.props.addSquare.bind(this)}
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