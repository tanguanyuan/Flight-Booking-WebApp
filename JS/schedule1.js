mapboxgl.accessToken = "pk.eyJ1IjoiZW5nMTAwM2h1YW5nIiwiYSI6ImNrYTZhaWRmajA0c2szM3J4dGZvY3R6c2kifQ.Df4Wc1A4Z34uMCmQSsvScw";

let map = new  mapboxgl.Map({
  container: 'map',
  center: [10.86666667,34.56666667],
  zoom: 1.3,
  style: 'mapbox://styles/eng1003huang/ckajwbocv2ao21inrch60vji6'
});
map.addControl(new mapboxgl.NavigationControl());

let originCountryRef = document.getElementById("originCountry");
let originAirportRef = document.getElementById("originAirport");
let airplaneRef = document.getElementById("airplaneType");
let dateRef = document.getElementById('departDate');
let timeRef = document.getElementById('departTime');

map.on('load', function(){
  map.loadImage('https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Marker-Outside-Azure.png',
  function(error, image) {
    if (error) throw error;
    map.addImage('cat', image);
  });
  map.loadImage('https://cdn2.iconfinder.com/data/icons/IconsLandVistaMapMarkersIconsDemo/256/MapMarker_Marker_Outside_Chartreuse.png',
  function(error, image) {
      if (error) throw error;
      map.addImage('marker', image);
    });
});

// API
let allAirports = [];
let allAirportLocation = [];
let allAirportName = [];
let url = "https://eng1003.monash/api/v1/airports/";
let data = {
  country: "",
  callback: "countryCallback"
}
webServiceRequest(url,data);
function countryCallback(data)
{
  let countryList = [];
  for(let i = 0; i < data.length; i++)
  {
    if(countryList.includes(data[i].country) == false)
    {
      countryList.push(data[i].country);
    }
  }
  countryList.sort();

  let originCountryChoice = "";
  originCountryChoice +=  `<option value="" disabled selected>Select a Country</option>`;

  for(let i = 0; i < countryList.length; i++)
  {
    originCountryChoice += `<option name = "originCountry" value = "${countryList[i]}">${countryList[i]}</option>`;
  }
  originCountryRef.innerHTML = originCountryChoice;

  for (let i = 0; i < data.length; i++)
  {
    allAirports.push(data[i].airportCode);
    let location = [data[i].longitude,data[i].latitude];
    allAirportLocation.push(location);
    allAirportName.push(data[i].name);
  }
  console.log(allAirports)
}
console.log(allAirportLocation);
function getOriginCountryChosen()
{
  let data2 = {
    country: originCountryRef.value,
    callback: "cityCallback"
  }
  webServiceRequest(url,data2);
}

let airportCode = [];
let longlat = [];

function cityCallback(data2)
{
  let airportList = [];
  let airportList1 = [];

  for(let i = 0; i < data2.length; i++)
  {
      airportList.push(data2[i].name);
      airportList1.push(data2[i].name);
      airportCode.push(data2[i].airportCode);
      let location = [data2[i].longitude,data2[i].latitude];
      longlat.push(location);
  }
  airportList.sort();
  console.log(longlat);
  let originAirportChoice = "";
  originAirportChoice +=  `<option value="" disabled selected>Select an Airport</option>`;

  for(let i = 0; i < airportList.length; i++)
  {
    let index = airportList1.indexOf(airportList[i]);
    originAirportChoice += `<option name = "originAirport" value = "${airportCode[index]}">${airportList[i]}</option>`;
  }
  originAirportRef.innerHTML = originAirportChoice;
}

//let airportCode2 = [];
//let longlat2 = [];
/*function getDestinationCountryChosen()
{
  let data3 = {
    country: destinationCountryRef.value,
    callback: "cityCallback2"
  };
  webServiceRequest(url,data3);
}
function cityCallback2(data3)
{
  let airportList2 = [];
  let airportList3 = [];
  for(let i = 0; i < data3.length; i++)
  {
    if(airportList2.includes(data3[i].name) == false)
    {
      airportList2.push(data3[i].name);
      airportList3.push(data3[i].name);
      airportCode2.push(data3[i].airportCode);
      let location = [data3[i].longitude,data3[i].latitude];
      longlat2.push(location);
    }
  }
  airportList2.sort();

  let destinationAirportChoice = "";
  destinationAirportChoice +=  `<option value="" disabled selected>Select an Airport</option>`;
  */
  /*for(let i = 0; i < airportList2.length; i++)
  {
    let index = airportList3.indexOf(airportList2[i]);
    destinationAirportChoice += `<option name = "destinationAirport" value = "${airportCode2[index]}">${airportList2[i]}</option>`;
  }
  destinationAirportRef.innerHTML = destinationAirportChoice;
}*/

let url2 = "https://eng1003.monash/api/v1/planes/";
function getAirplaneChosen()
{
  let data4 = {
    callback: "airportCallback"
  };
  webServiceRequest(url2,data4); // Provide plane info
}
let el, el2, el3, el4, el5;
let styles = [el, el2, el3, el4, el5];
for(let i = 0; i < styles.length; i++)
{
  styles[i] = document.createElement('div');
  styles[i].className = 'marker';
  styles[i].style.backgroundImage = "url('images/AirPlane.png')";
  styles[i].style.width = '30px';
  styles[i].style.height = '30px';
}
let airportChosenMarker = new mapboxgl.Marker({"color" : "#FF0000"});
let marker1 = new mapboxgl.Marker(styles[0]);
let marker2 = new mapboxgl.Marker(styles[1]);
let marker3 = new mapboxgl.Marker(styles[2]);
let marker4 = new mapboxgl.Marker(styles[3]);
let marker5 = new mapboxgl.Marker(styles[4]);
let markers = [marker1, marker2, marker3, marker4, marker5];
let newNearest5 = [];
let newNearest5Registration = [];
let newNearest5Range = [];
let newNearest5Speed = [];
let newNearest5Airline = [];
let newNearest5Type = [];
let newNearest5Status = [];
let newNearest5Id = [];
function airportCallback(data4)
{
  let index = airportCode.indexOf(originAirportRef.value);
  map.setZoom(2);
  map.panTo(longlat[index]);


  airportChosenMarker.setLngLat(longlat[index]);
  airportChosenMarker.addTo(map);

  let coordinates = [];
  let airplaneType = [];
  let airplaneRegistration = [];
  let airplaneAirline = [];
  let airplaneLocationCode = [];
  let airplaneRange = [];
  let airplaneSpeed = [];
  let airplaneStatus = [];
  let airplaneId = [];
  for(let i = 0; i < data4.airplanes.length; i++)
  {
    let planeIndex = allAirports.indexOf(data4.airplanes[i].location);

    coordinates.push(allAirportLocation[planeIndex]);
    airplaneRegistration.push(data4.airplanes[i].registration);
    airplaneAirline.push(data4.airplanes[i].airline);
    airplaneLocationCode.push(data4.airplanes[i].location);
    airplaneRange.push(data4.airplanes[i].range);
    airplaneSpeed.push(data4.airplanes[i].avgSpeed);
    //if (data4.airplanes[i].location == originAirportRef.value)
    //{
    airplaneType.push(data4.airplanes[i].type);
    airplaneStatus.push(data4.airplanes[i].status);
    airplaneId.push(data4.airplanes[i].id);
    //}
  }
  airplaneType.sort();
  console.log(coordinates);
  // DISPLAY NEAREST AIRPLANES
  // USING HAVERSINE, FOR EACH PLANE, CALCULATE THE DISTANCE AND SHOW LOWEST

  let distances = [];
  let sortedDistances = [];
  // HAVERSINE FORMULA:
  const R = 6371; // km;
  let lat1 = longlat[index][1]; // lat of airport chosen
  let lat1Radian = lat1 * Math.PI/180;
  let lon1 = longlat[index][0]; // lon of airport chosen
  for (let i = 0; i < data4.airplanes.length; i++)
  {
    let lat2 = coordinates[i][1];
    let lat2Radian = lat2 * Math.PI/180;
    let lon2 = coordinates[i][0];
    let differenceLat = (lat2 - lat1) * Math.PI/180;
    let differenceLon = (lon2 - lon1) * Math.PI/180;
    let a = Math.sin(differenceLat/2) * Math.sin(differenceLat/2) + Math.cos(lat1Radian) * Math.cos(lat2Radian) * Math.sin(differenceLon/2) * Math.sin(differenceLon/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c;
    distances.push(d);
    sortedDistances.push(d);
  }
  // Sort the distances from shortest to longest.
  for (let i = 0; i < sortedDistances.length; i++)
  {
    let minIndex = i;
    for (let j =  i + 1; j < sortedDistances.length; j++)
    {
      if (sortedDistances[j] < sortedDistances[minIndex])
      {
        minIndex = j;
      }
    }
    if (minIndex != i)
    {
      let temporary = sortedDistances[i];
      sortedDistances[i] = sortedDistances[minIndex];
      sortedDistances[minIndex] = temporary;
    }
  }
  // Finding the nearest 5 planes
  let nearest5 = [];
  for (let i = 0; i < sortedDistances.length; i++)
  {
    let distancesIndex = distances.indexOf(sortedDistances[i])
    if (nearest5.length != 5)
    {
      if (airplaneRange[distancesIndex] > sortedDistances[i])
      {
        nearest5.push(sortedDistances[i]);
      }
    }
  }

  let nearest5Index = [];
  for (let i = 0; i < nearest5.length; i++)
  {
    nearest5Index.push(distances.indexOf(nearest5[i]));
  }

  let nearest5Coordinates = [];
  let nearest5Registration = [];
  let nearest5Airline = [];
  let nearest5LocationCode = [];
  let nearest5Range = [];
  let nearest5Speed = [];
  let nearest5Type = [];
  let nearest5Status = [];
  let nearest5Id = [];
  for (let i = 0; i < nearest5Index.length; i++)
  {
    nearest5Coordinates.push(coordinates[nearest5Index[i]]);
    nearest5Registration.push(airplaneRegistration[nearest5Index[i]]);
    nearest5Airline.push(airplaneAirline[nearest5Index[i]]);
    nearest5LocationCode.push(airplaneLocationCode[nearest5Index[i]]);
    nearest5Range.push(airplaneRange[nearest5Index[i]]);
    nearest5Speed.push(airplaneSpeed[nearest5Index[i]]);
    nearest5Type.push(airplaneType[nearest5Index[i]]);
    nearest5Status.push(airplaneStatus[nearest5Index[i]]);
    nearest5Id.push(airplaneId[nearest5Index[i]]);
  }
  console.log(nearest5Coordinates);
  newNearest5 = nearest5Coordinates;
  newNearest5Registration = nearest5Registration;
  newNearest5Range = nearest5Range;
  newNearest5Speed = nearest5Speed;
  newNearest5Airline = nearest5Airline;
  newNearest5Type = nearest5Type;
  newNearest5Status = nearest5Status;
  newNearest5Id = nearest5Id;
  console.log(newNearest5);
  let geojson = {
    'type': 'FeatureCollection',
    'features': []
  };

  for (let i in nearest5Coordinates)
  {
    let property =
    {
      icon: "url('images/AirPlane.png')",
      iconSize: [30, 30]
    };
    let geo =
    {
      type: 'Point',
      coordinates: nearest5Coordinates[i]
    };
    geojson.features.push({type: 'Feature',properties: property,geometry: geo})
  }
  for (let i = 0; i < nearest5Coordinates.length; i++)
  {
    console.log(nearest5Coordinates[i])
    //markers[i].backgroundImage = "url('AirPlane.png')";
    //markers[i].setIcon("url('AirPlane.png')");
    //markers[i].width = '30px';
    //markers[i].height = '30px';
    markers[i].setLngLat(nearest5Coordinates[i]);
    markers[i].addTo(map);
  }
  /*geojson.features.forEach(function(marker) {
  // create a DOM element for the marker
    let el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = marker.properties.icon;
    el.style.width = marker.properties.iconSize[0] + 'px';
    el.style.height = marker.properties.iconSize[1] + 'px';

    // add marker to map
    let marker1 = new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .addTo(map);
  });*/

  /*let airplaneChoice = "";
  airplaneChoice +=  `<option value="" disabled selected>Select an Airplane</option>`;
  for(let i = 0; i < airplaneList.length; i++)
  {
    airplaneChoice += `<option name = "airplane" value = "${airplaneList[i]}">${airplaneList[i]}</option>`;
  }
  airplaneRef.innerHTML = airplaneChoice;*/
  let registration1Ref, registration2Ref, registration3Ref, registration4Ref, registration5Ref;
  let airline1Ref, airline2Ref, airline3Ref, airline4Ref, airline5Ref;
  let location1Ref, location2Ref, location3Ref, location4Ref, location5Ref;
  let range1Ref, range2Ref, range3Ref, range4Ref, range5Ref;

  let registrationRef = [registration1Ref, registration2Ref, registration3Ref, registration4Ref, registration5Ref];
  let airlineRef = [airline1Ref, airline2Ref, airline3Ref, airline4Ref, airline5Ref];
  let locationRef = [location1Ref, location2Ref, location3Ref, location4Ref, location5Ref];
  let rangeRef = [range1Ref, range2Ref, range3Ref, range4Ref, range5Ref];
  for (let i = 0; i < registrationRef.length; i++)
  {
    registrationRef[i] = document.getElementById(`Registration${i+1}`);
    registrationRef[i].innerText = `${nearest5Registration[i]}`;
    airlineRef[i] = document.getElementById(`Airline${i+1}`);
    airlineRef[i].innerText = `${nearest5Airline[i]}`
    locationRef[i] = document.getElementById(`Location${i+1}`);
    locationRef[i].innerText = `${nearest5LocationCode[i]}`;
    rangeRef[i] = document.getElementById(`Range${i+1}`);
    rangeRef[i].innerText = `${nearest5Range[i]}`;
  }
  //return nearest5Coordinates;
}
/*function confirm()
{
  let index = airportCode.indexOf(originAirportRef.value);
  let dlatlong = longlat[index];

  let index1 = airportCode2.indexOf(destinationAirportRef.value);
  let alatlong = longlat2[index1];

  let bookData = {
    date: dateRef.value,
    time: timeRef.value,
    departure: originCountryRef.value,
    arrival: destinationCountryRef.value,
    dAirport: originAirportRef.value,
    aAirport: destinationAirportRef.value,
    plane: airplaneRef.value,
    dLat: dlatlong[0],
    dLong: dlatlong[1],
    aLat: alatlong[0],
    aLong: alatlong[1]
  };

  localStorage.setItem("flightinfo",JSON.stringify(bookData));
  location.href = "flightConfirm.html";
}*/
let airportsWithinRangeMarker = new mapboxgl.Marker({ color: "#FFFF00" })
let selectedPlanePopup = new mapboxgl.Popup({ offset: 25 })
let output = "";
let planeSelectedIndex = 0;
let originAirportIndex = 0;
function selectPlane ()
{
  if (map.getLayer("TransitsLayer") != undefined)
  {
    map.removeLayer("TransitsLayer");
    map.removeSource("point");
  }
  if (map.getLayer("airplaneToSource") != undefined)
  {
    map.removeLayer("airplaneToSource");
    map.removeSource("chosenAirplaneToSource");
  }
  let planeSelectedRef = document.getElementsByName("plane");
  //let planeSelectedIndex = 0;
  for (let i = 0; i < planeSelectedRef.length; i++)
  {
    if (planeSelectedRef[i].checked)
    {
      //console.log(newNearest5[i]);
      planeSelectedIndex = Number(planeSelectedRef[i].value);
      //console.log(newNearest5[planeSelectedIndex]);
      //map.panTo(newNearest5[planeSelectedIndex]);
      map.setZoom(5);
      map.flyTo({
        center: newNearest5[planeSelectedIndex],
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
      });
      output = `Plane ${i+1}<br>Registration: ${newNearest5Registration[i]}`;
      selectedPlanePopup.setHTML(output);
      markers[i].setPopup(selectedPlanePopup);
      markers[i].addTo(map);
      markers[i].togglePopup();
    }
  }

  /*map.addSource('chosenAirplaneToSource',{
    'type': 'geojson',
    'data':{
      'type': 'Feature',
      'geometry': {
        'type':'LineString',
        'coordinates': [newNearest5[planeSelectedIndex],allAirportLocation[originAirportIndex]]
      }
    }
  });
  map.addLayer({
    id: "airplaneToSource",
    type: "line",
    source: "chosenAirplaneToSource",
    layout: { "line-join": "round", "line-cap": "round" },
    paint: { "line-color": "#888", "line-width": 6 }
  });*/
  originAirportIndex = allAirports.indexOf(originAirportRef.value);
  console.log(originAirportIndex);
  let airportsWithinRangeData = {
    lat: allAirportLocation[originAirportIndex][1],
    lng: allAirportLocation[originAirportIndex][0],
    range: newNearest5Range[planeSelectedIndex],
    callback: "airportsWithinRangeCallback"
  }
  console.log(newNearest5Range);
  console.log(airportsWithinRangeData.range);
  console.log(airportsWithinRangeData.lat);
  console.log(airportsWithinRangeData.lng);
  console.log(originAirportRef.value);
  console.log(originAirportIndex);
  console.log(airportCode);
  map.addSource('chosenAirplaneToSource',{
    'type': 'geojson',
    'data':{
      'type': 'Feature',
      'geometry': {
        'type':'LineString',
        'coordinates': [newNearest5[planeSelectedIndex],allAirportLocation[originAirportIndex]]
      }
    }
  });
  map.addLayer({
    id: "airplaneToSource",
    type: "line",
    source: "chosenAirplaneToSource",
    layout: { "line-join": "round", "line-cap": "round" },
    paint: { "line-color": "#888", "line-width": 6 }
  });
  webServiceRequest(url, airportsWithinRangeData);
}

function airportsWithinRangeCallback(airportsWithinRangeData)
{
  let airportsWithinRangeDataLocations = [];
  for (let i = 0; i < airportsWithinRangeData.length; i++)
  {
    let airportsWithinRangeCoords = [airportsWithinRangeData[i].longitude,airportsWithinRangeData[i].latitude];
    airportsWithinRangeDataLocations.push(airportsWithinRangeCoords);
  }
  console.log(airportsWithinRangeData);
  console.log(airportsWithinRangeDataLocations);
  let transitFeature = [];
  for (let i = 0; i < airportsWithinRangeDataLocations.length; i++)
  {
    let descriptionOutput = `<center>Airport Name: ${airportsWithinRangeData[i].name}<br>Airport Code: ${airportsWithinRangeData[i].airportCode}</center>`;
    let airportTransitData =
    {
      'id': i,
      'type': 'Feature',
      'properties': {
        'description': descriptionOutput,
      },
      'geometry': {
        'type': 'Point',
        'coordinates': airportsWithinRangeDataLocations[i]
      }
    }
    transitFeature.push(airportTransitData);
    //console.log(transitFeature);
  }
  map.addSource('point',{
    'type': 'geojson',
    'data':{
      'type': 'FeatureCollection',
      'features': transitFeature
    }
  });

  map.addLayer({
    'id': 'TransitsLayer',
    'type': 'symbol',
    'source': 'point',
    'layout': {
      'icon-image': 'cat',
      'icon-size': 0.09,
      'icon-allow-overlap': true
    }
  });

  map.on('click', 'TransitsLayer', function(e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    console.log(coordinates);
    var description = `${e.features[0].properties.description}<br><center><button onclick = "transitSelected(${coordinates[0]}, ${coordinates[1]})">Set Transit Point</button></center>`

    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(description)
      .addTo(map);

      /*let transitRef = document.getElementById("setTransit");
      transitRef.addEventListener("click", function(){
        if (map.getLayer("selectedTransitLayer") != undefined)
        {
          map.removeLayer("selectedTransitLayer");
          map.removeSource("selectedTransit");
        }
        console.log(coordinates);
        console.log(description);
        map.addSource('selectedTransit',{
          'type': 'geojson',
          'data':{
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'geometry': {
                  'type':'Point',
                  'coordinates': coordinates
                }
              }
            ]
          }
        });

        map.addLayer({
          'id': 'selctedTransitLayer',
          'type': 'symbol',
          'source': 'selectedTransit',
          'layout': {
            'icon-image': 'marker',
            'icon-size': 0.09,
            'icon-allow-overlap': true
          }
        });
      });*/
    });
  }
  //let originAirportIndex = allAirports.indexOf(originAirportRef.value)
  //console.log(originAirportIndex);
  let transits = [];
  let routeDistances = [];
  let routeTime = [];
  console.log(allAirportLocation);
  console.log(originAirportIndex);

  console.log(transits);
  function transitSelected(data,data1)
  {
    transits[0] = allAirportLocation[originAirportIndex]
    if (map.getLayer("routes") != undefined)
    {
      map.removeLayer("routes");
      map.removeSource("object");
    }
    if (map.getLayer("TransitsLayer") != undefined)
    {
      map.removeLayer("TransitsLayer");
      map.removeSource("point");
    }
    if (map.getLayer("destination") != undefined)
    {
      map.removeLayer("destination");
      map.removeSource("finalDestination");
    }
    //let transits = [data,data1];
    transits.push([data,data1]);

    /*let object = {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: transits
        }
      }
    };*/
    let airportsWithinRangeData = {
      lat: transits[transits.length - 1][1],
      lng: transits[transits.length - 1][0],
      range: newNearest5Range[planeSelectedIndex],
      callback: "airportsWithinRangeCallback"
    }
    webServiceRequest(url, airportsWithinRangeData);
    map.addSource('object',{
      'type': 'geojson',
      'data':{
        'type': 'Feature',
        'geometry': {
          'type':'LineString',
          'coordinates': transits
        }
      }
    });
    map.addLayer({
      id: "routes",
      type: "line",
      source: "object",
      layout: { "line-join": "round", "line-cap": "round" },
      paint: { "line-color": "#888", "line-width": 6 }
    });

    setTimeout(showDestination, 2000);

    console.log(transits);
    console.log(data);
    console.log(data1);
    console.log(data.length);

    // Calculating distances for each route
    const R = 6371; // km;
    let lat1 = transits[transits.length-2][1]; // lat of airport chosen
    let lat1Radian = lat1 * Math.PI/180;
    let lon1 = transits[transits.length-2][0]; // lon of airport chosen
    let lat2 = transits[transits.length-1][1];
    let lat2Radian = lat2 * Math.PI/180;
    let lon2 = transits[transits.length-1][0];
    let differenceLat = (lat2 - lat1) * Math.PI/180;
    let differenceLon = (lon2 - lon1) * Math.PI/180;
    let a = Math.sin(differenceLat/2) * Math.sin(differenceLat/2) + Math.cos(lat1Radian) * Math.cos(lat2Radian) * Math.sin(differenceLon/2) * Math.sin(differenceLon/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c; //STOP HERE
    routeDistances.push(d);
    console.log(routeDistances);

    // Calculating average time taken for each route
    // Speed of plane chosen
    let planeSpeedKmh = newNearest5Speed[planeSelectedIndex] * 1.852;
    let averageTime = d/planeSpeedKmh;
    routeTime.push(averageTime);
    console.log(routeTime);

    let i = 0;
    map.on('click', 'routes', function(e) {
      let coordinates = transits[i+1];
      let description = `Route ${i+1}<br>Route Distance: ${routeDistances[i].toFixed(2)} km<br>Estimated flight duration: ${routeTime[i].toFixed(2)} hours`;
      i++;

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
  });
}

  function showDestination()
  {
    map.addSource('finalDestination',{
      'type': 'geojson',
      'data':{
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'geometry': {
              'type':'Point',
              'coordinates': transits[transits.length - 1]
            }
          }
        ]
      }
    });

    map.addLayer({
      'id': 'destination',
      'type': 'symbol',
      'source': 'finalDestination',
      'layout': {
        'icon-image': 'marker',
        'icon-size': 0.15,
        'icon-allow-overlap': true
      }
    });
  }

  function confirm()
  {
    console.log(newNearest5Range[planeSelectedIndex]); // Selected Plane Range
    console.log(newNearest5Airline[planeSelectedIndex]); // Selected Plane Airline
    console.log(newNearest5Type[planeSelectedIndex]); // Selected Plane Type
    console.log(newNearest5Status[planeSelectedIndex]); // Selected Plane Status
    console.log(newNearest5[planeSelectedIndex]); // Selected Plane Location
    console.log(newNearest5Registration[planeSelectedIndex]); // Selected Plane Registration
    let arrivalIndex = allAirportLocation.indexOf(transits[transits.length - 1]);
    let arrivalAirportCode = allAirports[arrivalIndex];
    console.log(transits);
    console.log(transits[transits.length - 1]);
    console.log(allAirportLocation);
    console.log(arrivalIndex);
    console.log(arrivalAirportCode);
    let totalDistance = 0;
    let totalTimeTaken = 0;
    for (let i = 0; i < routeDistances.length; i++)
    {
      totalDistance += routeDistances[i]; // Total Distance
      totalTimeTaken += routeTime[i]  // Total Time
    }

    let aindex;
    for (let i in allAirportLocation)
    {
      if(allAirportLocation[i][0]==transits[transits.length - 1][0]&&allAirportLocation[i][1]==transits[transits.length - 1][1])
      {
        aindex = i;
      }
    }
    newNearest5Status[planeSelectedIndex] = "unavailable";

    let bookData = {
      date: dateRef.value,
      time: timeRef.value,
      distance:totalDistance,
      timeTaken: totalTimeTaken,

      dAirportCode: allAirportName[originAirportIndex],
      dCountry: originCountryRef.value,
      dAirport: allAirports[originAirportIndex],
      dCoordinate: allAirportLocation[originAirportIndex],

      aAirportCode: "code",
      aCountry: "country",
      aAirportName: "name",
      aCoordinate: transits[transits.length - 1],

      plane: newNearest5Type[planeSelectedIndex],
      planeid: newNearest5Id[planeSelectedIndex],
      planeSpeed: newNearest5Speed[planeSelectedIndex],
      transit: transits,
      status: newNearest5Status[planeSelectedIndex],
      registration: newNearest5Registration[planeSelectedIndex],
      airline: newNearest5Airline[planeSelectedIndex]
    };

    localStorage.setItem("flightinfo",JSON.stringify(bookData));
    location.href = "flightConfirm.html";
  }
      //map.setZoom(5);
      //console.log(planeSelectedRef[i].value);
      /*let airportsWithinRange = [];
      let airportsRange = [];
      let airportsWithinRangeIndex = [];
      let selectedPlaneRange = newNearest5Range[i];
      const R = 6371;
      let lat1 = newNearest5[planeSelectedIndex][1];
      let lat1Radian = lat1 * Math.PI/180;
      let lon1 = newNearest5[planeSelectedIndex][0];
      for (let i = 0; i < allAirportLocation.length; i++)
      {
        let lat2 = allAirportLocation[i][1];
        let lat2Radian = lat2 * Math.PI/180;
        let lon2 = allAirportLocation[i][0];
        let differenceLat = (lat2 - lat1) * Math.PI/180;
        let differenceLon = (lon2 - lon1) * Math.PI/180;
        let a = Math.sin(differenceLat/2) * Math.sin(differenceLat/2) + Math.cos(lat1Radian) * Math.cos(lat2Radian) * Math.sin(differenceLon/2) * Math.sin(differenceLon/2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        let d = R * c;
        airportsRange.push(d);
        if (d <= selectedPlaneRange)
        {
          airportsWithinRange.push(d);
        }
      }
      console.log(airportsRange);
      console.log(airportsWithinRange);
      for (let i = 0; i < airportsWithinRange.length; i++)
      {
        airportsWithinRangeIndex.push(airportsRange.indexOf(airportsWithinRange[i]));
        airportsWithinRangeMarker.setLngLat(allAirportLocation[airportsWithinRangeIndex[i]]);
        //console.log(allAirportLocation[airportsWithinRangeIndex[i]])
        //airportsWithinRangeMarker.addTo(map);
      }*/


      //console.log(airportsWithinRangeIndex);

      //console.log(transitFeature);
