mapboxgl.accessToken = "pk.eyJ1IjoiZW5nMTAwM2h1YW5nIiwiYSI6ImNrYTZhaWRmajA0c2szM3J4dGZvY3R6c2kifQ.Df4Wc1A4Z34uMCmQSsvScw";
let map = new  mapboxgl.Map({
  container: 'map',
  center: [10.86666667,34.56666667],
  zoom: 1.3,
  style: 'mapbox://styles/eng1003huang/ckajwbocv2ao21inrch60vji6',
});
map.addControl(new mapboxgl.NavigationControl());

let key = "FLIGHT_DATA_KEY";
let getCurrent = localStorage.getItem(key);
let key1 = "PAST_FLIGHT";
let getPast = localStorage.getItem(key1);

function checkIfDataExistsLocalStorage()
{
	if (getData == null || getData == undefined)
  {return false;}
  else{return true;}
}

let coordinates = []
let coordinates2 = []
if (getPast.length < 5 || getPast == null){
  for (let i in getPast )
  {
    coordinates2.push(getPast[i]);
  }
}
else {
  for (let i=0;i<6;i++ )
  {
    coordinates2.push(getPast[i]);
  }
}

let currentMarkers = [];

function markers(coordinates)
{
  let geojson = {
    'type': 'FeatureCollection',
    'features': []}

  for (let i=0,j=1;i<coordinates.length&&j<coordinates.length;i+=2,j+=2)
  {
    let property =
    {
      icon: "url('takeoff.png')",
      iconSize: [30, 30]
    }
    let geo =
    {
      type: 'Point',
      coordinates: coordinates[i]
    }
    let property2 =
    {
      icon: "url('land.png')",
      iconSize: [30, 30]
    }
    let geo2 =
    {
      type: 'Point',
      coordinates: coordinates[j]
    }
    geojson.features.push({type: 'Feature',properties: property,geometry: geo});
    geojson.features.push({type: 'Feature',properties: property2,geometry: geo2});
  }

  geojson.features.forEach(function(marker) {
  // create a DOM element for the marker
    let div = document.createElement('div');
    div.className = 'marker';
    div.style.backgroundImage = marker.properties.icon;
    div.style.width = marker.properties.iconSize[0] + 'px';
    div.style.height = marker.properties.iconSize[1] + 'px';

    // add marker to map
    let marker1 = new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .addTo(map);
    currentMarkers.push(marker1);

    el.addEventListener('click', function()
    {
      let popup = new mapboxgl.Popup({ offset: 45});
      let output = "<nav class=\"mdl-navigation\">";
      output += "<a class=\"mdl-navigation__link\" href=\"flightInfo.html\"><center>View Flight Info &nbsp |</center></a></br>";
      output += "<a class=\"mdl-navigation__link\" href=\"schedule.html\"><center>&nbsp Delete Route</center></a></nav>";
      popup.setHTML(output);
      marker1.setPopup(popup);
      map.panTo(marker.geometry.coordinates);
    });
  });
}

function changeTitle()
{
  let titleRef= document.getElementById("Title")

  let checked = document.getElementById("switch-1").checked

  if (checked == true)
  {
    titleRef.innerHTML = "<center>Past Flights</center>";
    for (let a in currentMarkers){currentMarkers[a].remove();}

    if (coordinates2.length!== 0){
      markers(coordinates2);
      for(let i=0;i<coordinates.length;i+=2)
      {map.removeLayer('route'+i);map.removeSource('route'+i);}
      addMarkers(coordinates2);
    }
    else {alert("No past flights!")}
  }
  else if (checked == false)
  {
    titleRef.innerHTML = "<center>Current / Scheduled Flights</center>";
    for (let a in currentMarkers){currentMarkers[a].remove();}
    
    if (coordinates2.length!== 0){
      markers(coordinates);
      for(let i=0;i<coordinates2.length;i+=2)
      {map.removeLayer('route'+i);map.removeSource('route'+i);}
      addMarkers(coordinates);
    }
    else {alert("No current flights!")}
  }
}

function addMarkers(coordinates)
{
  for (let i=0;i<coordinates.length;i+=2)
  {
    let color = (Math.random()*0xFFFFFF<<0).toString(16);
    while (color.length < 6){color = (Math.random()*0xFFFFFF<<0).toString(16);}

    let location = [coordinates[i],coordinates[i+1]];
    let id = 'route'+i;
    map.addSource(id, {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'geometry': {
                'type': 'LineString',
                'coordinates': location
            }
        }
    });
    map.addLayer({
        'id': id,
        'type': 'line',
        'source': id,
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          "line-dasharray": [2, 4],
          'line-color': '#' + color,
          'line-width': 1.5
        }
    });
  }
}
map.on('load', function() {

  if (checkIfDataExistsLocalStorage() !== false){alert("No upcoming flights!")}
  else
  {
    for (i in getCurrent)
    {coordinates.push(getCurrent.location)}
    markers(coordinates);
    addMarkers(coordinates);
  }});
