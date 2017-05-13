import React from "react"

class Square extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      full: false,
      className: null
    }
  }

  handleClick(){
    if (!this.state.full && this.props.filledSquares < 17){
      this.props.increaseFilledSquares()
      this.setState({full: true})
      this.setState({className: "boatSquare"})
    }
  }

  componentWillMount(){
    if (this.props.type === "primary"){
      this.setState({className: "seaSquare"})
    }
    else if (this.props.type === "tracking"){
      this.setState({className: "trackingSquare"})
    }
  }

  render(){
    return(
      <span className={this.state.className}
      onClick = {this.handleClick.bind(this)}>
        {this.props.value}
      </span>
    )
  }

}

export default Square