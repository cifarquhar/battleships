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
        type={this.props.type}
        columnName = {element}
        key = {index}
        filledSquares={this.props.filledSquares}
        increaseFilledSquares = {this.props.increaseFilledSquares.bind(this)}
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