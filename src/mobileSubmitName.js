import React, {Component} from 'react';

class MobileSubmitName extends Component {

   handleSubmit = event => {
    event.preventDefault();
    const nameInput = event.target.elements.name;
    this.props.addPlayerName(nameInput.value);
    this.props.changeGameStage("drawingStage");
    }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="name"/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
export default MobileSubmitName;
