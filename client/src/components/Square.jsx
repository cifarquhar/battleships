import React from "react"

class Square extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      id: this.props.socket,
      coords: {
        column: this.props.columnName,
        row: this.props.squareNumber
      },
      full: false,
      className: null,
      hit: "unknown",
      value: this.props.value
    }
  }

  handleClick(){
    this.props.clickHandler(this)
    if ((!this.state.full && this.props.filledSquares < 17) && this.props.type === "primary"){
      this.props.addSquare(this,this.props.currentShipPlacementSquares)
      this.setState({full: true})
      this.setState({className: "boatSquare"})
    }
    else if (this.props.type === "tracking" && this.state.hit === true){
        this.setState({className: "hitSquare"})
    }
    else if (this.props.type === "tracking" && this.state.hit === false){
        this.setState({className: "missSquare"})
    }
      
  }

  componentWillMount(){
    if (this.props.type === "primary"){
      this.setState({className: "seaSquare"})
    }
    else if (this.props.type === "tracking" && this.state.hit === "unknown"){
      this.setState({className: "trackingSquare"})
    }
  }

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