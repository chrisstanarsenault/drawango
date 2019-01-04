import React, {Component} from 'react';

class DesktopVotes extends Component {
  render() {
    return (
      <div>
        <span id="votes">{this.props.guess}</span>
      </div>
    );
  }
}

export default DesktopVotes;