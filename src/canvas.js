import React, { Component } from 'react';

class Canvas extends Component {
  constructor() {
    super();
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.endPaintEvent = this.endPaintEvent.bind(this);
  }

//put this into the stage of canvas
//add meta data
// and add state

  isPainting = false;
  strokeStyle = '#FF00FF';
  line = [];
  prevPos = { pageX: 0, pageY: 0 };

  onTouchStart({ nativeEvent }) {
    //maybe I won't need below
    // nativeEvent.preventDefault();
    const touch = nativeEvent.changedTouches[0];
    const { pageX, pageY } = touch;
    this.isPainting = true;
    this.prevPos = { pageX, pageY };
  }

  onTouchMove({ nativeEvent }) {
    //maybe I won't need below
    // nativeEvent.preventDefault();
    if (this.isPainting) {
      const touch = nativeEvent.changedTouches[0]
      const { pageX, pageY } = touch;
      const offSetData = { pageX, pageY };
      const positionData = {  start: { ...this.prevPos},
                              stop: { ...offSetData},
                            };
      this.line = this.line.concat(positionData);
      this.paint(this.prevPos, offSetData, this.strokeStyle);
      this.props.sendPaintData(this.line);
    }
  }

  endPaintEvent() {
    if (this.isPainting) {
      this.isPainting = false;
      this.props.sendPaintData(this.line);
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
    this.canvas.addEventListener("touchmove", function(event) {
    event.preventDefault();});
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 5;
    const line = this.props.gameData.line;
    line.forEach((position) => {
      this.paint(position.start, position.stop, this.strokeStyle);
    });
  }

  componentDidUpdate() {
    const line = this.props.gameData.line;
    line.forEach((position) => {
      this.paint(position.start, position.stop, this.strokeStyle);
    });
  }

  render() {
    return (
      <div id="desktop-canvas-container">
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