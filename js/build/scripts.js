"use strict";

var Timer = React.createClass({

  getInitialState: function getInitialState() {
    return {
      newProjectName: "Task 1",
      buttonText: "Start",
      on: false,
      startTimeDisplay: "",
      startTime: "",
      stopTime: "",
      emptyTimer: "00:00:00",
      timeSpent: "",
      taskNumber: 1
    };
  },

  toggleTimer: function toggleTimer() {
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

  resetTimer: function resetTimer() {
    this.setState({ emptyTimer: "00:00:00" });
  },

  startTimer: function startTimer() {
    var self = this;
    self.resetTimer();
    var startTimeHMS = "00:00:00";
    var currentdate = new Date();
    var minutes = currentdate.getMinutes();
    var hours = currentdate.getHours();
    if (hours > 12) {
      var hours = hours - 12;
    }
    if (minutes < 10) {
      var minutes = "0" + minutes;
    }
    var startTimeDisplayed = hours + ":" + minutes + " PM";

    var startTimeHMS = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

    this.setState({ startTimeDisplay: startTimeDisplayed });
    this.setState({ startTime: startTimeHMS });

    $("tbody").append("<tr><td className='col-sm-4'><p>" + self.state.newProjectName + "</p></td><td className='col-sm-4'></td><td className='col-sm-2'><p>" + startTimeDisplayed + "</p></td><td className='col-sm-2'><p></p></td></tr>");
  },

  stopTimer: function stopTimer() {
    var self = this;
    var currentdate = new Date();
    var minutes = currentdate.getMinutes();
    var hours = currentdate.getHours();
    if (hours > 12) {
      var hours = hours - 12;
    }
    if (minutes < 10) {
      var minutes = "0" + minutes;
    }
    var stopTimeDisplayed = hours + ":" + minutes + " PM";

    var stopTimeHMS = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

    var startTimeRecorded = this.state.startTime;
    var timeSpentHMS = stopTimeHMS - startTimeRecorded;

    function dateCompare(time1, time2) {
      var t1 = new Date();
      var parts = time1.split(":");
      t1.setHours(parts[0], parts[1], parts[2], 0);
      var t2 = new Date();
      parts = time2.split(":");
      t2.setHours(parts[0], parts[1], parts[2], 0);
      var diff = t2.getTime() - t1.getTime();
      return diff;
    }

    var milliseconds = dateCompare(startTimeRecorded, stopTimeHMS);
    var ms = parseInt(milliseconds % 1000 / 100),
        seconds = parseInt(milliseconds / 1000 % 60),
        minutes = parseInt(milliseconds / (1000 * 60) % 60),
        hours = parseInt(milliseconds / (1000 * 60 * 60) % 24);

    var hours = hours < 10 ? "0" + hours : hours;
    var minutes = minutes < 10 ? "0" + minutes : minutes;
    var seconds = seconds < 10 ? "0" + seconds : seconds;

    var timeDifference = hours + ":" + minutes + ":" + seconds;

    this.setState({ stopTime: stopTimeHMS });
    this.setState({ emptyTimer: timeDifference });
    this.setState({ timeSpent: timeDifference });

    $("tbody tr").last().html("<td className='col-sm-4'><p>" + self.state.newProjectName + "</p></td><td className='col-sm-4'>" + timeDifference + "</td><td className='col-sm-2'><p>" + self.state.startTimeDisplay + "</p></td><td className='col-sm-2'><p>" + stopTimeDisplayed + "</p></td>");
  },

  inputChanged: function inputChanged(event) {
    this.setState({ newProjectName: event.target.value });
  },

  addingInput: function addingInput() {
    this.setState({ newProjectName: "" });
  },

  render: function render() {
    var minutes = 0;
    var seconds = 0;
    var milliseconds = 0;
    var hours = 0;
    var times = [];
    var on = false;
    var newProjectInput = React.createElement("input", { className: "project-input", type: "text", onFocus: this.addingInput, onChange: this.inputChanged, value: this.state.newProjectName });
    var startButton = React.createElement(
      "button",
      { className: "start btn", onClick: this.toggleTimer },
      this.state.buttonText
    );
    var resetButton = React.createElement(
      "button",
      { className: "reset btn", onClick: this.resetTimer },
      "Reset"
    );
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-sm-4" },
          React.createElement(
            "p",
            null,
            "Name your task:"
          ),
          newProjectInput
        ),
        React.createElement(
          "p",
          { className: "time col-sm-4" },
          this.state.emptyTimer
        ),
        React.createElement(
          "div",
          { className: "buttons col-sm-4" },
          startButton
        )
      ),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "table",
          { className: "table table-striped" },
          React.createElement(
            "thead",
            null,
            React.createElement(
              "tr",
              null,
              React.createElement(
                "th",
                { className: "col-sm-4" },
                React.createElement(
                  "p",
                  null,
                  "Your Tasks"
                )
              ),
              React.createElement(
                "th",
                { className: "col-sm-4" },
                React.createElement(
                  "p",
                  null,
                  "Time Spent"
                )
              ),
              React.createElement(
                "th",
                { className: "col-sm-2" },
                React.createElement(
                  "p",
                  null,
                  "Started"
                )
              ),
              React.createElement(
                "th",
                { className: "col-sm-2" },
                React.createElement(
                  "p",
                  null,
                  "Stopped"
                )
              )
            )
          ),
          React.createElement("tbody", null)
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(Timer, null), document.getElementById('react'));
