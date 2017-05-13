import React from "react"

class Square extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      full: false
    }
  }

  render(){
    return(
      <span className="square">
        {this.props.value}
      </span>
    )
  }

}

export default Square