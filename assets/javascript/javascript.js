// WEEK 6 HOMEWORK - GIPHY API

// create an array of gifs that will initially display on the page upon load
var gifArray = ["Rugrats", "Doug", "Pokemon", "Animaniacs", "The Magic School Bus", "Duck Tales", "Hey Arnold", "Arthur", "The Simpsons", "Tom and Jerry"];

function alertAddedGif() {
    // console.log(this);
    // console.log($(this).attr("data-name"));
  };

$(document).on("click", ".gif-button", function() {
    $("#gif-area").empty();

    var reaction = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + reaction + "&api_key=UaaIx2XwF0mFE1a0QtvIOChcEK6wQ54L&limit=10";
    
    // execute the $.ajax()
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
        console.log(response);
      
        for (var i = 0; i < response.data.length; i++) {
            // Make a div with jQuery and store it in a variable named animalDiv.
            var searchDiv = $("<div class='searched-item'>");
            // 
            var rating = response.data[i].rating;
            // Make a paragraph tag with jQuery and store it in a variable named p.
            var p = $("<p>").text("Rating: " + rating);

            var animated = response.data[i].images.fixed_height.url;

            var still = response.data[i].images.fixed_height_still.url;
            // Make an image tag with jQuery and store it in a variable named animalImage.
            var image = $("<img>");
            // Set the image's src to results[i]'s fixed_height.url.
            image.attr("src", still);
            image.attr("data-still", still);
            image.attr("data-animated", animated);
            image.attr("data-state", "still");
            image.addClass("searchedImage");
            searchDiv.append(p);
            searchDiv.append(image);
            $("#gif-area").prepend(searchDiv);
        }
    })
});

// function for loading these buttons
function renderButtons() {
    $("#buttons-area").empty();
    for (var i = 0; i < gifArray.length; i++) {
        var a = $("<button>");
        // Adding a class
        a.addClass("gif-button");
        // Added a data-attribute
        a.attr("data-name", gifArray[i]);
        // Provided the initial button text
        a.text(gifArray[i]);
        // Added the button to the HTML
        $("#buttons-area").append(a);
       }
};

// function for when submit button is clicked
$("#add-gif").on("click", function(event) {
    event.preventDefault();
    // Write code to grab the text the user types into the input field
    var newGif = $("#gif-input").val().trim();
    // Write code to add the new movie into the movies array
    gifArray.push(newGif);
    // The renderButtons function is called, rendering the list of movie buttons
    renderButtons();
    });

$(document).on("click", ".searchedImage", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).data("animated"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
});

// Calling the renderButtons function to display the initial list of movies
renderButtons();
