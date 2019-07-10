var topics = ["Cat", "Dog", "Rabbit", "Lion", "Frog", "Mouse", "Monkey", "Lizard", "Horse", "Skunk", "Goldfish", "Bird", "Pig"];

function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < topics.length; i++) {

        var a = $("<button type='button' class='btn btn-outline-primary'>");
        a.addClass("animal");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
    }
}

$(".btn-outline-danger").on("click", function (event) {  

    event.preventDefault();
    var animal = $("#animal-input").val().trim();
    topics.push(animal);
    renderButtons();
});


renderButtons();


$(document).on("click",".btn-outline-primary", function () {

    var animalsGif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalsGif + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {
            
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var animalDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var animalImage = $("<img>");
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                animalImage.attr("data-animate", results[i].images.fixed_height.url);
                animalImage.attr("data-state", "still");
                animalImage.addClass("gif");
                animalDiv.append(p);
                animalDiv.append(animalImage);
                $("#gifs-appear-here").prepend(animalDiv);
            }
        });
});

$(document).on("click", ".gif", function () {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});