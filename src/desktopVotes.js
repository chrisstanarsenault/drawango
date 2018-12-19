import React, {Component} from 'react';

class DesktopVotes extends Component {
  render() {
    return (
      <div>
        <p>{this.props.guess}</p>
      </div>
    );
  }
}

export default DesktopVotes;