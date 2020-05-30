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

$(".startBtn").on("click", start);
$(".pauseBtn").on("click", stop);
$(".stopBtn").on("click", recordSession);
$(".stopBtn").on("click", stop);
$(".stopBtn").on("click", reset);
$(".stopBtn").on("click", updateChart);

var intervalId;

var clockRunning = false;
var time = 0;
var lap = 1;

function start() {
  if (!clockRunning) {
    intervalId = setInterval(count, 1000);
    clockRunning = true;
  }
}

function stop() {
  clearInterval(intervalId);
  clockRunning = false;    
}

function reset() {
  time = 0;
  lap = 1;
  $("#display").text("00:00");
}

function recordSession() {
  var converted = timeConverter(time);

  database.ref().push({
    time: converted,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

  $("#lastSession").append("<p>Session: " + lap + " : " + converted + "</p>");

  lap++;
}

database.ref().on("child_added", function(snapshot) {
  console.log("Session Time Recorded: " + snapshot.val().time);
  $("#sessions").append("<p> Duration: " + snapshot.val().time + "</p>");
},function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

function count() {
  time++;
  var converted = timeConverter(time);
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
  } else if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return minutes + ":" + seconds;
}

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

const chartElement = document.getElementById("myChart");

const chart = new Chart(chartElement, {
  type: 'pie',
  data: {
    datasets: [{
      backgroundColor: [
				"red",
				"blue",
			],
      data: getData()
    }],
    labels: [
      'Worked',
      'Played'
    ]
  }  
});

function updateChart() {
  chart.data.datasets[0].data = getData()
  chart.update()
}

function getData() {
  const maxMinutes = 1440;
  const currentSessionTimes = document.querySelector('#lastSession').children
  let totalTimeWorked = 0;

  for(let i = 0; i < currentSessionTimes.length; i++){
    const currentTimeText = currentSessionTimes[i].innerText
    const minutes = currentTimeText.substr(currentTimeText.length - 5, 2)
    const time = parseInt(minutes, 10)

    totalTimeWorked += time;
  }

  const minutesPlayed = maxMinutes - totalTimeWorked

  return [totalTimeWorked, minutesPlayed]
}
