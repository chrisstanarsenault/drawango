import React, { Component } from 'react';
import { v4 } from 'uuid';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.endPaintEvent = this.endPaintEvent.bind(this);
    //replace this later
    this.socket = undefined;
  }

  isPainting = false;
  strokeStyle = '#EE92C2';
  line = [];
  prevPos = { pageX: 0, pageY: 0 };

  onTouchStart({ nativeEvent }) {
    nativeEvent.preventDefault();
    const touch = nativeEvent.changedTouches[0];
    const { pageX, pageY } = touch;
    this.isPainting = true;
    this.prevPos = { pageX, pageY };
  }

  onTouchMove({ nativeEvent }) {
    nativeEvent.preventDefault();
    if (this.isPainting) {
      const touch = nativeEvent.changedTouches[0]
      const { pageX, pageY } = touch;
      const offSetData = { pageX, pageY };
      const positionData = {start: { ...this.prevPos}, 
                            stop: { ...offSetData},
                          };
      this.line = this.line.concat(positionData);
      this.paint(this.prevPos, offSetData, this.strokeStyle);

      // below should come from App file
      this.sendPaintData();
    }
  }

  endPaintEvent() {
    if (this.isPainting) {
      this.isPainting = false;
            // below should come from App file
      this.sendPaintData();
    }
  }

  paint(prevPos, currPos, strokeStyle) {
    const { pageX, pageY } = currPos;
    const { pageX: x, pageY: y } = prevPos;
    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(pageX, pageY);
    this.ctx.stroke();
    this.prevPos = { pageX, pageY };
  }

//replace this entire fucntion 
  sendPaintData() {
    const body = {
      type: "canvas",
      line: this.line,
    };
    this.socket.send(JSON.stringify(body));
    this.line = [];
  }

  //replace this entiure fucntion
  static getHostName() {
    const parser = document.createElement('a')
    parser.href = document.location;
    return parser.hostname;
  }

  componentDidMount() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    //this we need the one below???
    this.canvas.addEventListener("touchmove", function(event) {
    event.preventDefault();});

    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 5;

    //delete the one below
    const hostname = Canvas.getHostName();
    const port = 3001;
    this.socket = new WebSocket("ws://" + hostname + ":" + port);
    this.socket.onopen = function (event) {
      console.log('Connected to: ' + event.currentTarget.url);
    };
    this.socket.onmessage = event => {
      console.log("message from the socket", event)
      const message = JSON.parse(event.data);
      if (message.type === "canvas") {
        const { line } = message;
        line.forEach((position) => {
          this.paint(position.start, position.stop, this.strokeStyle);
        });
      }
    }
  }

    handleTapEventOne = event => {
    event.preventDefault();
    this.props.changeGameStage("guessingStage");
  }

  render() {
    return ( <canvas 
              ref={(ref) => (this.canvas = ref)}
              style={{ background: 'white' }}
              onTouchStart={this.onTouchStart}
              onTouchEnd={this.endPaintEvent}
              onTouchMove={this.onTouchMove}
      />
    );
  }
}
export default Canvas;