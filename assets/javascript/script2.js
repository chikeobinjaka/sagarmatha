// $(document).ready(function () {
  function marqueeHandler() {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    var newDate = new Date();
    newDate.setDate(newDate.getDate());
    $("#displayDate").html(
      dayNames[newDate.getDay()] +
        "," +
        " " +
        monthNames[newDate.getMonth()] +
        " " +
        newDate.getDate() +
        "," +
        " " +
        newDate.getFullYear()
    );

    var artDisplay = (article) => {
      var headline = "";
      if (article.item_type === "Article") {
        if (article.title !== "") {
          headline = article.title + " ~ ~ ~ ";
        } else {
          headline = "";
        }
      } else {
        headline = "";
      }
      $(".art-display").append(headline);
    };

    var queryURL = "https://api.nytimes.com/svc/topstories/v2/world.json?api-key=i4NofGAnSCvvDI1Thfl2GMGNhh5A22Dj";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      var docs = response.results;
      for (var i = 0; i < docs.length; i++) {
        artDisplay(docs[i]);
      }
    });
  }
// });
