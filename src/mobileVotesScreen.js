import React, {Component} from 'react';
import Votes from './mobileVotes';

class MobileVotesScreen extends Component {
  
  render() {

    const players = [];
    console.log("AAAAAAAA",this.props.gameData.playerGuess)

    this.props.gameData.players.forEach(player => { 
      if (this.props.gameData.playerGuess[player.name] && player.name !== this.props.gameData.mainPlayer) {
        players.push(player);
      }
    });
    
    const guesses = players.map(player => (
      <Votes key={player.name} player={player.name} guess={this.props.gameData.playerGuess[player.name]} gameData={this.props.gameData} addPoints={this.props.addPoints}/>
      ));

      console.log("this is the vote",this.props.gameData.playerVote[this.props.gameData.mainPlayer])

    if (!this.props.gameData.playerVote[this.props.gameData.mainPlayer]) {
      return (
        <div>
          {guesses}
        </div>
      );
    }
    return (
      <div>
        <p>This is the default page</p>
      </div>
    );
  }
}
export default MobileVotesScreen;