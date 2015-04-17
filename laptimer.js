'use strict'
var lapTimer = new Object();

//JS library for running a stop watch
lapTimer = {
    

    lap_milliseconds: 0,  //lap timer milliseconds
    lap_seconds: 0, //lap timer seconds
    lap_minutes: 0, //lap timer minutes
    lap: '', //used to store current lap time string
    mylap: '', //used to store current lap time string
    currentLapTime: 0, //used by stop method and calculateMainTimer to maintain the stopped time
    lapstarttime: 0,  //clock time in milliseconds for lap timer
    lapCounter: 0,  //used when creating the <li>'s with an increment count
    stoppedLapTime: 0, //stores the lap milliseconds time when stop is clicked

    initialize: function () {
        var self = this;
        self.lapstarttime = new Date().getTime();
        self.setLapTimerDisplay();
    },

    //This manages the lap timer logic and display
    startLapTimer: function () {

        this.calculateLapTimer();

        this.setLapTimerDisplay();

        this.setLapTimerControls();
    },

    captureLap: function () {
        var self = this;
        if (stopwatch.started) {
            lapTimer.lapCounter++;

            var lapList = document.getElementById('lapList');
            //Add the spans for the laps
            //Lap x span
            var li = document.createElement('li');
            var titleSpan = document.createElement('span');
            titleSpan.setAttribute('class', 'title');
            var lapTitle = document.createTextNode('Lap ' + lapTimer.lapCounter);
            li.appendChild(titleSpan);
            titleSpan.appendChild(lapTitle);

            //Lap time span
            var timeSpan = document.createElement('span');
            timeSpan.setAttribute('class', 'time');
            var lapTime = document.createTextNode(self.mylap);
            li.appendChild(timeSpan);
            timeSpan.appendChild(lapTime);

            //append to listitem
            lapList.appendChild(li);

            lapTimer.resetLapTimer();
        }
    },

    calculateLapTimer: function () {
        var self = this;
        if (self.stoppedLapTime > 0) {

            self.currentLapTime = new Date().getTime() - self.stoppedLapTime;
            self.lapstarttime = self.currentLapTime;
            self.stoppedLapTime = 0;
        }
        else
            self.currentLapTime = new Date().getTime() - self.lapstarttime;

        self.lap_milliseconds = Math.floor(self.currentLapTime / 10);
        self.lap_seconds = Math.floor(self.currentLapTime / 1000);
        self.lap_minutes = Math.floor(self.lap_seconds / 60);
        self.lap_seconds = self.lap_seconds - (self.lap_minutes * 60);
    },

    setLapTimerDisplay: function () {
        var self = this;
        var length = self.lap_milliseconds.toString().length;
        self.lap_milliseconds = self.lap_milliseconds.toString().substr(length - 2, 2);
        //if any of the time elements are single digits, pre-append a 0 for the lap time
        self.lap_milliseconds = self.lap_milliseconds.toString().length > 1 ? self.lap_milliseconds : '0' + self.lap_milliseconds;
        self.lap_seconds = self.lap_seconds.toString().length > 1 ? self.lap_seconds : '0' + self.lap_seconds;
        self.lap_minutes = self.lap_minutes.toString().length > 1 ? self.lap_minutes : '0' + self.lap_minutes;
        var lapClockDiv = document.getElementsByClassName('lapclockText')[0];

        //display lap timer
        var laptime = self.lap_minutes + ':' + self.lap_seconds + ':' + self.lap_milliseconds;
        lapClockDiv.innerText = laptime;
        self.mylap = laptime;
    },


    setLapTimerControls: function () {
        var self = this;
        //'enable' lap timer
        var lapCircle = document.getElementsByClassName('circle lap')[0];
        lapCircle.style.cursor = 'pointer';

    },



    resetLapTimer: function () {
        var self = this;
        //reset lap clock
        self.lap_milliseconds = 0;
        self.lap_seconds = 0;
        self.lap_minutes = 0;
        self.stoppedLapTime = 0;
        self.lapstarttime = new Date().getTime();



    },

    resetLaps: function () {
        //remove lap display
        var lapList = document.getElementById('lapList');
        var listItems = document.querySelectorAll('#lapList > li');
        while (lapList.firstChild) {
            lapList.removeChild(lapList.firstChild);
        }
    }
    /*********************************************END OF PRIVATE METHODS*************************************************/



}