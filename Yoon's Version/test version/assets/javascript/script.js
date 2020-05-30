// Initialize Firebase
var config = {
    apiKey: "AIzaSyCgG_gbaQ8F7QLrN4RvZse3d62OgBmKoyU",
    authDomain: "group-project-1-ba68c.firebaseapp.com",
    databaseURL: "https://group-project-1-ba68c.firebaseio.com",
    projectId: "group-project-1-ba68c",
    storageBucket: "group-project-1-ba68c.appspot.com",
    messagingSenderId: "495056447741",
    appId: "1:495056447741:web:32658de81b8b1697f7f694",
    measurementId: "G-ELMHRP194B"
  };

  firebase.initializeApp(config);

 var database = firebase.database();


//TIMER
$(".startBtn").on("click", start);
$(".pauseBtn").on("click", stop);
$(".stopBtn").on("click", recordSession);
$(".stopBtn").on("click", stop);
$(".stopBtn").on("click", reset);


var intervalId;

var clockRunning = false;
var time = 0;
var lap = 1;

function start() {

  // DONE: Use setInterval to start the count here and set the clock to running.
  if (!clockRunning) {
    intervalId = setInterval(count, 1000);
    clockRunning = true;
  }
}



function stop() {

  // DONE: Use clearInterval to stop the count here and set the clock to not be running.
  clearInterval(intervalId);
  clockRunning = false;    
}


function reset() {

  time = 0;
  lap = 1;

  // DONE: Change the "display" div to "00:00."
  $("#display").text("00:00");

}

function recordSession() {

  // DONE: Get the current time, pass that into the timeConverter function,
  //       and save the result in a variable.
  var converted = timeConverter(time);
  
  database.ref().push({
    time: converted,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
  

  // DONE: Add the current lap and time to the "laps" div.
  $("#lastSession").append("<p>Session: " + lap + " : " + converted + "</p>");

  // DONE: Increment lap by 1. Remember, we can't use "this" here.
  lap++;

}

database.ref().on("child_added", function(snapshot) {
  console.log("Session Time Recorded: " + snapshot.val().time);
  $("#sessions").append("<p> Duration: " + snapshot.val().time + "</p>");

}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});


function count() {

  // DONE: increment time by 1, remember we cant use "this" here.
  time++;

  // DONE: Get the current time, pass that into the timeConverter function,
  //       and save the result in a variable.
  var converted = timeConverter(time);


  // DONE: Use the variable we just created to show the converted time in the "display" div.
  $("#display").text(converted);
}

function timeConverter(t) {

  var minutes = Math.floor(t / 60);
  var seconds = t - (minutes * 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (minutes === 0) {
    minutes = "00";
  }
  else if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return minutes + ":" + seconds;
}
//END OF TIMER

// TABLE




// Random Quotes Starts Here

function quote() {
  $.ajax({
    url: "https://api.forismatic.com/api/1.0/",
    jsonp: "jsonp",
    dataType: "jsonp",
    data: {
      method: "getQuote",
      lang: "en",
      format: "jsonp"
    },
    success: function(response) {
      $('#quote').html(response.quoteText)
      $('#author').html("<br/>&dash; " + response.quoteAuthor)
    }
  });
}
$("#quoteButton").on("click", function() {
  $("#home").css("height", "725px");
  quote();
});

// Random quotes Ends Here

// music api
