import React from "react"

class TurnDetails extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      message: null
    }
  }

  // Should set the message to be shown to the player, although not currently working. Always shows "opponent's turn" 

  setPlayer(){
    if (this.props.playerTurn !== ""){
      if (this.props.playerTurn){
        this.setState({message: "Your turn"})
      }
      else{
        this.setState({message: "Opponent's turn"})
      }
    }
  }

  componentWillMount(){
    this.setPlayer()
  }

  render(){
    return(
      <div className="turn-details-div">
        <h3>{this.state.message}</h3>
      </div>
    )
  }

}

export default TurnDetails