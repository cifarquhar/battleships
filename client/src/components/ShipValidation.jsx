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
        <div style={{height: "75px", width: "150px", display: "inline-block"}}>
          <p>{this.props.validationMessage}</p>
          <p>{this.props.hitMessage}</p>
        </div>
        <div style={{height: "75px", width: "200px", display: "inline-block"}}>
          <p>{placementInstruction}</p>
        </div>
        <div style={{height: "75px", width: "150px", display: "inline-block"}}>
          <button onClick={this.props.onButtonClick}>Validate Placement</button>
          <button onClick={this.props.onReadyClick}>Ready</button>
        </div>
      </div>
    )
  }
}

export default ShipValidation