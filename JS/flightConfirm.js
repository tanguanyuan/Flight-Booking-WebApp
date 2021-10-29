let airportCodeDRef=document.getElementById("airportCodeD");
let countryNameDRef=document.getElementById("countryNameD");
let temperatureDRef=document.getElementById("temperatureD");
let weatherDRef=document.getElementById("weatherD");

let airportCodeARef=document.getElementById("airportCodeA");
let countryNameARef=document.getElementById("countryNameA");
let temperatureARef=document.getElementById("temperatureA");
let weatherARef=document.getElementById("weatherA");

let dateDRef=document.getElementById("dateD");
let timeDRef=document.getElementById("timeD");
let cityNameDRef=document.getElementById("cityNameD");
let airportNameDRef=document.getElementById("airportNameD");
let airportDlocationRef=document.getElementById("airportDlocation");

let dateARef=document.getElementById("dateA");
let timeARef=document.getElementById("timeA");
let cityNameARef=document.getElementById("cityNameA");
let airportNameARef=document.getElementById("airportNameA");
let airportAlocationRef=document.getElementById("airportAlocation");

let planeNameRef=document.getElementById("planeName");
let planeCodeRef=document.getElementById("planeCode");
let planeCNameRef=document.getElementById("Airline");
let distanceRef=document.getElementById("distance");
let stopoverRef=document.getElementById("stopover");

const FLIGHT_DATA_KEY="flight666";

let confirmData=JSON.parse(localStorage.getItem("flightinfo"));

class Origin{
  constructor(){
    this._airportCode="";
    this._name="";
    this._city="";
    this._country="";
    this._latitude=0;
    this._longitude=0;
    this._altitude=0;
  }
	get airportCode(){return this._airportCode;}
	get name(){return this._name;}
	get city(){return this._city;}
	get country(){return this._country;}
	get latitude(){return this._latitude;}
	get longitude(){return this._longitude;}
	get altitude(){return this._altitude;}

  set airportCode(newCode){this._airportCode=newCode;}
  set city(newCity){this._city=newCity;}
  set latitude(newLatitude){this._latitude=newLatitude;}
  set longitude(newLongitude){this._longitude=newLongitude;}
  set altitude(newAltitude){this._altitude=newAltitude;}
  set name(newName){this._name=newName;}

  fromData(data1){
    this._airportCode=data1.dAirport;
    this._name=data1.dAirportCode;
    this._city=data1.dCity;
    this._country=data1.dCountry;
    this._latitude=data1.dCoordinate[1];
    this._longitude=data1.dCoordinate[0];
    this._altitude=data1.altitude;
  }
}

let origin=new Origin();
origin.fromData(confirmData);
let urlAirport= "https://eng1003.monash/api/v1/airports/";
function countryDData(){
let dataAirportD={
  country:confirmData.dCountry,
  callback:"countryDCallback"
};
webServiceRequest(urlAirport,dataAirportD);}
function countryDCallback(dataAirportD){
  for(let i=0;i<dataAirportD.length;i++){
    if(dataAirportD[i].airportCode==confirmData.dAirport){
      //cityNameDRef.innerHTML=dataAirportD[i].city;
      origin.city=dataAirportD[i].city;
  }
}

}
class Destination{
  constructor(){
    this._airportCode="";
    this._name="";
    this._city="";
    this._country="";
    this._latitude=0;
    this._longitude=0;
    this._altitude=0;
  }

	get airportCode(){return this._airportCode;}
	get name(){return this._name;}
	get city(){return this._city;}
	get country(){return this._country;}
	get latitude(){return this._latitude;}
	get longitude(){return this._longitude;}
	get altitude(){return this._altitude;}

  set airportCode(newCode){this._airportCode=newCode;}
  set city(newCity){this._city=newCity;}
  set latitude(newLatitude){this._latitude=newLatitude;}
  set longitude(newLongitude){this._longitude=newLongitude;}
  set altitude(newAltitude){this._altitude=newAltitude;}
  set name(newName){this._name=newName;}

  fromData(data2){
    this._airportCode=data2.aAirport;
    this._name=data2.name;
    this._city=data2.city;
    this._country=data2.arrival;
    this._latitude=data2.aLat;
    this._longitude=data2.aLong;
    this._altitude=data2.altitude;
  }
}

let destination1 = new Destination();
destination1.fromData(confirmData);
function countryAData(){
let dataAirportA={
  lat: confirmData.aCoordinate[1],
  lon:confirmData.aCoordinate[0],
    callback:"countryACallback"
};
webServiceRequest(urlAirport,dataAirportA);
}
function countryACallback(dataAirportA){
  for(let i=0;i<dataAirportA.length;i++){
    if(dataAirportA[i].airportCode==aAirport){
      cityNameARef.innerHTML=dataAirportA[i].city;
      destination1.city=dataAirportA[i].city;

    }
  }
}


class PlaneInfo{
  constructor(){
    this._registration="";
    this._location="";
    this._range=0;
    this._avgSpeed=0;
    this._type="";
    this._status="available";
    this._airline="";
  }

  get type(){return this._type;}
	get registration(){return this._registration;}
	get range(){return this._range;}
	get avgSpeed(){return this._avgSpeed;}
	get airline(){return this._airline;}

  set registration(newRegistration){ this._registration=newRegistration;}
  set range(newRange){this._range=newRange;}
  set avgSpeed(newSpeed){this._avgSpeed=newSpeed;}
  set airline(newAirline){this._airline=newAirline;}

  fromData(data3){
    this._registration=data3.registration;
    this._location=data3.location;
    this._range=data3.range;
    this._avgSpeed=data3.avgSpeed;
    this._type=data3.plane;
    this._status=data3.status;
    this._airline=data3.airline;
  }
}

let newPlane1=new PlaneInfo();
newPlane1.fromData(confirmData)

class FlightInfo{
  constructor(distance,dDate,aDate,dTime,aTime,weatherD,weatherA,dTemp,aTemp)
  {
    this._distance=distance;
    this._departureDate=dDate;
    this._arrivalDate=aDate;
    this._departureTime=dTime;
    this._arrivalTime=aTime;
    this._weatherD=weatherD;
    this._temperatureD=dTemp;
    this._weatherA=weatherA;
    this._temperatureA=aTemp;
  }

	get distance(){return this._distance;}
	get departureTime(){return this._departureTime;}
	get arrivalTime(){return this._arrivalTime;}
	get weatherD(){return this._weatherD;}
	get temperatureD(){return this._temperatureD;}
	get weatherA(){return this._weatherA;}
	get temperatureA(){return this._temperatureA;}

  set distance(newdistance){this._distance=newdistance;}
  set departureTime(dT){this._departureTime=dT;}
  set arrivalTime(aT){this._arrivalTime=aT;}
  set weatherD(dW){this._weatherD=dW;}
  set weatherA(aW){this._weatherA=aW;}
  set temperatureA(aTemp){this._temperatureA=aTemp;}
  set temperatureD(dTemp){this._temperatureD=dTemp;}
}
let dateee;
let dDate;let aDate;let dTime;let aTime;let dMili;let aMili;let weatherD;let dTemp;let weatherA;let aTemp;
function getDate(){
	let date=new Date(confirmData.date+"T"+confirmData.time);
  let d=new Date(confirmData.date+"T"+confirmData.time);
  let duration=d.getHours()+confirmData.timeTaken;
  let a = d.setHours(duration);
  let formatDate = date.toString();
  let formatD = d.toString();
  dDate = formatDate.substring(7,11)+formatDate.substring(4,8)+formatDate.substring(11,16);
  aDate = formatD.substring(7,11)+formatD.substring(4,8)+formatD.substring(11,16);
  let sxx=formatD.substring(4,8);
  dTime = formatDate.substring(16,21);
  aTime = formatD.substring(16,21);
  dMili = Number(date.valueOf().toString().substring(0,10));
  aMili = Number(d.valueOf().toString().substring(0,10));
  let monthsOb = {
    'Jan' : '01',
    'Feb' : '02',
    'Mar' : '03',
    'Apr' : '04',
    'May' : '05',
    'Jun' : '06',
    'Jul' : '07',
    'Aug' : '08',
    'Sep' : '09',
    'Oct' : '10',
    'Nov' : '11',
    'Dec' : '12'
}
for(let i in monthsOb){
  if(sxx==i){
    sxx=monthsOb[i];
  }
}
dateee=formatD.substring(7,11)+"-"+sxx+"-"+formatD.substring(11,16);
console.log( Number(confirmData.dCoordinate[0]));
console.log( Number(confirmData.dCoordinate[1]));
  console.log(Number(confirmData.aCoordinate[0]));
  console.log(Number(confirmData.aCoordinate[1]));

  let urlW="https://eng1003.monash/api/v1/darksky/"
  let dataWeatherD={
    u:"jkho0021",
    key:"5610723097ff0ea1bac862d4b27cc032",
    lat: Number(confirmData.dCoordinate[1]),
    lng: Number(confirmData.dCoordinate[0]),
    time: dMili,
    callback: "getWeatherD"
  }
  webServiceRequest(urlW,dataWeatherD);

  function weatherA(){
  let urlW="https://eng1003.monash/api/v1/darksky/"
  let dataWeatherD={
    u:"jkho0021",
    key:"5610723097ff0ea1bac862d4b27cc032",
    lat: Number(confirmData.aCoordinate[1]),
    lng: Number(confirmData.aCoordinate[0]),
    time: aMili,
    callback: "getWeatherA"
  }
  webServiceRequest(urlW,dataWeatherD);}
}

function getWeatherD(dataWeatherD){
  let weather="";
  let weather1=dataWeatherD.daily.data[0].summary;
  console.log(weather1);
  let matIcons=document.getElementById("weatherD");

  if(!dataWeatherD.daily.data[0].hasOwnProperty("summary")){
    matIcons.innerHTML="wb_sunny";
    alert("Weather information is not available")
  }
  else{
    if(weather1.includes("rainy")){
      weather="rainy";
      weatherD=weather;
      matIcons.innerHTML="umbrella";
    }
    else if(weather1.includes("cloudy")){
      weather="cloudy"
      weatherD=weather;
      matIcons.innerHTML="wb_cloudy";
    }
    else if(weather1.includes("sunny")||weather1.includes("Clear")){
      weather="sunny";
      weatherD=weather;
      //matIcons.innerHTML="wb_sunny";
    }
  }

  dTemp=dataWeatherD.currently.temperature;
  //temperatureDRef.innerHTML=dTemp;
  console.log(dTemp);
}

function getWeatherA(dataWeatherA){
  let weather5="";
  let weather4=dataWeatherA.daily.data[0].summary;
  let matIcons=document.getElementById("weatherA");
  if(!dataWeatherA.daily.data[0].hasOwnProperty("summary")){
    matIcons.innerHTML="wb_sunny";
    alert("Weather information is not available.")
  }
  else{
    //weatherBox2.some(e2=>weather2.includes(e2))
    if(weather4.includes("rainy")){
      weather5="rainy";
      weatherA=weather5;
      matIcons.innerHTML="umbrella";
    }
    else if(weather4.includes("cloudy")){
      weather5="cloudy"
      weatherA=weather5;
      matIcons.innerHTML="wb_cloudy";
    }
    else if(weather4.includes("sunny")){
      weather="sunny";
      weatherA=weather5;
      matIcons.innerHTML="wb_sunny";
    }
  }
  aTemp=dataWeatherA.currently.temperature;
}

let flightInfo1=new FlightInfo(confirmData.distance,dDate,aDate,dTime,aTime,weatherD,weatherA,dTemp,aTemp);

class Booking
{
  constructor()
  {
    this._origins = [];
    this._destinations = [];
    this._planes = [];
    this._flights = [];
  }

  newBooking(origin,destination,planes,flights)
  {
    this._origins.push(origin);
    this._destinations.push(destination);
    this._planes.push(planes);
    this._flights.push(flights);
  }
}

let booking1 = new Booking();
let originn=JSON.stringify(origin);
let destinationn=JSON.stringify(destination1);
let planee=JSON.stringify(newPlane1);
let infoo=JSON.stringify(flightInfo1);

function confirmFlight()
{
  booking1.newBooking(originn,destinationn,planee,infoo);
  localStorage.setItem(FLIGHT_DATA_KEY,JSON.stringify(booking1));
}
countryDData();
countryAData();
getDate();
//weatherD();
//weatherA();
//airportCodeDRef.innerHTML=confirmData.dAirport;
countryNameDRef.innerHTML=confirmData.dCountry;
//temperatureDRef.innerHTML=`${dTemp}celcius`;
//weatherDRef.innerHTML=weatherD;

dateDRef.innerHTML=confirmData.date;
timeDRef.innerHTML=confirmData.time;
//airportNameDRef.innerHTML=confirmData.dAirport;
//cityNameDRef.innerHTML=confirmData.dAirportCode;

airportDlocation.innerHTML=`[${confirmData.dCoordinate[1].toFixed(4)},${confirmData.dCoordinate[0].toFixed(4)}]`;

//airportCodeARef.innerHTML=confirmData.aAirport;
//countryNameARef.innerHTML=confirmData.aCountry;
//temperatureARef.innerHTML=aTemp+"°C";
//weatherARef.innerHTML=weatherA;
//dateARef.innerHTML=dateee;
timeARef.innerHTML=aTime;
//airportNameARef.innerHTML=confirmData.aAirport;
//cityNameARef.innerHTML=confirmData.aAirportCode;
airportAlocation.innerHTML=`[${confirmData.aCoordinate[1].toFixed(4)},${confirmData.aCoordinate[0].toFixed(4)}]`;


//planeNameRef.innerHTML=confirmData.plane;
//planeCodeRef.innerHTML=confirmData.registration;
//planeCNameRef.innerHTML=confirmData.airline;
distanceRef.innerHTML=Math.round(confirmData.distance)+"KM";
stopoverRef.innerHTML=confirmData.transit.length-1;
stopoverCoordsRef=document.getElementById("stopcoords");
stopoverCoordsRef.innerHTML=`First location:[${confirmData.transit[0][1].toFixed(4)},${confirmData.transit[0][0].toFixed(4)}]<br>Then:[${confirmData.transit[1][1].toFixed(4)},${confirmData.transit[1][0].toFixed(4)}]`;
;
confirmFlight();

/*mapboxgl.accessToken="pk.eyJ1IjoidGd5dWFuIiwiYSI6ImNrYWZwNDg3ODAxMDIydXA0MXo4OGNhczMifQ.74a4bFahe8_troP_cb4hqA";
let map=new mapboxgl.Map({
  container:'map',
  style:'mapbox://styles/mapbox/streets-v11',
  center:[10.86666667,34.56666667],
  zoom: 1.3,
})
map.addControl(new mapboxgl.NavigationControl());

for(let i in confirmData.transit)
{
  let marker1 = new mapboxgl.Marker(el)
  .setLngLat(confirmData.transit[i])
  .addTo(map);
}*/
