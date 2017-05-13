import React from "react"
import Square from "./Square"

class Row extends React.Component{

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
        squareNumber = {index + 1}
        value = {element}
        key = {index}
        />
      )
    })

    return(
      <div className="row">
      {squares}
      </div>
    )




  }

}

export default Row