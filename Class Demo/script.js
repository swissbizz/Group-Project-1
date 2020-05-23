// Initialize Firebase

var config = {
  apiKey: "AIzaSyDAQEQ-Kv0IOWzZRPFOdp2tuG14h6rEirE",
  authDomain: "studybuddy-dfa34.firebaseapp.com",
  databaseURL: "https://studybuddy-dfa34.firebaseio.com",
  projectId: "studybuddy-dfa34",
  storageBucket: "",
  messagingSenderId: "585854569143"
};
firebase.initializeApp(config);
var database = firebase.database();
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
