const RAPID_API_KEY = "5112b8642cmsh66adc618f8726e4p1f8a51jsn8c2a905c7d57";
// maps covid-193_country:covid-19-coronavirus_country
const COUNTRIES_WITH_PROVINCE_DATA = {
  China: "China",
  USA: "US",
  Netherlands: "Netherlands",
  Canada: "Canada",
  UK: "United Kingdom",
  France: "France",
  Australia: "Australia",
};
const COUNTRIES_WITH_COUNTY_DATA = { USA: "US" };
// Regions that will not be in the country dropdown. These areas are in the COVID-193 data
const SKIP_REGIONS = ["All", "Africa", "Europe", "Asia", "Oceania", "North America", "South America"];
const RANDOM_IMAGE_PARTIAL_PATH = "./assets/images/random/random-";
const RANDOM_IMAGE_COUNT = 8;
const RANDOM_IMAGE_INTERVAL_MILLI = 5000;
const logIt = false;
var CONTINENT_REGIONS = { Africa: {}, "North-America": {}, "South-America": {}, Europe: {}, Asia: {}, Oceania: {} };
var randomImageIntervalTimer;
// Array of country case data
// Contains response from Covid-193 API. Almost same as covid193CountryData
var covid_193_statistics_response;
//
// contains covid19-statistics information like this:
//
// {
//   "city": "Abbeville",
//   "province": "South Carolina",
//   "country": "US",
//   "lastUpdate": "2020-04-12 23:18:00",
//   "keyId": "Abbeville, South Carolina, US",
//   "confirmed": 9,
//   "deaths": 0,
//   "recovered": 0
// },
// {
//   "city": "Acadia",
//   "province": "Louisiana",
//   "country": "US",
//   "lastUpdate": "2020-04-12 23:18:00",
//   "keyId": "Acadia, Louisiana, US",
//   "confirmed": 99,
//   "deaths": 5,
//   "recovered": 0
// }
var covid19Stats;
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

var selectedCountry = null;
var selectedProvince = null;
var selectedCounty = null;
// Format of this object is as follows
// {"USA":{ "Alabama":{confirmed:0,
//                  deaths:0,
//                  recovered:0},
//        "Alaska":{confirmed:0,
//                  deaths:0,
//                  recovered:0}
//        },
// "Canada":{"British Columbia":{confirmed:0,
//                  deaths:0,
//                  recovered:0},
//           },
// }
var provinceStats = {};
var $aboutUsSection;
var $mainSection;
var $contactSection;
/**
 * Formats numbers by adding commas where needed
 * @param {*} num
 */
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
