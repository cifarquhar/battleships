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
      targeted: null
    }
  }

  handleClick(){
    this.props.setSubjectSquare(this)
    this.props.clickHandler()
    if ((!this.state.full && this.props.filledSquares < 17) && this.props.type === "primary"){
      this.setState({full: true})
      this.setState({className: "boatSquare"})
    }
    else if (this.props.type === "tracking"){
      console.log("square",this.state.coords.column,this.state.coords.row,"clicked")
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

  componentDidMount(){
    this.props.addSquare(this,this.props.squareArray)
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