import React from "react"
import Board from "../components/Board"

class GameContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {

    }
  }

  render(){
    return(
      <div className="container-div">
        <Board/>
      </div>
    )
  }

}

export default GameContainer