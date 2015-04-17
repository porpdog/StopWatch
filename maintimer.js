
var mainTimer = new Object();

//JS library for running a stop watch
var mainTimer = {

     milliseconds : 0,  //main timer milliseconds
     seconds : 0,  //main timer seconds
     minutes : 0, //main timer minutes
     stoppedTime : 0, //stores the milliseconds time when stop is clicked
     currentTime : 0,  //used by stop method and calculateMainTimer to maintain the stopped time
     starttime : 0,  //clock time in milliseconds
   
     initialize: function () {
         var self = this;
         self.starttime = new Date().getTime();
         self.setMainTimerDisplay();
     },

    //manages the main timer logic
    calculateMainTimer : function() {
        var self = this;
        //if user stopped the stop watch, we need to maintain the time
        //that was left
        if (self.stoppedTime > 0) {

            self.currentTime = new Date().getTime() - self.stoppedTime;
            self.starttime = self.currentTime;
            self.currentTime = new Date().getTime() - self.starttime;
            self.stoppedTime = 0;
        }
        else
            self.currentTime = new Date().getTime() - self.starttime;

        self.milliseconds = Math.floor(self.currentTime / 10);
        self.seconds = Math.floor(self.currentTime / 1000);
        self.minutes = Math.floor(self.seconds / 60);
        self.seconds = self.seconds - (self.minutes * 60);


    },

    //manages the main timer display
    setMainTimerDisplay : function () {

        var self = this;
        var clockDiv = document.getElementsByClassName('clock')[0];

        //get last two digits of milliseconds
        var length = self.milliseconds.toString().length;
        self.milliseconds = self.milliseconds.toString().substr(length - 2, 2);
        //if any of the time elements are single digits, pre-append a 0
        self.milliseconds = self.milliseconds.toString().length > 1 ? self.milliseconds : '0' + self.milliseconds;
        self.seconds = self.seconds.toString().length > 1 ? self.seconds : '0' + self.seconds;
        self.minutes = self.minutes.toString().length > 1 ? self.minutes : '0' + self.minutes;

        //display main timer
        var time = self.minutes + ':' + self.seconds + ':' + self.milliseconds;
        clockDiv.innerText = time;
    },

    resetMainTimer: function () {
        var self = this;
        //reset main clock
        self.milliseconds = 0;
        self.seconds = 0;
        self.minutes = 0;
        self.stoppedTime = 0;
        //starttime = 0;
    }
}