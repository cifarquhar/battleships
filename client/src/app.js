import React from 'react';
import ReactDOM from 'react-dom';
import GameContainer from "./containers/GameContainer"

window.onload = function(){
  ReactDOM.render(
    <GameContainer/>,
    document.getElementById('app')
  );
}
