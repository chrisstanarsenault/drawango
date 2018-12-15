import React, {Component} from 'react';

class MobileGuessingScreen extends Component {
  render() {

    //this guessing screen needs a form where you can submit your guess

    return (
      <div>
        <p>Make your guess!</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Send" />
        </form>

      </div>
    );
  }
}
export default MobileGuessingScreen;