/**
 * Sagarmatha Bootcamp Project. COVID-19 Statistics
 */
//
// Dropdown trigger
$(".dropdown-trigger").dropdown();
$(document).ready(function () {
    // get and publish world-stats
  renderWorldStats();
  // start interval timer that will change the random images
  randomImages();
  // first thing is to get the COVID 19 stats from COVID193 API for the world
  // and process it
});

/**
 * Displays the WHO images in a random manner
 * and sets up interval timer to display images ad-infinitum
 */
function randomImages() {
  displayRandomImages();
  //set up interval timer to display images
  randomImageIntervalTimer = setInterval(() => {
    displayRandomImages();
  }, RANDOM_IMAGE_INTERVAL_MILLI);

  loadCovid193Statistics();
  loadCovid19CoronavirusStatistics();
  $("#country-dropdown-select").change(function () {
    countrySelectActionListener(event, this.value);
  });
}

/**
 * Calculates which random image to display and changes the image source
 * for the random image IMG element
 */
function displayRandomImages() {
  var imageNumber = Math.floor(Math.random() * RANDOM_IMAGE_COUNT + 1);
  if (logIt) console.log("Random Image Number ==> " + imageNumber);
  var imagePath = `${RANDOM_IMAGE_PARTIAL_PATH}${imageNumber}.PNG`;
  if (logIt) console.log("Random Image Path ==> " + imagePath);
  $imgEl = $("#random-img");
  $imgEl.attr("src", imagePath);
}
/**
 * Uses the coronavirus-monitor-world-stats API to get and render the
 * whole world stats
 */
function renderWorldStats() {
  var settings = {
    async: true,
    crossDomain: true,
    url: "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php",
    method: "GET",
    headers: {
      "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
      "x-rapidapi-key": `${RAPID_API_KEY}`,
    },
  };

  $.ajax(settings).done(function (response) {
    if (logIt) console.log("Response ==> " + response);
    response = JSON.parse(response);
    if (logIt) {
      console.log("Total Cases " + response.total_cases);
      console.log("Total Deaths " + response.total_deaths);
      console.log("Total Recovered " + response.total_recovered);
      console.log("New Cases " + response.new_cases);
      console.log("New Deaths " + response.new_deaths);
    }
    $("#world-stat-total-cases").text(response.total_cases);
    $("#world-stat-total-deaths").text(response.total_deaths);
    $("#world-stat-total-recovered").text(response.total_recovered);
    $("#world-stat-new-cases").text(response.new_cases);
    $("#world-stat-new-deaths").text(response.new_deaths);
  });
}
/**
 *
 */
function loadCovid193Statistics() {
  covid_193_statistics_response = null;
  var settings = {
    async: true,
    crossDomain: true,
    url: "https://covid-193.p.rapidapi.com/statistics",
    method: "GET",
    headers: {
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
      "x-rapidapi-key": `${RAPID_API_KEY}`,
    },
  };

  $.ajax(settings).done(function (response) {
    if (logIt) console.log("Covid-193 Response:");
    if (response != null && response.response != null) {
      covid_193_statistics_response = response.response;
      var resp = {};
      for (let index = 0; index < response.response.length; index++) {
        var value = response.response[index];
        var key = value.country.replace(/\-/g, " ");
        resp[key.trim()] = value;
      }
      covid193CountryData = resp;
      covid193Countries = Object.keys(covid193CountryData);
      if (logIt) console.log("Unsorted Countries ==>" + covid193Countries);
      covid193Countries.sort();
      if (logIt) console.log("\nSorted Countries ==>" + covid193Countries);
      populateRegionTable();
      populateCountryDropDown();
    }
  });
}

/**
 * Removes the State/Province and County dropdowns if they exist. Empties the
 * Country Dropdown and fills it with covid193Countries data
 */
function populateCountryDropDown() {
  // get country dropdown and empty it
  var $countryDropdownSelect = $("#country-dropdown-select");
  if (logIt) console.log($countryDropdownSelect);
  $countryDropdownSelect.empty();
  if (logIt) console.log("Country Dropdown should be empty");
  // get state/province dropdown and delete it
  var $stateDropdownDiv = $("#state-dropdown-div");
  if ($stateDropdownDiv != null) {
    if (logIt) console.log("Found State Dropdown DIV");
    $stateDropdownDiv.remove();
    if (logIt) console.log("State Dropdown should be gone");
  }
  // get county dropdown and delete it
  var $countyDropdownDiv = $("#county-dropdown-div");
  if ($countyDropdownDiv != null) {
    if (logIt) console.log("Found County Dropdown DIV");
    $countyDropdownDiv.remove();
    if (logIt) console.log("County Dropdown should be gone");
  }
  // first add disabled option
  var elementText = '<option value="Choose country" disabled selected>Choose country</option>';
  if (logIt) console.log("Country Option Element ==> " + elementText);
  var $option = $(elementText);
  $countryDropdownSelect.append($option);
  // fill in country dropdown
  // <option value="USA" data-province="true">USA</option>
  var countriesWithProvince = Object.keys(COUNTRIES_WITH_PROVINCE_DATA);

  for (let index = 0; index < covid193Countries.length; index++) {
    var country = covid193Countries[index];
    if (SKIP_REGIONS.indexOf(country) != -1) continue;
    var dataProvince = "false";
    if (countriesWithProvince.indexOf(country) != -1) dataProvince = "true";
    elementText = `<option value="${country}" data-province="${dataProvince}">${country}</option>`;
    if (logIt) console.log("Country Option Element ==> " + elementText);
    $option = $(elementText);
    $countryDropdownSelect.append($option);
  }
}

function populateCountyDropDown(state) {
  // get county dropdown and delete it
  var $countyDropdownDiv = $("#county-dropdown-div");
  if ($countyDropdownDiv != null) {
    if (logIt) console.log("Found County Dropdown DIV");
    $countyDropdownDiv.remove();
    if (logIt) console.log("County Dropdown should be gone");
  }

  if (state == null || state == "" || covid19Stats == null || covid19Stats.length == 0) {
    return;
  }
  var counties = [];
  var stat;
  var county;
  for (let index = 0; index < covid19Stats.length; index++) {
    stat = covid19Stats[index];
    if (stat.country == "US" && stat.province == state) {
      county = stat.city;
      if (counties.indexOf(county) == -1) {
        counties.push(county);
      }
    }
  }
  if (counties.length != 0) {
    // handle condition where state name and county name are the same
    // like District of Columbia.
    //if (counties.length == 1 && counties[index] == state) return;
    counties.sort();
    console.log("Counties in " + state + " are\n" + counties);
    var html = `<div class="col" id="county-dropdown-div">
    <label style="font-weight:bold;">Select County</label>
    <select style="background-color: goldenrod;" class="browser-default" id="county-dropdown-select">
    <option value="" disabled selected>Choose county</option>`;
    var county;
    for (let index = 0; index < counties.length; index++) {
      county = counties[index];
      html += `<option value="${county}">${county}</option>`;
    }
    html += `</select></div>`;
    $countyDropdownDiv = $(html);
    $("#dropdown-row").append($countyDropdownDiv);
    // set action listener on the DIV
    $("#county-dropdown-select").change(function () {
      console.log("County select: " + this.value);
      countySelectActionListener(event, this.value);
    });
  }
}
/**
 * This function is used to get data for a specific country or if the
 * country does not exist, for all countries. This information is primaruly used to
 * collect state/province data and is generally only accessed for countries with
 * state/province COVID-19 data (eg. USA, China, United Kingdom, France, Netherland)
 * @param {*} country
 */
function loadCovid19CoronavirusStatistics(country) {
  covid19Stats = null;

  if (country != null) {
    country = `?country=${country}`;
  } else country = `?country=blah`;
  var settings = {
    async: true,
    crossDomain: true,
    url: `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats${country}`,
    method: "GET",
    headers: {
      "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
      "x-rapidapi-key": `${RAPID_API_KEY}`,
    },
  };

  $.ajax(settings).done(function (response) {
    if (response != null && response.data != null && (covid19Stats = response.data.covid19Stats) != null) {
      covid19Stats = response.data.covid19Stats;
      if (logIt) {
        console.log(response.error);
        console.log(response.statusCode);
        console.log(response.message);
        console.log(covid19Stats);
      }
    }
  });
}

function populateRegionTable() {
  if (logIt) console.log("Populate Region Table #1");
  // find the section
  var $tableBody = $("tbody");
  // empty it
  if (logIt) console.log($tableBody);
  $tableBody.empty();
  var resp = null;
  // ubtil I get comfortable with Promise async/await, I'll just hang out for a while
  // till the API calls return
  if (logIt) console.log("Covid-193-Statistics-Response ==> " + covid_193_statistics_response);
  if (covid_193_statistics_response != null) {
    var resp = covid_193_statistics_response;
    if (logIt) console.log("Populate Region Table #2 ");
    // find regions. This is an array
    var continentRegionsKeys = Object.keys(CONTINENT_REGIONS);
    var countries = [];
    for (let index = 0; index < resp.length; index++) {
      var data = resp[index];
      var country = resp[index].country;
      if (continentRegionsKeys.indexOf(country) != -1) {
        if (logIt) console.log("Found " + country + "!!");
        CONTINENT_REGIONS[country] = data;
        // get rid of "-" in country name. "North-America" befomes "North America"
        var country = data.country.replace(/\-/g, " ");
        var cases = data.cases;
        // get rid of "+"
        var newCases = cases.new;
        if (newCases != null) newCases = newCases.replace(/\+/g, "");
        else newCases = "0";
        var activeCases = cases.active;
        var criticalCases = cases.critical;
        var recoveredCases = cases.recovered;
        var totalCases = cases.total;
        var deaths = data.deaths;
        var newDeaths = deaths.new;
        if (newDeaths != null) newDeaths = newDeaths.replace(/\+/g, "");
        else newDeaths = "0";
        var totalDeaths = deaths.total;
        if (logIt) {
          console.log("\n\nCountry: " + country);
          console.log("\tNew Cases:       " + newCases);
          console.log("\tActive Cases:    " + activeCases);
          console.log("\tCritical Cases:  " + criticalCases);
          console.log("\tRecovered Cases: " + recoveredCases);
          console.log("\tTotal Cases:     " + totalCases);
          console.log("\tNew Deaths:      " + newDeaths);
          console.log("\tTotal Deaths:    " + totalDeaths);
        }
        newCases = formatNumber(newCases);
        activeCases= formatNumber(activeCases);
        criticalCases= formatNumber(criticalCases);
        recoveredCases= formatNumber(recoveredCases);
        totalCases= formatNumber(totalCases);
        newDeaths= formatNumber(newDeaths);
        totalDeaths= formatNumber(totalDeaths);
        $tableRow = $(`<tr>
        <th>${country}</th>
        <!--new cases-->
        <td  style="text-align: right;">${newCases}</td>
        <!--active cases-->
        <td  style="text-align: right;">${activeCases}</td>
        <!--critical cases-->
        <td  style="text-align: right;">${criticalCases}</td>
        <!--recovered cases-->
        <td  style="text-align: right;">${recoveredCases}</td>
        <!--total cases-->
        <td  style="text-align: right;">${totalCases}</td>
        <!--new deaths-->
        <td  style="text-align: right;">${newDeaths}</td>
        <!--total deaths-->
        <td  style="text-align: right;">${totalDeaths}</td>
      </tr>`);
        $tableBody.append($tableRow);
      }
    }
  }
}

/**
 * Searches the covid19-coronavirus data for province information
 * regaring country
 * @param {*} country The country for which provincial data is sought
 */
function populateProvinceDropdown(country) {
  // check if there is a county dropdown. If so, remove it
  // get county dropdown and delete it
  var $countyDropdownDiv = $("#county-dropdown-div");
  if ($countyDropdownDiv != null) {
    if (logIt) console.log("Found County Dropdown DIV");
    $countyDropdownDiv.remove();
    if (logIt) console.log("County Dropdown should be gone");
  }
  // go through covid19Stats and get province names
  var provinces = [];
  var province;
  if (country == "USA") country = "US";
  if (country == "UK") country = "United Kingdom";
  for (let index = 0; index < covid19Stats.length; index++) {
    var data = covid19Stats[index];
    if (data.country == country && (province = data.province) != "") {
      // don't know what this "province" is??!!??
      if (province == "Recovered") continue;
      if (provinces.indexOf(province) == -1) {
        provinces.push(province);
      }
    }
  }
  if (provinces.length != 0) {
    provinces.sort();
    console.log("Provinces for " + country + " are " + provinces);
    // now populate dropdown
    var html = '<div class="col" id="state-dropdown-div">';
    html += '<label style="font-weight: bold;">Province/State Select</label>';
    html += `<select style="background-color: goldenrod;" class="browser-default" id="state-dropdown-select">`;
    html += '<option value="" disabled selected>Choose Prov./State</option>';
    for (let index = 0; index < provinces.length; index++) {
      province = provinces[index];
      html += `<option value="${province}" data-province="true">${province}</option>`;
    }
    html += `</select></div>`;
    $provinceDropdown = $(html);
    $("#dropdown-row").append($provinceDropdown);
    // add event listener to the province dropdown
    $("#state-dropdown-select").change(function () {
      console.log("State/Province select: " + this.value);
      provinceSelectActionListener(event, this.value);
    });
  }
}

/**
 * Using the data in covid-19-coronavirus-statistics.
 * it will return data in the follwoing format:
 * { confirmed:"0",
 *   deaths:"0",
 *   recovered:"0",
 * }
 * @param {*} country
 * @param {*} province
 */
function getProvinceStat(country, province) {
  var retval = { confirmed: 0, deaths: 0, recovered: 0 };
  var statCountry, statProvince, resp;
  var response = covid19Stats;
  var confirmed = 0;
  var deaths = 0;
  var recovered = 0;
  if (country == "UK") country = "United Kingdom";
  if (country == "USA") country = "US";
  if (country != null && province != null && response != null) {
    for (let index = 0; index < response.length; index++) {
      resp = response[index];
      statCountry = resp.country.replace(/\-/g, " ").trim();
      statProvince = resp.province.replace(/\-/g, " ").trim();
      // if (statCountry == country)console.log(`${country}/${province} ==> ${statCountry}/${statProvince}`);
      if (statCountry == country && statProvince == province) {
        console.log(`Found data for Country/Province ==> ${country}/${province}`);
        if (Number.isInteger(resp.confirmed)) confirmed += resp.confirmed;
        if (Number.isInteger(resp.deaths)) deaths += resp.deaths;
        if (Number.isInteger(resp.recovered)) recovered += resp.recovered;
      }
    }
    retval["confirmed"] = confirmed;
    retval["deaths"] = deaths;
    retval["recovered"] = recovered;
  }
  return retval;
}

function getCountyStat(country, province, county) {
  var retval = { confirmed: 0, deaths: 0, recovered: 0 };
  var statCountry, statProvince, statCounty, resp;
  var response = covid19Stats;
  var confirmed = 0;
  var deaths = 0;
  var recovered = 0;
  if (country == "USA") country = "US";
  if (country != null && province != null && response != null) {
    for (let index = 0; index < response.length; index++) {
      resp = response[index];
      statCountry = resp.country.replace(/\-/g, " ").trim();
      statProvince = resp.province.replace(/\-/g, " ").trim();
      statCounty = resp.city.replace(/\-/g, " ").trim();
      // if (statCountry == country)console.log(`${country}/${province} ==> ${statCountry}/${statProvince}`);
      if (statCounty == county && statCountry == country && statProvince == province) {
        console.log(`Found data for Country/Province/County ==> ${country}/${province}/${county}`);
        if (Number.isInteger(resp.confirmed)) confirmed += resp.confirmed;
        if (Number.isInteger(resp.deaths)) deaths += resp.deaths;
        if (Number.isInteger(resp.recovered)) recovered += resp.recovered;
        break;
      }
    }
    retval["confirmed"] = confirmed;
    retval["deaths"] = deaths;
    retval["recovered"] = recovered;
  }
  return retval;
}
