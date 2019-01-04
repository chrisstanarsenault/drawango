import React, {Component} from 'react';

class DesktopVotes extends Component {
  render() {
    return (
      <div>
        <a href="#" className="btn"><span>{this.props.guess}</span></a>
      </div>
    );
  }
}

export default DesktopVotes;