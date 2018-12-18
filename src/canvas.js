import React, { Component } from 'react';

class Canvas extends Component {
  constructor() {
    super();
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.endPaintEvent = this.endPaintEvent.bind(this);
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
      this.props.sendPaintData(this.line);
      this.line = [];
    }
  }

  endPaintEvent() {
    if (this.isPainting) {
      this.isPainting = false;
      this.props.sendPaintData(this.line);
      this.line = [];
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

  componentDidMount() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    //this we need the one below???
    this.canvas.addEventListener("touchmove", function(event) {
    event.preventDefault();});
      ////////
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 5;
    
    const line = this.props.gameData.line;
    console.log("checking the line on the desktop", line)
    line.forEach((position) => {
      this.paint(position.start, position.stop, this.strokeStyle);
    });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return ( 
      <div>
        <canvas 
          ref={(ref) => (this.canvas = ref)}
          style={{ background: 'white' }}
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.endPaintEvent}
          onTouchMove={this.onTouchMove}
        />
      </div>
    );
  }
}
export default Canvas;