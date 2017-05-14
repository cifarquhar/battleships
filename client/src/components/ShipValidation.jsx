import React from "react"

class ShipValidation extends React.Component{

  constructor(props){
    super(props)
    this.state = {

    }
  }


  setPlacementInstructions(){
    if (this.props.shipToPlace){
      return "Ship to place: length " + this.props.shipToPlace
    }
  }

  render(){

    let placementInstruction = this.setPlacementInstructions()

    return(
      <div className="validation-details-div">
        <p>{placementInstruction}</p>
        <p>{this.props.validationMessage}</p>
        <button onClick={this.props.onButtonClick}>Validate Placement</button>
        <button onClick={this.props.onReadyClick}>Ready</button>
      </div>
    )
  }
}

export default ShipValidation