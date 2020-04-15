const RAPID_API_KEY = "5112b8642cmsh66adc618f8726e4p1f8a51jsn8c2a905c7d57";
// maps covid-193_country:covid-19-coronavirus_country
const COUNTRIES_WITH_PROVINCE_DATA = {
  China: "China",
  USA: "US",
  Netherlands: "Netherlands",
  Canada: "Canada",
  UK: "United Kingdom",
  France: "France",
};
const COUNTRIES_WITH_COUNTY_DATA = { USA: "US" };

const RANDOM_IMAGE_PARTIAL_PATH = "./assets/images/random/random-";
const RANDOM_IMAGE_COUNT = 7;
const RANDOM_IMAGE_INTERVAL_MILLI = 5000;
const logIt = false;
var CONTINENT_REGIONS = { Africa: {}, "North-America": {}, "South-America": {}, Europe: {}, Asia: {}, Oceania: {} };
var randomImageIntervalTimer;
// Array of country case data
// Contains response from Covid-193 API. Almost same as covid193CountryData
var covid_193_statistics_response;
//
var covid_19_coronovirus_statistics_response;
//
// contains map of country name vs covid-19 data. Example:
// "China:{
//     "country": "China",
//     "cases": { "new": "+108", "active": 1156, "critical": 121, "recovered": 77663, "total": 82160 },
//     "deaths": { "new": "+2", "total": 3341 },
//     "tests": { "total": null },
//     "day": "2020-04-13",
//     "time": "2020-04-13T17:45:06+00:00"
//   },
// "Italy":{
//     "country": "Italy",
//     "cases": { "new": "+3153", "active": 103616, "critical": 3260, "recovered": 35435, "total": 159516 },
//     "deaths": { "new": "+566", "total": 20465 },
//     "tests": { "total": 1046910 },
//     "day": "2020-04-13",
//     "time": "2020-04-13T17:45:05+00:00"
//   }
var covid193CountryData;
// Array of Covid-193 countries 
var covid193Countries;


