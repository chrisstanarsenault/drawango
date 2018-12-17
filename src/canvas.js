import React, {
  Component
} from 'react';
import {
  v4
} from 'uuid';

//take out as a helper function

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.onTouchStart = this.onTouchStart.bind(this);
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


  onTouchStart({ nativeEvent }) {
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

      // Set the start and stop position of the paint event.
      const positionData = {
        start: { ...this.prevPos
        },
        stop: { ...offSetData
        },
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

    const { pageX, pageY } = currPos;
    const { pageX: x, pageY: y } = prevPos;

    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeStyle;
    // Move the the prevPosition of the mouse
    this.ctx.moveTo(x, y);
    // Draw a line to the current position of the mouse
    this.ctx.lineTo(pageX, pageY);
    // Visualize the line using the strokeStyle
    this.ctx.stroke();
    this.prevPos = { pageX, pageY };
  }


  sendPaintData() {
    const body = {
      type: "canvas",
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
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.addEventListener("touchmove", function(event) {
    event.preventDefault();});
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 5;
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
        const {
          userId,
          line
        } = message;
        if (userId !== this.userId) {
          line.forEach((position) => {
            this.paint(position.start, position.stop, this.guestStrokeStyle);
          });
        }
      }
    }
  }

    handleTapEventOne = event => {
    event.preventDefault();
    this.props.changeGameStage("guessingStage");
  }

  render() {
    return ( <canvas
      // We use the ref attribute to get direct access to the canvas element.

        ref={(ref) => (this.canvas = ref)}
        style={{ background: 'black' }}
        onTouchStart={this.onTouchStart}
        onTouchEnd={this.endPaintEvent}
        // onMouseUp={this.endPaintEvent}
        onTouchMove={this.onTouchMove}
      />
    );
  }
}
export default Canvas;