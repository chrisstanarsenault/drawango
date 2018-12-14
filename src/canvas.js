// canvas.js

import React, { Component } from 'react';
import { v4 } from 'uuid';

//take out as a helper function

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.onTouchStart= this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.endPaintEvent = this.endPaintEvent.bind(this);
    this.socket = undefined;
    this.state = {
      loading: false
    }
  }

  isPainting = false;
  // Different stroke styles to be used for user and guest
  userStrokeStyle = '#EE92C2';
  guestStrokeStyle = '#F0C987';
  line = [];
  // v4 creates a unique id for each user. We used this since there's no auth to tell users apart
  userId = v4();
  prevPos = { pageX: 0, pageY: 0 };


  onMouseDown({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;
    this.isPainting = true;
    this.prevPos = { pageX, pageY };
  }

  onMouseMove({ nativeEvent }) {
    if (this.isPainting) {
      const { offsetX, offsetY } = nativeEvent;
      const offSetData = { offsetX, offsetY };
      // Set the start and stop position of the paint event.
      const positionData = {
        start: { ...this.prevPos },
        stop: { ...offSetData },
      };
      // Add the position to the line array
      this.line = this.line.concat(positionData);
      this.paint(this.prevPos, offSetData, this.userStrokeStyle);
      this.sendPaintData();
    }
  }
  endPaintEvent() {
    if (this.isPainting) {
      this.isPainting = false;
      this.sendPaintData();
    }
  }
  paint(prevPos, currPos, strokeStyle) {
    const { offsetX, offsetY } = currPos;
    const { offsetX: x, offsetY: y } = prevPos;

    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeStyle;
    // Move the the prevPosition of the mouse
    this.ctx.moveTo(x, y);
    // Draw a line to the current position of the mouse
    this.ctx.lineTo(offsetX, offsetY);
    // Visualize the line using the strokeStyle
    this.ctx.stroke();
    this.prevPos = { offsetX, offsetY };
  }

  sendPaintData() {
    const body = {
      line: this.line,
      userId: this.userId,
    };
    // We use the native fetch API to make requests to the server
    this.socket.send(JSON.stringify(body));
    this.line = [];
  }



  static getHostName() {
    const parser = document.createElement('a')
    parser.href = document.location;
    return parser.hostname;
  }

  componentDidMount() {
    // Here we set up the properties of the canvas element.
    this.canvas.width = 1000;
    this.canvas.height = 800;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 5;
    const hostname = Canvas.getHostName();
    const port = 3001;
    this.socket = new WebSocket("ws://" + hostname + ":" + port);
    this.socket.onopen = function(event) {
    console.log('Connected to: ' + event.currentTarget.url);
    };
    this.socket.onmessage = event => {
      console.log("message from the socket",event)
      const message = JSON.parse(event.data);
      console.log(message)
      const { userId, line } = message;
      if (userId !== this.userId) {
        line.forEach((position) => {
          this.paint(position.start, position.stop, this.guestStrokeStyle);
        });
      }
  }
}

  render() {
    return (
      <canvas
      // We use the ref attribute to get direct access to the canvas element.
        ref={(ref) => (this.canvas = ref)}
        style={{ background: 'black' }}
        onMouseDown={this.onMouseDown}
        onMouseLeave={this.endPaintEvent}
        onMouseUp={this.endPaintEvent}
        onMouseMove={this.onMouseMove}
      />
    );
  }
}
export default Canvas;