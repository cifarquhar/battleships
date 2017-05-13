import React from "react"

class Square extends React.Component{

  constructor(props){
    super(props)
    this.state = {

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