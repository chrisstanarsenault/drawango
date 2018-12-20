import React, {Component} from 'react';

class DesktopVotes extends Component {
  render() {
    return (
      <div>
        <p id="desktop-individual-votes">{this.props.guess}</p>
      </div>
    );
  }
}

export default DesktopVotes;