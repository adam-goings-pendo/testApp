// defining variables
const topics = ["Van Damme", "Schwarzenegger", "Chuck Norris"];


//take each item in the array and make a button
function createButtons() {
  for (let i = 0; i < topics.length; i++) {
  $("#buttonDiv").append(`<button value="${topics[i]}">${topics[i]}</button>`);
       console.log(topics[i]);
  }
}
//when submit button is pressed, grab this value and make a button
$("input[type=submit").on("click", function(event){
  event.preventDefault();
  $("#buttonDiv").empty();

  let actor = $("input[name=actorName]").val();
  
  console.log(actor);
  topics.push(actor);
  createButtons();
})
//calls the createButtons function
createButtons();

//when the button is clicked, it grabs 10 still images based on the string from the array
$(document).on("click", "button" , function pullGiphy() {

  //this removes the spaces in the strings of the array and adds a plus sign for the purpose of the URL
  let person = $(this).attr("value").replace(/\s/g, "+");

  console.log(person);
  console.log(this);

  let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=OFiNbG0aDHVA3tTPYZ9tJwJmeHjtQmmy&limit=10";

  console.log(queryURL);

  //calls the giphy API
  $.ajax({
    url: queryURL,
    method: "GET"
  })

  .then(function(response) {

    let results = response.data;
    console.log(response.data);

    //loop through each item in the object returned from the giphy api and show those images
    for (let j = 0; j < results.length; j++) {

      //set the variable for the rating
      let rating = results[j].rating;

      //display this for each gif
      let p = $("<p>").text("Rating: " + rating);

      //creating a new div to insert our image in
      let gifDiv = $("<div>");

      //creating the img tag within the previous div
      let personImage = $("<img class='newImage'>");

      //setting the initial link as well as values for still and animated urls
      personImage.attr("src", results[j].images.fixed_height_still.url);
      personImage.attr("data-still", results[j].images.fixed_height_still.url);
      personImage.attr("data-animate", results[j].images.fixed_height.url);

      // console.log(results[j].images.fixed_height.url);

      //set initial state to still when generated
      personImage.attr("data-state", "still");

      //appends the rating and the gif to the new div
      gifDiv.append(personImage);
      gifDiv.append(p);

      //prepends the div that contains the image to the div within the HTML
      $("#gifs-appear-here").prepend(gifDiv);
    }
    
    //if an image is clicked, it animates
    //if an image is clicked again, it's still again
    $(".newImage").on("click", function() {
      let state = $(this).attr("data-state");
      console.log(this);

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  });
});


