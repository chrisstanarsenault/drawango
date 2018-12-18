import React, {Component} from 'react';

class MobileVotes extends Component {

  getGuess = () => {
    console.log("this from votes", this.props.playerGuess);
    for (var guess in this.props.playerGuess) {
      return this.props.playerGuess[guess];
    }
  }

  render() {
    return (
      <div>
        <p>{this.getGuess()}</p>
      </div>
    );
  }
}
export default MobileVotes;