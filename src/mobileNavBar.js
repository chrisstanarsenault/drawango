import React, {Component} from 'react';

class MobileNavBar extends Component {

  handleTapEventOne = event => {
    event.preventDefault();
    this.props.changeGameStage("guessingStage");
  }

  render() {
    return (
      <nav>
        <h1>DRAW ME DADDY</h1>
      </nav>
    );
  }
}
export default MobileNavBar;