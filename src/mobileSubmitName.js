import React, {Component} from 'react';

class MobileSubmitName extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      submitted: false }
    this.handleChange= this.handleChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
  }

   handleChange(event) {
      this.setState({ name: event.target.value })
    }

   handleSubmit(event) {
    event.preventDefault();
        this.setState({ submitted: true })
        alert(this.state.name + ' was submitted');
    }

  render() {

    //this needs a form where you submit your name

    return (

      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
export default MobileSubmitName;
