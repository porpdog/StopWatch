var stopwatch = new Object();

//JS library for running a stop watch
stopwatch =  {
    self : this,

	
	started : false,  //True if timer is running	
	intervalTimer: null, //holds the Main Timer object so that it can be stopped (cleared) when the stop button is clicked
	stopped : false,  
	resetted : false,  //flag set to true when the reset button is clicked (could't think of a better name)
	
	startBtn : document.getElementsByClassName('circle start'),
	stopBtn : document.getElementsByClassName('circle stop'),
	lapBtn : document.getElementsByClassName('circle lap'),
	resetBtn : document.getElementsByClassName('circle reset'),
    
    //initializes event listeners on the HTML elements
	initialize : function () {
	    
        //initialize each timer
	    lapTimer.initialize();
	    mainTimer.initialize();
	    //The returned array index below could present a problem
	    //in the future if the HTML was changed.  I only did this
	    //to show clean HTML
	    stopwatch.startBtn[0].addEventListener('click', function () {
	        intervalTimer = setInterval(stopwatch.start, 1);
	    }, false);

	    stopwatch.stopBtn[0].addEventListener('click', function () {
	        stopwatch.stop(intervalTimer);
	    }, false);

	    stopwatch.lapBtn[0].addEventListener('click', function () {
	        lapTimer.captureLap();
	    }, false);

	    stopwatch.resetBtn[0].addEventListener('click', function () {
	        stopwatch.reset();
	    }, false);
	    this.reset();
	},

    //Method that runs when the timer is running
	start : function () {

	    if (stopwatch.resetted ) {
	        mainTimer.starttime = new Date().getTime();
	        lapTimer.lapstarttime = new Date().getTime();
	        stopwatch.stopped = false;
	        stopwatch.resetted = false;
	    }

	    mainTimer.calculateMainTimer();

	    mainTimer.setMainTimerDisplay();
	   
	    stopwatch.setStartedControls();
        //call the lap timer method
	    lapTimer.startLapTimer();
	    
	},
        
    //This manages the lap timer logic and display
	startLapTimer : function () {
	    
	    lapTimer.calculateLapTimer();

	    lapTimer.setLapTimerDisplay();
	    
	    lapTimer.setLapTimerControls();
	},

	stop : function (intervalTimer) {
	    //stop the timer
	    
	    clearInterval(intervalTimer);
	    mainTimer.stoppedTime = mainTimer.currentTime;
	    lapTimer.stoppedLapTime = lapTimer.currentLapTime;
        mainTimer.starttime = new Date().getTime();
	    lapTimer.lapstarttime = new Date().getTime();
	    stopwatch.stopped = true;
	    stopwatch.resetted = false;
	    stopwatch.setStoppedControls();
        
	},


	reset : function () {
	    stopwatch.stop();
	    stopwatch.resetted = true;
	    stopwatch.stopped = false;
	    lapTimer.lapCounter = 0;  //Clear the counter since we are resetting everything
	    mainTimer.resetMainTimer();
	    mainTimer.setMainTimerDisplay();
	    lapTimer.resetLapTimer();
	    lapTimer.setLapTimerDisplay();
	    lapTimer.resetLaps();
	    stopwatch.setResetControls();
	    stopwatch.starttime = new Date().getTime();
	    stopwatch.lapstarttime = new Date().getTime();

	},

    /***************************PRIVATE METHODS**************************************************************/

	setStartedControls: function() {

	    if (!stopwatch.started) {
	        //Only run this once during the interval to not waste cycles
	        stopwatch.started = true;

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
	},

	setStoppedControls : function () {

	    stopwatch.started = false;
	    //hide the stop button
	    var stopCircle = document.getElementsByClassName('circle stop')[0];
	    stopCircle.style.display = 'none';

	    //unhide the start button
	    var startCircle = document.getElementsByClassName('circle start')[0];
	    startCircle.style.display = 'block';
	    

	    //'disable' the Lap button
	    var lapCircle = document.getElementsByClassName('circle lap')[0];
	    lapCircle.style.cursor = 'default';
	    lapCircle.style.display = 'none';

	    //show the reset button	    
	    var resetCircle = document.getElementsByClassName('circle reset')[0];
	    resetCircle.style.display='block';
	},



	setResetControls : function () {

	    stopwatch.started = false;
	    //hide the stop button
	    var stopCircle = document.getElementsByClassName('circle stop')[0];
	    stopCircle.style.display = 'none';

	    //unhide the start button
	    var startCircle = document.getElementsByClassName('circle start')[0];
	    startCircle.style.display = 'block';

	    //'disable' the Lap button
	    var lapCircle = document.getElementsByClassName('circle lap')[0];
	    lapCircle.style.cursor = 'default';
	    lapCircle.style.display = 'block';

	    //show the reset button	    
	    var resetCircle = document.getElementsByClassName('circle reset')[0];
	    resetCircle.style.display = 'none';
	}

	

    /*********************************************END OF PRIVATE METHODS*************************************************/

    

}