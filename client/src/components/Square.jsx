import React from "react"

class Square extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      id: this.props.socket,
      full: false,
      className: null,
      value: this.props.value
    }

    const coords = {
        column: this.props.columnName,
        row: this.props.squareNumber
      }

    this.coords = coords

    this.hitState = null
  }


  // When a square is clicked updates its class accordingly in order to show the result on screen

  handleClick(){
    this.props.clickHandler(this)
    if ((!this.state.full && this.props.filledSquares < 17) && this.props.type === "primary"){
      this.props.addSquare(this,this.props.currentShipPlacementSquares)
      this.setState({full: true, className: "boatSquare"})
    }
    else if (this.props.type === "tracking" && this.hitState === true){
        this.setState({className: "hitSquare"})
    }
    else if (this.props.type === "tracking" && this.hitState === false){
        this.setState({className: "missSquare"})
    }
      
  }


  // Ensures that squares are correctly identified as part of a primary or tracking grid before mounting

  componentWillMount(){
    if (this.props.type === "primary"){
      this.setState({className: "seaSquare"})
    }
    else if (this.props.type === "tracking" && !this.hitState){
      this.setState({className: "trackingSquare"})
    }
  }


  // Adds primary and tracking squares to the appropriate array in the GameContainer state

  componentDidMount(){
    this.props.addSquare(this,this.props.squareArray)
  }

  render(){
    return(
      <span className={this.state.className}
      onClick = {this.handleClick.bind(this)}>
        {this.state.value}
      </span>
    )
  }

}

export default Square