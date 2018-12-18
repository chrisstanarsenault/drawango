                                                                                    import React, {Component} from 'react';

class Timer extends Component {



  render() {
    // let timeleft = 30;
    // var downloadTimer = setInterval(function () {
    //   document.getElementById("countTimer").value = 30 - --timeleft;
    //   if (timeleft <= 0)
    //     clearInterval(downloadTimer);
    // }, 1000);

    var timeleft = 30;
    var downloadTimer = setInterval(function(){
    timeleft--;
    document.getElementById("countTimer").textContent = timeleft;
    if(timeleft <= 0)
        clearInterval(downloadTimer);
    },1000);
    return (
      <div>
        {/* <progress value="0" max="30" id="progressBar"></progress> */}
        <p>You have <span id="countTimer">30</span> seconds left!</p>
      </div>
    );
  }
}
export default Timer;