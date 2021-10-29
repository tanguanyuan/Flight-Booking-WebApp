const FLIGHT_DATA_KEY="flight666";

function viewInfo(){
  let bookk=JSON.parse(localStorage.getItem(FLIGHT_DATA_KEY));
  console.log(bookk);
  let origin=bookk._origins[0];
  let destination1=bookk._destinations[0];
  let flightInfo1=bookk._flights[0];
  let newPlane1=bookk._planes[0];
  let airportCodeD1Ref=document.getElementById("airportCodeD1");
  let countryNameD1Ref=document.getElementById("countryNameD1");
  let temperatureD1Ref=document.getElementById("temperatureD1");
  let weatherD1Ref=document.getElementById("weatherD1");
  countryNameD1Ref.innerHTML=origin.country;
  airportCodeD1Ref.innerHTML=  origin.airportCode;
  temperatureD1Ref.innerHTML=flightInfo1.temperatureD;
  weatherD1Ref.innerHTML=flightInfo1.weatherD;

  let airportCodeA1Ref=document.getElementById("airportCodeA1");
  let countryNameA1Ref=document.getElementById("countryNameA1");
  let temperatureA1Ref=document.getElementById("temperatureA1");
  let weatherA1Ref=document.getElementById("weatherA1");
  airportCodeA1Ref.innerHTML=destination1.airportCode;
  countryNameA1Ref.innerHTML=destination1.country;
  temperatureA1Ref.innerHTML=flightInfo1.temperatureA;
  weatherA1Ref.innerHTML=flightInfo1.weatherA;

  let dateD1Ref=document.getElementById("dateD1");
  let timeD1Ref=document.getElementById("timeD1");
  let cityNameD1Ref=document.getElementById("cityNameD1");
  let airportNameD1Ref=document.getElementById("airportNameD1");
  let airportDlocation1Ref=document.getElementById("airportDlocation1");
  airportNameD1Ref.innerHTML=origin.name;
  cityNameD1Ref.innerHTML=origin.city;
  airportDlocation1Ref.innerHTML=`${origin.latitude}, ${origin.latitude}`;
  dateD1Ref.innerHTML=flightInfo1.departure;
  timeD1Ref.innerHTML=flightInfo1.departureTime;



  let dateA1Ref=document.getElementById("dateA1");
  let timeA1Ref=document.getElementById("timeA1");
  let cityNameA1Ref=document.getElementById("cityNameA1");
  let airportNameA1Ref=document.getElementById("airportNameA1");
  let airportAlocation1Ref=document.getElementById("airportAlocation1");
  airportNameA1Ref.innerHTML=destination1.name;
  cityNameA1Ref.innerHTML=destination1.city;
  airportAlocation1Ref.innerHTML=`${destination1.longitude},${destination1.latitude}`;
  timeA1Ref.innerHTML=flightInfo1.arrivalTime;

  let planeName1Ref=document.getElementById("planeName1");
  let planeCode1Ref=document.getElementById("planeCode1");
  let planeCName1Ref=document.getElementById("airline1");
  let distance1Ref=document.getElementById("distance1");
  let stopover1Ref=document.getElementById("stopover1");
  let stopcoords1Ref=document.getElementById("stopcoords1");
  planeCode1Ref.innerHTML=newPlane1.registration;
  planeCName1Ref.innerHTML=newPlane1.airline;
  planeName1Ref.innerHTML=newPlane1.type;
  distance1Ref.innerHTML=flightInfo1.distance;

//  plane.stopover;

}
function deleteFlight(){
  if(alert("Do you sure want to delete flight")){

  }
}

/*window.onload=function(){
  viewInfo();
};*/
