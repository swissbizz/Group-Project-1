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
var time = document.getElementById('timer');
var start = document.getElementById('start');
var pause = document.getElementById('pause');
var stop = document.getElementById('stop');
var seconds = 0;
var minutes = 0;
var hours = 0;
var t;

// addedTime is a decimal / float so that we could see the fractional changes
var addedSeconds = 0, addedMinutes = 0, addedHours = 0, addedTime = 0.01, newTime = 0;

function add()
{
    seconds++;
    if (seconds >= 60)
    {
        seconds = 0;
        minutes++;
        if (minutes >= 60)
        {
            minutes = 0;
            hours++;
        }
    }

    time.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
        ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

function timer()
{
      t = setTimeout(add, 1000);
}


$("#start").on("click", function(event) {
        event.preventDefault();
        $("#start").empty().append("Start");
        clearTimeout(t);
        timer();
        console.log("Start");
    });

$("#pause").on("click", function(){
    clearTimeout(t);
    $("#start").empty().append("Start");
});

$("#stop").on("click", function() {

    console.log("Seconds: " + seconds + " Minutes: " + minutes + " Hours: " + hours);
    //send the values to go get added
    sum(hours, minutes, seconds);
    //console.log("stop");
    $("#start").empty().append("Start");
    clearInterval(t);
    time.textContent = "00:00:00";
    seconds = 0;
    minutes = 0;
    hours = 0;

 });
//END OF TIMER


// this function gets called everytime we stop the timerSection
// basically, take the time we had when we stopped the timer
// then add them all up... we want the answer to be in mins so hrs/secs get converted into minutes
function sum(hrs, mins, secs){
  newTime = hrs, mins, secs;
  console.log("This session's time: " + newTime);
  //send the sum to the db
  saveToDb(newTime);
}

//changed it so that we only save one value in the database, the sum
function saveToDb(time) {
  var saveTime = {
    time: time
  };
//everytime you stop the timer send the value of added time to the database so that we could retrieve it later
  database.ref("/allTime").push(saveTime);
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
  quote();
});

// Random quotes Ends Here

// music api
