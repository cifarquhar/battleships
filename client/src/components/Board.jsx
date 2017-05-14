import React from "react"
import Column from "./Column"
import TurnDetails from "./TurnDetails"

class Board extends React.Component{

  constructor(props){
    super(props)
    this.state = {
    }
  }

  checkIfShouldRenderTurnInfo(){
    if (this.props.type === "tracking"){
      return this.props.playerTurn
    }
    else{
      return ""
    }
  }



  render(){

    const detailsProps = this.checkIfShouldRenderTurnInfo()

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
      <div>
      <TurnDetails playerTurn={detailsProps}/>
      <div className="board">
        {columns}
      </div>
      </div>
    )
  }

}

export default Board