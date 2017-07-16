console.log("Lets Weather!")

window.onload = function() {
  var currentTime = new Date().getHours();
    if (7 <= currentTime && currentTime < 20) {
      if (document.getElementById("content")) {
          document.getElementById("content").className = "day";
        }
      }
      else {
        if (document.getElementById("content")) {
          document.getElementById("content").className = "night";
        }
      }
}

const londonUrl = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=51.5074&lon=0.1278&APPID=d5b26f410d1b0a1c12c2685df46b4327&units=imperial"
const seattleUrl = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=47.6762&lon=-122.3182&APPID=d5b26f410d1b0a1c12c2685df46b4327&units=imperial"
const imgUrl = "http://openweathermap.org/img/w/"

function seattleWeather() {
  document.getElementById("city").innerHTML = ""
  	console.log("Seattle!")
  document.body.style.backgroundImage = "url('images/night-skyline-seattle.jpg')";
  // append output to html
  let h2 = document.createElement("h2")
  h2.innerHTML = "Seattle"
  document.getElementById("city").appendChild(h2)

  let request = new XMLHttpRequest();
  request.open("GET", seattleUrl, true)
	request.onload = onLoadFunc
	request.onerror = onerrorFunc
	request.send()
}

function londonWeather() {
  document.getElementById("city").innerHTML = ""
  	console.log("London!")
    document.body.style.backgroundImage = "url('images/streets-of-london-at-night.jpg')";
  // append output to html
  let h2 = document.createElement("h2")
  h2.innerHTML = "London"
  document.getElementById("city").appendChild(h2)

  let request = new XMLHttpRequest();
  request.open("GET", londonUrl, true)
	request.onload = onLoadFunc
	request.onerror = onerrorFunc
	request.send()
}

function onLoadFunc(){
  const resp = JSON.parse(this.response);
  console.log(resp);

  listCity(resp.weather[0].main);

  listCurrent("Currently " + resp.weather[0].description + "\xa0and\xa0" + resp.main.temp + "&#8457;");
  listHigh("Highs: " + resp.main.temp_max + "&#8457;");
  listLow("Lows: " + resp.main.temp_min + "&#8457;" + "<br/>" + "<br/>");
  listWinds("Winds: " + resp.wind.speed + "<br/>" + "<br/>");
  listSunrise("Sunrise: " + resp.sys.sunrise);
  listSunset("Sunset: " + resp.sys.sunset);

  if (resp.weather) {
    var imgURL = "http://openweathermap.org/img/w/" + resp.weather[0].icon + ".png";
    $("#weatherImg").attr("src", imgURL);
  }
}

function onerrorFunc(){
   console.log("Oh No! Something went wrong.");
}

function listCity(text) {
  let p = document.createElement("p")
  p.innerHTML = text
  document.getElementById("city").appendChild(p)
}

function listCurrent(text) {
  document.getElementById("current-conditions").innerHTML = ""
  let p = document.createElement("p")
  p.innerHTML = text
  document.getElementById("current-conditions").appendChild(p)
}

function listHigh(text) {
  document.getElementById("high").innerHTML = ""
  let p = document.createElement("p")
  p.innerHTML = text
  document.getElementById("high").appendChild(p)
}

function listLow(text) {
  document.getElementById("low").innerHTML = ""
  let p = document.createElement("p")
  p.innerHTML = text
  document.getElementById("low").appendChild(p)
}

function listWinds(text) {
  document.getElementById("winds").innerHTML = ""
  let p = document.createElement("p")
  p.innerHTML = text
  document.getElementById("winds").appendChild(p)
}

function listSunrise(text) {
  document.getElementById("sunrise").innerHTML = ""
  let p = document.createElement("p")
  p.innerHTML = text
  document.getElementById("sunrise").appendChild(p)
}

function listSunset(text) {
  document.getElementById("sunset").innerHTML = ""
  let p = document.createElement("p")
  p.innerHTML = text
  document.getElementById("sunset").appendChild(p)
}


function listForcast(text) {
  let ul = document.createElement("ul");
    let li = document.createElement("li");
      li.innerHTML = text

      ul.appendChild(li)
      document.getElementById("week").appendChild(ul)
}


function myWeather() {
  document.getElementById("city").innerHTML = ""
    console.log("Where am I?")
  document.body.style.backgroundImage = "url('images/white-river-falls.JPG')";

  let h2 = document.createElement("h2")
  h2.innerHTML = "Your location"
  document.getElementById("city").appendChild(h2)

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}

function geoSuccess(position){
  const newPos = {lat: position.coords.latitude, lon: position.coords.longitude};
  getLocation(newPos);
}

function geoError(){
  console.log("Oh No! Something went wrong.");
}

function getLocation(locObj) {
  let weatherUri = `https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=${locObj.lat}&lon=${locObj.lon}&APPID=d5b26f410d1b0a1c12c2685df46b4327&units=imperial`
    console.log(weatherUri)

  let request = new XMLHttpRequest()
  request.open("GET", weatherUri, true)
	request.onload = onLoadFunc
	request.onerror = onerrorFunc
	request.send()
}

function clearThis(target){
        target.value= "";
    }
