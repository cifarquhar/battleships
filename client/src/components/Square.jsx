import React from "react"

class Square extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      full: false,
      className: "seaSquare"
    }
  }

  handleClick(){
    if (!this.state.full){
      this.props.increaseFilledSquares
      this.setState({full: true})
      this.setState({className: "boatSquare"})
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