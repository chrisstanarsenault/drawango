import React, {Component} from 'react';

class Votes extends Component {
  render() {
    return (
      <div>
        <button>{this.props.guess}</button>
      </div>
    );
  }
}

export default Votes;