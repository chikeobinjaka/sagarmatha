/**
 *  Called from the CountrySelect Action Event Listener
 * @param {*} event
 * @param {*} country
 */
function countrySelectActionListener(event, country) {
  // clear stats sidebar
  $("#country-stats").empty();
  $("#province-stats").empty();
  $("#county-stats").empty();
  console.log("Country Select changed. New value is " + country);
  // check if the value is one of the countries with provinces. If so,
  // create and populate the province dropdown
  selectedCountry = country;
  selectedProvince = "";
  selectedCounty = "";
  var $stateDropdownDiv = $("#state-dropdown-div");
  if ($stateDropdownDiv != null) $stateDropdownDiv.remove();
  var $countyDropdownDiv = $("#county-dropdown-div");
  if ($countyDropdownDiv != null) $countyDropdownDiv.remove();
  if (Object.keys(COUNTRIES_WITH_PROVINCE_DATA).indexOf(country) != -1) {
    console.log(country + " is a country with province data");
    populateProvinceDropdown(country);
  } else {
    console.log(country + " does not have province data");
    // make sure province and country dropdowns are not visible
  }
  // show map of the country
  var imgSrc = `./assets/images/maps/countries/${country}/${country}.jpg`.replace(/ /g, "-").toLowerCase();
  var altSrc = "./assets/images/maps/countries/world/world.gif";
  console.log("Map source ==> " + imgSrc);
  $("#img-map").attr("src", imgSrc);
  $("#img-map").attr("alt", altSrc);
  // get country stats
  var countryStats = covid193CountryData[country];
  if (countryStats == null) return;
  var newCases = countryStats.cases.new;
  if (newCases != null) newCases = newCases.replace(/\+/, "");
  else newCases = "0";
  var newDeaths = countryStats.deaths.new;
  if (newDeaths != null) newDeaths = newDeaths.replace(/\+/, "");
  else newDeaths = "0";
  newCases = formatNumber(newCases);
  newDeaths == formatNumber(newDeaths);
  var activeCases = formatNumber(countryStats.cases.active);
  var criticalCases = formatNumber(countryStats.cases.critical);
  var recoveredCases = formatNumber(countryStats.cases.recovered);
  var totalCases = formatNumber(countryStats.cases.total);
  var totalDeaths = formatNumber(countryStats.deaths.total);

  var html = `<h6 id="country-name" style="color: brown; font-weight: bold;background-color: aquamarine;">${country} Stats:</h6>
  <p class="side-nav-p">New Cases:&nbsp;<span id="country-stat-new-cases" style="font-weight: bold;">${newCases}</span></p>
  <p class="side-nav-p">Active Cases:&nbsp;<span id="country-stat-active-cases" style="font-weight: bold;">${activeCases}</span></p>
  <p class="side-nav-p">Critical Cases:&nbsp;<span id="country-stat-critical-cases" style="font-weight: bold;">${criticalCases}</span></p>
  <p class="side-nav-p">Recovered Cases:&nbsp;<span id="country-stat-recovered-cases" style="font-weight: bold;">${recoveredCases}</span></p>
  <p class="side-nav-p">Total Cases:&nbsp;<span id="country-stat-total-cases" style="font-weight: bold;">${totalCases}</span></p>
  <p class="side-nav-p">New Deaths:&nbsp;<span id="country-stat-new-deaths" style="font-weight: bold;">${newDeaths}</span></p>
  <p class="side-nav-p">Total Deaths:&nbsp;<span id="country-stat-total-deaths" style="font-weight: bold;">${totalDeaths}</span></p>`;
  var $element = $(html);
  $("#country-stats").append($element);
}

/**
 *
 * @param {*} event
 * @param {*} province
 */
function provinceSelectActionListener(event, province) {
  // clear stats sidebar
  $("#province-stats").empty();
  $("#county-stats").empty();

  // if the county dropdown exists, remove it
  var $countyDropdownDiv = $("#county-dropdown-div");
  if ($countyDropdownDiv != null) $countyDropdownDiv.remove();
  selectedProvince = province;
  selectedCounty = "";
  // if the selected country is the US, then find the counties for this
  // state

  if (selectedCountry == "USA") {
    populateCountyDropDown(province);
    // get map of the state. US map is default
    var fileName = `${province}-county-map.gif`;
    var imgSrc = `./assets/images/maps/countries/usa/${fileName}`.replace(/ /g, "-").toLowerCase();
    var altSrc = "./assets/images/maps/countries/usa/usa.jpg";
    console.log("Map source ==> " + imgSrc);
    $("#img-map").attr("src", imgSrc);
    $("#img-map").attr("alt", altSrc);
  }
  if (logIt) console.log(`Selected ${selectedCountry}/${selectedProvince}`);
  var provinceStats = getProvinceStat(selectedCountry, selectedProvince);
  if (logIt) console.log(provinceStats);
  var confirmedStat = formatNumber(provinceStats.confirmed);
  var deathsStat = formatNumber(provinceStats.deaths);
  var recoveredStat = formatNumber(provinceStats.recovered);
  var html = `
  <h6 id="province-name" style="color: brown; font-weight: bold;background-color: aquamarine;">${selectedProvince} Stats:</h6>
  <p class="side-nav-p">Total Cases:&nbsp;<span id="province-stat-confirmed" style="font-weight: bold;">${confirmedStat}</span></p>
  <p class="side-nav-p">Total Deaths:&nbsp;<span id="province-stat-deaths" style="font-weight: bold;">${deathsStat}</span></p>
  <p class="side-nav-p">Recovered:&nbsp;<span id="province-stat-recovered" style="font-weight: bold;">${recoveredStat}</span></p>`;
  var $element = $(html);
  $("#province-stats").append($element);
}

/**
 *
 * @param {*} event
 * @param {*} county
 */
function countySelectActionListener(event, county) {
  selectedCounty = county;
  // clear stats sidebar
  $("#county-stats").empty();
  var countyStats = getCountyStat(selectedCountry, selectedProvince, selectedCounty);
  if (logIt) console.log(countyStats);
  var confirmedStat = formatNumber(countyStats.confirmed);
  var deathsStat = formatNumber(countyStats.deaths);
  var recoveredStat = formatNumber(countyStats.recovered);

  var html = `<h6 id="county-name" style="color: brown; font-weight: bold;">${selectedCounty} County Stats:</h6>
  <p class="side-nav-p">Total Cases:&nbsp;<span id="county-stat-confirmed" style="font-weight: bold;">${confirmedStat}</span></p>
  <p class="side-nav-p">Total Deaths:&nbsp;<span id="county-stat-deaths" style="font-weight: bold;">${deathsStat}</span></p>
  <p class="side-nav-p">Recovered:&nbsp;<span id="county-stat-recovered" style="font-weight: bold;">${recoveredStat}</span></p>`;
  var $element = $(html);
  $("#county-stats").append($element);
}

function aboutUsButtonActionListener(event, target) {
  if (logIt) {
    console.log("About button clicked");
    console.log(target);
  }
  // disable button and enable the others
  $(".about-us-btn").prop("disabled", true);
  $(".home-btn").prop("disabled", false);
  $(".contact-btn").prop("disabled", false);
  $contactSection.hide();
  $mainSection.hide();
  $aboutUsSection.show();
  // hide the relevant sections and show only the one AboutUs section
}

function homeButtonActionListener(event, target) {
  if (logIt) {
    console.log("Home button clicked");
    console.log(target);
  }
  $(".home-btn").prop("disabled", true);
  $(".contact-btn").prop("disabled", false);
  $(".about-us-btn").prop("disabled", false);
  $contactSection.hide();
  $aboutUsSection.hide();
  $mainSection.show();
}

function contactButtonActionListener(event, target) {
  if (logIt) {
    console.log("Contact button clicked");
    console.log(target);
  }
  $(".contact-btn").prop("disabled", true);
  $(".home-btn").prop("disabled", false);
  $(".about-us-btn").prop("disabled", false);
  $aboutUsSection.hide();
  $mainSection.hide();
  $contactSection.show();
}
