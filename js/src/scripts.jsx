var Timer = React.createClass({

  getInitialState: function(){
      return {
        newProjectName: "Task 1",
        buttonText: "Start",
        on: false,
        startTimeDisplay: "",
        startTime: "",
        stopTime: "",
        emptyTimer: "00:00:00",
        timeSpent: "",
        taskNumber: 1,
      }
  },

  toggleTimer: function(){
    var self = this;
    var newState = this.state;
    newState.on = !newState.on;
    this.setState(newState);

    if (this.state.on) {
      this.setState({ buttonText: "Stop" });
      self.startTimer();
    } else {
      this.setState({ buttonText: "Start" });
      self.stopTimer();
    }

  },

  resetTimer: function(){
    this.setState({ emptyTimer: "00:00:00" });

  },

  startTimer: function(){
    var self = this;
    self.resetTimer();
    var startTimeHMS = "00:00:00";
    var currentdate = new Date();
    var minutes = currentdate.getMinutes();
    var hours = currentdate.getHours();
    if ( hours > 12 ) {
      var hours = hours - 12;
    }
    if (minutes < 10 ) {
      var minutes = "0" + minutes;
    }
    var startTimeDisplayed = hours + ":" + minutes + " PM";

    var startTimeHMS = currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();

    this.setState({ startTimeDisplay: startTimeDisplayed });
    this.setState({ startTime: startTimeHMS });

    $("tbody").append("<tr><td className='col-sm-4'><p>" + self.state.newProjectName + "</p></td><td className='col-sm-4'></td><td className='col-sm-2'><p>" + startTimeDisplayed + "</p></td><td className='col-sm-2'><p></p></td></tr>");

  },

  stopTimer: function(){
    var self = this;
    var currentdate = new Date();
    var minutes = currentdate.getMinutes();
    var hours = currentdate.getHours();
    if ( hours > 12 ) {
      var hours = hours - 12;
    }
    if (minutes < 10 ) {
      var minutes = "0" + minutes;
    }
    var stopTimeDisplayed = hours + ":" + minutes + " PM";

    var stopTimeHMS = currentdate.getHours() + ":"
                    + currentdate.getMinutes() + ":"
                    + currentdate.getSeconds();

    var startTimeRecorded = (this.state.startTime);
    var timeSpentHMS = (stopTimeHMS - startTimeRecorded);

    function dateCompare(time1,time2) {
      var t1 = new Date();
      var parts = time1.split(":");
      t1.setHours(parts[0],parts[1],parts[2],0);
      var t2 = new Date();
      parts = time2.split(":");
      t2.setHours(parts[0],parts[1],parts[2],0);
      var diff = (t2.getTime()-t1.getTime())
      return diff;
    }

    var milliseconds = dateCompare(startTimeRecorded,stopTimeHMS);
    var ms = parseInt((milliseconds%1000)/100)
            , seconds = parseInt((milliseconds/1000)%60)
            , minutes = parseInt((milliseconds/(1000*60))%60)
            , hours = parseInt((milliseconds/(1000*60*60))%24);

    var hours = (hours < 10) ? "0" + hours : hours;
    var minutes = (minutes < 10) ? "0" + minutes : minutes;
    var seconds = (seconds < 10) ? "0" + seconds : seconds;


    var timeDifference =  (hours + ":" + minutes + ":" + seconds);

    this.setState({ stopTime: stopTimeHMS });
    this.setState({ emptyTimer: timeDifference });
    this.setState({ timeSpent: timeDifference });

     $("tbody tr").last().html("<td className='col-sm-4'><p>" + self.state.newProjectName + "</p></td><td className='col-sm-4'>" + timeDifference + "</td><td className='col-sm-2'><p>" + self.state.startTimeDisplay + "</p></td><td className='col-sm-2'><p>" + stopTimeDisplayed + "</p></td>");

  },


  inputChanged: function(event) {
    this.setState({ newProjectName: event.target.value });
  },

  addingInput: function() {
    this.setState({ newProjectName: "" });
  },

  render: function(){
    var minutes = 0;
    var seconds = 0;
    var milliseconds = 0;
    var hours = 0;
    var times = [];
    var on = false;
    var newProjectInput = <input className='project-input' type="text" onFocus={this.addingInput} onChange={this.inputChanged} value={this.state.newProjectName} />;
    var startButton = <button className="start btn" onClick={this.toggleTimer}>{this.state.buttonText}</button>;
    var resetButton = <button className="reset btn"  onClick={this.resetTimer}>Reset</button>;
    return(
      <div>
        <div className="row">
          <div className="col-sm-4">
          <p>Name your task:</p>
              {newProjectInput}
          </div>
          <p className="time col-sm-4">
             {this.state.emptyTimer}
          </p>
          <div className="buttons col-sm-4">
            {startButton}
          </div>
        </div>
        <div className="row">
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="col-sm-4">
                  <p>Your Tasks</p>
                </th>
                <th className="col-sm-4">
                  <p>Time Spent</p>
                </th>
                <th className="col-sm-2">
                  <p>Started</p>
                </th>
                <th className="col-sm-2">
                  <p>Stopped</p>
                </th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});


ReactDOM.render(<Timer/>, document.getElementById('react'));
