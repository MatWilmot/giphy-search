$(document).ready(function () {
  var userInput = "";
  var api_key = "TlFtQ2mCgI8j2t0CDCLfMSm2JeGNxgdA";
  var limit = 0;
  $(document).on("click", ".btnSubmit", function (e) {
    e.preventDefault();
    userInput = $("#searchBar").val();
    $("#searchBar").val("");
    $("#gifArea").html("");
    limit = $(this).attr("data-id");
    console.log(limit);

    // sets up ajax get request
    $.ajax({
      type: "GET",
      url: `https://api.giphy.com/v1/gifs/search?q=${userInput}&api_key=${api_key}&limit=${limit}`,
      dataType: "json",
    }).then(function (response) {
      // console.log(response.data);

      for (var i = 0; i < response.data.length; i++) {
        var gif = response.data[i].images.original.url;
        var still = response.data[i].images.original_still.url;
        $("#gifArea").append(
          `<img class="gif" data-still="${still}" data-gif="${gif}" src="${still}"> </img>`
        );
      }
    });

    $(document).on("click", ".gif", function () {
      if ($(this).attr("src") === $(this).attr("data-still")) {
        $(this).attr("src", $(this).attr("data-gif"));
      } else {
        $(this).attr("src", $(this).attr("data-still"));
      }
    });
  });
});

// when I click the box, make a ajax request to giphy api
