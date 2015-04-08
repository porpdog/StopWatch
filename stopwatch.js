

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
	var mainTimer; //holds the Main Timer object so that it can be stopped (cleared) when the stop button is clicked
	var starttime;  //clock time in milliseconds
	var stoppedTime = 0; //stores the milliseconds time when stop is clicked
	var stoppedLapTime = 0; //stores the lap milliseconds time when stop is clicked
	var currentTime = 0;  //used by stop method and calculateMainTimer to maintain the stopped time
	var currentLapTime = 0; //used by stop method and calculateMainTimer to maintain the stopped time
	var lapstarttime;  //clock time in milliseconds for lap timer
	var stopped = false;  
	var resetted = false;  //flag set to true when the reset button is clicked (could't think of a better name)

	var startBtn = document.getElementsByClassName('circle start');
	var stopBtn = document.getElementsByClassName('circle stop');
	var lapBtn = document.getElementsByClassName('circle lap');
	var resetBtn = document.getElementsByClassName('circle reset');
    
    //initializes event listeners on the HTML elements
	var initialize = function () {
	    
	    starttime = new Date().getTime();
	    lapstarttime = new Date().getTime();
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

	    resetBtn[0].addEventListener('click', function () {
	        stopwatch.reset();
	    }, false);
	}

    //Method that runs when the timer is running
	var start = function () {

	    if (resetted) {
	        starttime = new Date().getTime();
	        lapstarttime = new Date().getTime();
	        stopped = false;
	        resetted = false;
	    }

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
	    stoppedTime = currentTime;
	    stoppedLapTime = currentLapTime;
        starttime = new Date().getTime();
	    lapstarttime = new Date().getTime();
	    stopped = true;
	    resetted = false;
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

	        resetLapTimer();
	    }
	}

	var reset = function () {
	    stop();
	    resetted = true;
	    stopped = false;
	    lapCounter = 0;  //Clear the counter since we are resetting everything
	    resetMainTimer();
	    setMainTimerDisplay();
	    resetLapTimer();
	    setLapTimerDisplay();
	    resetLaps();
	    setResetControls();
	    starttime = new Date().getTime();
	    lapstarttime = new Date().getTime();

	}

    /***************************PRIVATE METHODS**************************************************************/

    //manages the main timer logic
	function calculateMainTimer() {

	    //if user stopped the stop watch, we need to maintain the time
        //that was left
	    if (stoppedTime > 0) {

	        currentTime = new Date().getTime() - stoppedTime;
	        starttime = currentTime;
	        currentTime = new Date().getTime() - starttime;
	        stoppedTime = 0;
	    }
        else
	        currentTime = new Date().getTime() - starttime;
	    
	    milliseconds = Math.floor(currentTime / 10);
	    seconds = Math.floor(currentTime / 1000);
	    minutes = Math.floor(seconds / 60);
	    seconds = seconds - (minutes * 60);
	   

	}

    //manages the main timer display
	function setMainTimerDisplay() {


	    var clockDiv = document.getElementsByClassName('clock')[0];

        //get last two digits of milliseconds
	    var length = milliseconds.toString().length;
	    milliseconds = milliseconds.toString().substr(length - 2, 2);
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

	        //hide the start button
	        var startCircle = document.getElementsByClassName('circle start')[0];
	        startCircle.style.display = 'none';

	        //show the reset button	    
	        var resetCircle = document.getElementsByClassName('circle reset')[0];
	        resetCircle.style.display = 'none';
	    }
	    else {
	        //show the lap button
	        var stopCircle = document.getElementsByClassName('circle lap')[0];
	        stopCircle.style.display = 'block';
	    }
	}
   

	function calculateLapTimer() {
	    
	    if (stoppedLapTime > 0) {

	        currentLapTime = new Date().getTime() - stoppedLapTime;
	        lapstarttime = currentLapTime;
	        stoppedLapTime = 0;
	    }
	    else
	        currentLapTime = new Date().getTime() - lapstarttime;
	   
	    lap_milliseconds = Math.floor(currentLapTime / 10);
	    lap_seconds = Math.floor(currentLapTime / 1000);
	    lap_minutes = Math.floor(lap_seconds / 60);
	    lap_seconds = lap_seconds - (lap_minutes * 60);
	}

	function setLapTimerDisplay() {

	    var length = lap_milliseconds.toString().length;
	    lap_milliseconds = lap_milliseconds.toString().substr(length - 2, 2);
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

	function setMainClockText() {

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
	    lapCircle.style.display = 'none';

	    //show the reset button	    
	    var resetCircle = document.getElementsByClassName('circle reset')[0];
	    resetCircle.style.display='block';
	}

	function resetMainTimer() {
	    //reset main clock
	    milliseconds = 0;
	    seconds = 0;
	    minutes = 0;
	    stoppedTime = 0;
	    //starttime = 0;
	}

	function resetLapTimer() {
	    //reset lap clock
	    lap_milliseconds = 0;
	    lap_seconds = 0;
	    lap_minutes = 0;
	    stoppedLapTime = 0;
	    lapstarttime = new Date().getTime();


	   
	}

	function resetLaps() {
	    //remove lap display
	    var lapList = document.getElementById('lapList');
	    var listItems = document.querySelectorAll('#lapList > li');
	    while (lapList.firstChild) {
	        lapList.removeChild(lapList.firstChild);
	    }
	}

	function setResetControls() {

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
	    lapCircle.style.display = 'block';

	    //show the reset button	    
	    var resetCircle = document.getElementsByClassName('circle reset')[0];
	    resetCircle.style.display = 'none';
	}

	

    /*********************************************END OF PRIVATE METHODS*************************************************/

    return {
        //exposes these public methods for the event listeners
        start: start,
        stop: stop,
        captureLap: captureLap,
        reset: reset,
        initialize: initialize
    }

})();