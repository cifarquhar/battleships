import React from "react"

class ShipValidation extends React.Component{

  constructor(props){
    super(props)
    this.state = {

    }
  }


  render(){
    return(
      <div className="validation-details-div">
        <p>Ship to place: {this.props.shipToPlace}</p>
        <p>{this.props.validationMessage}</p>
        <button onClick={this.props.onButtonClick}>Validate Placement</button>
        <button onClick={this.props.onReadyClick}>Ready</button>
      </div>
    )
  }
}

export default ShipValidation