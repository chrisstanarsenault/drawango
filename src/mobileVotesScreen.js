import React, {Component} from 'react';
import Votes from './mobileVotes';

class MobileVotesScreen extends Component {

  render() {

    const players = [];
    this.props.gameData.players.forEach(player => {
      if (this.props.gameData.playerGuess[player.name] && player.name !== this.props.gameData.mainPlayer) {
        if (player.name !== this.props.gameData.mainPlayer) {}
        players.push(player);
      }
    });

    const guesses = players.map(player => (
      <Votes key={player.name} player={player.name} guess={this.props.gameData.playerGuess[player.name]} gameData={this.props.gameData}/>
      ));

    return (
      <div>
        {guesses}
      </div>
    );
  }
}
export default MobileVotesScreen;