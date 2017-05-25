// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    $("#articles").append(data[i].comment);

  }
});


// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");
  

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles" + thisId,


  })
    // With that done, add the comment information to the page
    .done(function(data) {
      console.log(data);
      // The title of the article
      $("#comments").append("<h2>" + data.title + "</h2>");
      // A textarea to add a new comment
      $("#comments").append("<h3> Enter Your Name! <h3>" + "<textarea id='name' name='comment'></textarea>");

      $("#comments").append("<textarea id='newComment' name='comment'></textarea>");
      // A button to submit a new comment, with the id of the article saved to it
      $("#comments").append("<button data-id='" + data._id + "' id='addComment'>Add Comment</button>");

      // If there's a note in the article
      if (data.comment) {
        // Place the comment in the comment input
        $("#newComment").val(data.comment.newComment);

      }
    });
});



// When you click the savenote button
$(document).on("click", "#addComment", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/:id" + thisId,
    data: {
      id: thisId,

      name: $("#name").val(),
      // Value taken from comment input
      comment: $("#newComment").val()
         }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // add comment to the section
      $("#comments").append(data);

      $("#comments").append("<button comment-id='" + data._id + "' id='deleteComment'>Delete Comment</button>");
    });
$(document).on("click", "#deleteComment", function() {
  var thisId = $(this).attr("deleteComment");
  $.ajax({
    method: "DELETE",
    url: "/articles/:id" + thisId

    
  })
  .done(function(data) {
    $("#comments").empty();

  });
});

  // Also, remove the values entered in the input and textarea for note entry
  $("#newComment").val("");
  $("#name").val("");
});
