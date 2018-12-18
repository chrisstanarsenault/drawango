import React, {Component} from 'react';

class Votes extends Component {
  render() {
    return (
      <div>
        <p>{this.props.guess}</p>
      </div>
    );
  }
}

export default Votes;