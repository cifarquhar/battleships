import React from "react"

class TurnDetails extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      player: "Player 1"
    }
  }

  setPlayer(){
    if (this.props.player1Turn){
      this.setState({player: "Player 1"})
    }
    else{
      this.setState({player: "Player 2"})
    }
  }

  componentWillMount(){
    this.setPlayer()
  }

  render(){
    return(
      <div className="turn-details-div">
        <h3>{this.state.player}'s turn</h3>
      </div>
    )
  }

}

export default TurnDetails