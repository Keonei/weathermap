console.log("Lets Weather!")

const londonUrl = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=51.5074&lon=0.1278&APPID=d5b26f410d1b0a1c12c2685df46b4327&units=imperial"
const seattleUrl = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=47.6762&lon=-122.3182&APPID=d5b26f410d1b0a1c12c2685df46b4327&units=imperial"

function seattleWeather() {
  document.getElementById("content").innerHTML = ""
  	console.log("Seattle!")
  // append output to html
  let h2 = document.createElement("h2")
  h2.innerHTML = "Seattle:"
  document.getElementById("content").appendChild(h2)

  let request = new XMLHttpRequest();
  request.open("GET", seattleUrl, true)
	request.onload = onLoadFunc
	request.onerror = onerrorFunc
	request.send()
}

function londonWeather() {
  document.getElementById("content").innerHTML = ""
  	console.log("London!")
  // append output to html
  let h2 = document.createElement("h2")
  h2.innerHTML = "London:"
  document.getElementById("content").appendChild(h2)

  let request = new XMLHttpRequest();
  request.open("GET", londonUrl, true)
	request.onload = onLoadFunc
	request.onerror = onerrorFunc
	request.send()
}

function onLoadFunc(){
  const resp = JSON.parse(this.response);
  console.log(resp);

  printListItem("Conditions: " + resp.weather[0].main);
  printListItem("Current: " + resp.main.temp + "&#8457;");
  printListItem("Highs: " + resp.main.temp_max + "&#8457;");
  printListItem("Lows: " + resp.main.temp_min + "&#8457;");
}

function onerrorFunc(){
   printListItem("Oh No! Something went wrong.");
}

function printListItem(text) {
  let p = document.createElement("p")
  p.innerHTML = text
  document.getElementById("content").appendChild(p)
}

function myWeather() {
  document.getElementById("content").innerHTML = ""
    console.log("Where am I?")
  let h2 = document.createElement("h2")
  h2.innerHTML = "Your location:"
  document.getElementById("content").appendChild(h2)

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
  let weatherUri = `https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=${locObj.lat}&lon={locObj.lon}&APPID=d5b26f410d1b0a1c12c2685df46b4327&units=imperial`
    console.log(weatherUri)

  let request = new XMLHttpRequest()
  request.open("GET", weatherUri, true)
	request.onload = onLoadFunc
	request.onerror = onerrorFunc
	request.send()
}
