import React, {Component} from 'react';

class MobileNavBar extends Component {

  render() {
    return (
      <nav id="mobile-navbar-container">
        <h1 className="mobile-navbar-title">DRAWANGO</h1>
        {this.props.drawingAddition}
      </nav>
    );
  }
}
export default MobileNavBar;