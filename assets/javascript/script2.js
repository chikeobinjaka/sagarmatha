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
    if (logIt) console.log(response);
    var docs = response.results;
    for (var i = 0; i < docs.length; i++) {
      artDisplay(docs[i]);
    }
  });
}
// });
function getAboutUsDiv() {
  var $retval = $(`<div id="about-us-div">
  <div id="index-banner" class="parallax-container">
    <div class="section no-pad-bot">
      <div class="container">
        <br /><br />
        <h1 class="header center blue-text text-lighten-2">About Us</h1>
        <div class="row center">
          <h5 class="header col s12 light">Welcome to Team Sagarmatha.</h5>
        </div>
        <div class="row center">
          <img src="./assets/images/sagarmatha.jpg" href="index.html" id="download-button" />
        </div>
        <br /><br />
      </div>
    </div>
    <div class="parallax"><img src="./assets/images/sagarmatha.jpg" alt="Mountain Sagarmatha" /></div>
  </div>
  <div class="container">
    <div class="section">
      <!--   Icon Section   -->
      <div class="row">
        <div class="col s12 m4">
          <div class="icon-block">
            <h2 class="center brown-text"><i class="material-icons">flash_on</i></h2>
            <h5 class="center">Web Development Team</h5>
            <p class="light">Eager to learn and excel in an ever changing industry.</p>
          </div>
        </div>
        <div class="col s12 m4">
          <div class="icon-block">
            <h2 class="center brown-text"><i class="material-icons">group</i></h2>
            <h5 class="center">Focus</h5>
            <p class="light">On understanding all aspects of Full-Stack Web Development.</p>
          </div>
        </div>
        <div class="col s12 m4">
          <div class="icon-block">
            <h2 class="center brown-text"><i class="material-icons">settings</i></h2>
            <h5 class="center">Our first Project</h5>
            <p class="light">
              Sagarmatha Covid-19, a web development app with a user focus on providing worldwide COVID-19
              information from freely available data sources and render the data in a clear and concise manner
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="contactInfo">
    <h1>Sapana Chaudhary</h1>
    <p>
      As I have a goal to establish my career as a web developer in future so rather than telling prospective
      employers about my skills, it is effective to create a professional portfolio to show them. Professional
      portfolio is more than a simple resume. It is a showcase that proves that you can do what you talk about in
      your resume. A well-rounded portfolio is a vital asset that can make all the difference when you’re
      competing with other hopefuls for a coveted role. Furthermore, you can use a tech portfolio website to craft
      your personal brand. You can go beyond the work samples to express your personality and highlight critical
      soft skills too. This gives potential employers a better understanding of how you may fit in with their
      existing company culture or whether you’d succeed in the role they’re looking to fill.
    </p>
    <img src="./assets/images/Sapana.jpg" width="300" height="300" />
  </div>
  <div class="contactInfo">
    <h1>Chikeobi Njaka</h1>
    <p>
    "Application Developer, Database Administrator, and Project Manager. Data Center Management in the US and
    overseas. Technical management in semiconductor manufacturing and broadcast technologies. Particularly
    interested in client/server and relational database design using Informix/Oracle, Sybase, and MS-SQL Server.
    Specialties: System Integration, Software Development, Database design, Technical Management, Data center
    operations and management"
    </p>
    <img src="./assets/images/chikeobi.jpg" width="300" height="300" />
  </div>
  <div class="contactInfo">
    <h1>Sederick Cowart</h1>
    <p>
      I began my softeware development journey in 2020. Working with technology has always been a passion of mine,
      I first started as a computer technican in 2000 that wanted to always learn more. With the help of UCI, I
      hope to become an expert one day in software development.
    </p>
    <img src="./assets/images/90s.jpg" width="300" height="300" />
  </div>
</div>
`);
  return $retval;
}

function getMainDiv(){
  var $retval = $('#main-div');
  return retval;
}
