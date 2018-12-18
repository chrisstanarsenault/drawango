                                                                                    import React, {Component} from 'react';

class Timer extends Component {



  render() {
    // Progress Bar Timer
    let timeleftBar = 30;
    var downloadTimerBar = setInterval(function () {
      document.getElementById("progressBar").value = 30 - --timeleftBar;
      if (timeleftBar <= 0)
        clearInterval(downloadTimerBar);
    }, 1000);

    // Countdown Timer
    let timeleftCounter = 30;
    let downloadTimerCounter = setInterval(function(){
    timeleftCounter--;
    document.getElementById("countTimer").textContent = timeleftCounter;
    if(timeleftCounter <= 0)
        clearInterval(downloadTimerCounter);
    },1000);

    return (
      <div className="desktopTimerContainer">
        <progress value="0" max="30" id="progressBar"></progress>
        <span id="countTimer">30</span>
      </div>
    );
  }
}
export default Timer;