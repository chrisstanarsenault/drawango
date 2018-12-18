import React, {Component} from 'react';

class DesktopVotes extends Component {
  render() {
    return (
      <div>
        <button>{this.props.guess}</button>
      </div>
    );
  }
}

export default DesktopVotes;