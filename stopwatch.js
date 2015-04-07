

//JS library for running a stop watch
var stopwatch = (function () {

	var milliseconds=0;  //main timer milliseconds
	var seconds = 0;  //main timer seconds
	var minutes = 0; //main timer minutes
	var lap_milliseconds = 0;  //lap timer milliseconds
	var lap_seconds = 0; //lap timer seconds
	var lap_minutes = 0; //lap timer minutes
	var lap = ''; //used to store current lap time string
	var lapCounter = 0;  //used when creating the <li>'s with an increment count
	var started = false;  //True if timer is running
	var s;
	var mainTimer;
    
	var startBtn = document.getElementsByClassName('circle start');
	var stopBtn = document.getElementsByClassName('circle stop');
	var lapBtn = document.getElementsByClassName('circle lap');
    
    //initializes event listeners on the HTML elements
	var initialize = function () {
	    

	    //The returned array index below could present a problem
	    //in the future if the HTML was changed.  I only did this
	    //to show clean HTML
	    startBtn[0].addEventListener('click', function () {
	        mainTimer = setInterval(stopwatch.start, 1);
	    }, false);

	    stopBtn[0].addEventListener('click', function () {
	        stopwatch.stop(mainTimer);
	    }, false);

	    lapBtn[0].addEventListener('click', function () {
	        stopwatch.captureLap();
	    }, false);
	}

    //Method that runs when the timer is running
	var start = function () {

	    calculateMainTimer();

	    setMainTimerDisplay();
	   
	    setStartedControls();
        //call the lap timer method
	    startLapTimer();
	    
	}
        
    //This manages the lap timer logic and display
	var startLapTimer = function () {
	    
	    calculateLapTimer();

	    setLapTimerDisplay();
	    
	    setLapTimerControls();
	}

	var stop = function (mainTimer) {
        //stop the timer
	    clearInterval(mainTimer);

	    setStoppedControls();
        
    }

	var captureLap = function () {
	    if (started) {
	        lapCounter++;
	        var lapList = document.getElementById('lapList');
	        //Add the spans for the laps
	        //Lap x span
	        var li = document.createElement('li');
	        var titleSpan = document.createElement('span');
	        titleSpan.setAttribute('class', 'title');
	        var lapTitle = document.createTextNode('Lap ' + lapCounter);
	        li.appendChild(titleSpan);
	        titleSpan.appendChild(lapTitle);

            //Lap time span
	        var timeSpan = document.createElement('span');
	        timeSpan.setAttribute('class', 'time');
	        var lapTime = document.createTextNode(lap);
	        li.appendChild(timeSpan);
	        timeSpan.appendChild(lapTime);

            //append to listitem
	        lapList.appendChild(li);

	        //reset lap clock
	        lap_milliseconds = 0;
	        lap_seconds = 0;
	        lap_minutes = 0;

	    }
	}

    /***************************PRIVATE METHODS**************************************************************/

    //manages the main timer logic
	function calculateMainTimer() {
	    milliseconds++;

	    //reset milliseconds and add one to seconds
	    if (milliseconds == 99) {
	        seconds++;
	        milliseconds = 0;
	    }


	    //reset seconds and add one to minutes
	    if (seconds == 59) {
	        minutes++;
	        seconds = 0
	        milliseconds = 0;
	    }
	}

    //manages the main timer display
	function setMainTimerDisplay() {

	    var clockDiv = document.getElementsByClassName('clock')[0];

	    //if any of the time elements are single digits, pre-append a 0
	    milliseconds = milliseconds.toString().length > 1 ? milliseconds : '0' + milliseconds;
	    seconds = seconds.toString().length > 1 ? seconds : '0' + seconds;
	    minutes = minutes.toString().length > 1 ? minutes : '0' + minutes;

	    //display main timer
	    var time = minutes + ':' + seconds + ':' + milliseconds;
	    clockDiv.innerText = time;
	}


	function setStartedControls() {

	    if (!started) {
	        //Only run this once during the interval to not waste cycles
	        started = true;

	        //switch the stop and start buttons
	        var stopCircle = document.getElementsByClassName('circle stop')[0];
	        stopCircle.style.display = 'block';
	        var startCircle = document.getElementsByClassName('circle start')[0];
	        startCircle.style.display = 'none';

	    }
	}
   

	function calculateLapTimer() {
	    lap_milliseconds++;
	    //reset lap milliseconds and add one to lap seconds
	    if (lap_milliseconds == 99) {
	        lap_seconds++;
	        lap_milliseconds = 0;
	    }

	    //reset lap seconds and add one to minutes
	    if (lap_seconds == 59) {
	        lap_minutes++;
	        lap_seconds = 0
	        lap_milliseconds = 0;
	    }
	}

	function setLapTimerDisplay() {

	    //if any of the time elements are single digits, pre-append a 0 for the lap time
	    lap_milliseconds = lap_milliseconds.toString().length > 1 ? lap_milliseconds : '0' + lap_milliseconds;
	    lap_seconds = lap_seconds.toString().length > 1 ? lap_seconds : '0' + lap_seconds;
	    lap_minutes = lap_minutes.toString().length > 1 ? lap_minutes : '0' + lap_minutes;
	    var lapClockDiv = document.getElementsByClassName('lapclockText')[0];

	    //display lap timer
	    var laptime = lap_minutes + ':' + lap_seconds + ':' + lap_milliseconds;
	    lapClockDiv.innerText = laptime;
	    lap = laptime;
	}

	function setLapTimerControls() {

	    //'enable' lap timer
	    var lapCircle = document.getElementsByClassName('circle lap')[0];
	    lapCircle.style.cursor = 'pointer';

	}

	function setStoppedControls() {

	    //hide the stop button
	    var stopCircle = document.getElementsByClassName('circle stop')[0];
	    stopCircle.style.display = 'none';

	    //unhide the start button
	    var startCircle = document.getElementsByClassName('circle start')[0];
	    startCircle.style.display = 'block';
	    started = false;

	    //'disable' the Lap button
	    var lapCircle = document.getElementsByClassName('circle lap')[0];
	    lapCircle.style.cursor = 'default';
	}

    /*********************************************END OF PRIVATE METHODS*************************************************/

    return {
        //exposes these public methods for the event listeners
        start: start,
        stop: stop,
        captureLap: captureLap,
        initialize: initialize
    }

})();