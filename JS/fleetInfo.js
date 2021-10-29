
  function LoadTable()
  {
    getAirplaneID();
    getAirplaneRegistration();
    getAirplaneLocation();
    getAirplaneAirline()
    getAirplaneRange();
    getAirplaneAvgSpeed();
    getAirplaneType();
    getAirplaneStatus();
  }

  function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("fleetTable");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  function sortTableNum(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("fleetTable");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (Number(x.innerHTML.replace("<h4>","").replace("</h4>","")) < Number(y.innerHTML.replace("<h4>","").replace("</h4>",""))) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (Number(x.innerHTML.replace("<h4>","").replace("</h4>","")) > Number(y.innerHTML.replace("<h4>","").replace("</h4>",""))) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }












  let url = "https://eng1003.monash/api/v1/planes/";
  function getAirplaneID()
  {
    let data1 = {
      callback: "airportIDCallback"
    }
    webServiceRequest(url,data1);
  }
  function airportIDCallback(data1)
  {
    let airplaneIDList = [];
    for(let i = 0; i < data1.airplanes.length; i++)
    {
          airplaneIDList.push(data1.airplanes[i].id);
    }

    let trList = [];
    for(let i = 1; i <= data1.airplanes.length;i++)
    {
      trList.push(`tr${i}`);
    }

    for(let i = 0; i < data1.airplanes.length;i++)
    {
      var z1 = document.createElement("TD");
      z1.style = "border-color:#002233;border-width: 3px;"
      var s1 = document.createElement("h4");
      var t1 = document.createTextNode(airplaneIDList[i]);
      s1.appendChild(t1);
      z1.appendChild(s1);
      document.getElementById(trList[i]).appendChild(z1);
    }
  }

  function getAirplaneRegistration()
  {
    let data2 = {
      callback: "airportRegistrationCallback"
    }
    webServiceRequest(url,data2);
  }
  function airportRegistrationCallback(data2)
  {
    let airplaneRegistrationList = [];
    for(let i = 0; i < data2.airplanes.length; i++)
    {
          airplaneRegistrationList.push(data2.airplanes[i].registration);
    }

    let trList = [];
    for(let i = 1; i <= data2.airplanes.length;i++)
    {
      trList.push(`tr${i}`);
    }

    for(let i = 0; i < data2.airplanes.length;i++)
    {
      var z1 = document.createElement("TD");
      z1.style = "border-color:#002233;border-width: 3px;"
      var s1 = document.createElement("h4");
      var t1 = document.createTextNode(airplaneRegistrationList[i]);
      s1.appendChild(t1);
      z1.appendChild(s1);
      document.getElementById(trList[i]).appendChild(z1);
    }
  }

  function getAirplaneLocation()
  {
    let data3 = {
      callback: "airportLocationCallback"
    }
    webServiceRequest(url,data3);
  }
  function airportLocationCallback(data3)
  {
    let airplaneLocationList = [];
    for(let i = 0; i < data3.airplanes.length; i++)
    {
          airplaneLocationList.push(data3.airplanes[i].location);
    }
    let trList = [];
    for(let i = 1; i <= data3.airplanes.length;i++)
    {
      trList.push(`tr${i}`);
    }

    for(let i = 0; i < data3.airplanes.length;i++)
    {
      var z1 = document.createElement("TD");
      z1.style = "border-color:#002233;border-width: 3px;"
      var s1 = document.createElement("h4");
      var t1 = document.createTextNode(airplaneLocationList[i]);
      s1.appendChild(t1);
      z1.appendChild(s1);
      document.getElementById(trList[i]).appendChild(z1);
    }
  }

  function getAirplaneRange()
  {
    let data4 = {
      callback: "airportRangeCallback"
    }
    webServiceRequest(url,data4);
  }
  function airportRangeCallback(data4)
  {
    let airplaneRangeList = [];
    for(let i = 0; i < data4.airplanes.length; i++)
    {
          airplaneRangeList.push(data4.airplanes[i].range);
    }
    let trList = [];
    for(let i = 1; i <= data4.airplanes.length;i++)
    {
      trList.push(`tr${i}`);
    }

    for(let i = 0; i < data4.airplanes.length;i++)
    {
      var z1 = document.createElement("TD");
      z1.style = "border-color:#002233;border-width: 3px;"
      var s1 = document.createElement("h4");
      var t1 = document.createTextNode(airplaneRangeList[i]);
      s1.appendChild(t1);
      z1.appendChild(s1);
      document.getElementById(trList[i]).appendChild(z1);
    }
  }

  function getAirplaneAvgSpeed()
  {
    let data5 = {
      callback: "airportAvgSpeedCallback"
    }
    webServiceRequest(url,data5);
  }
  function airportAvgSpeedCallback(data5)
  {
    let airplaneAvgSpeedList = [];
    for(let i = 0; i < data5.airplanes.length; i++)
    {
          airplaneAvgSpeedList.push(data5.airplanes[i].avgSpeed);
    }
    let trList = [];
    for(let i = 1; i <= data5.airplanes.length;i++)
    {
      trList.push(`tr${i}`);
    }

    for(let i = 0; i < data5.airplanes.length;i++)
    {
      var z1 = document.createElement("TD");
      z1.style = "border-color:#002233;border-width: 3px;"
      var s1 = document.createElement("h4");
      var t1 = document.createTextNode(airplaneAvgSpeedList[i]);
      s1.appendChild(t1);
      z1.appendChild(s1);
      document.getElementById(trList[i]).appendChild(z1);
    }
  }

  function getAirplaneType()
  {
    let data6 = {
      callback: "airportTypeCallback"
    }
    webServiceRequest(url,data6);
  }
  function airportTypeCallback(data6)
  {
    let airplaneTypeList = [];
    for(let i = 0; i < data6.airplanes.length; i++)
    {
          airplaneTypeList.push(data6.airplanes[i].type);
    }
    let trList = [];
    for(let i = 1; i <= data6.airplanes.length;i++)
    {
      trList.push(`tr${i}`);
    }

    for(let i = 0; i < data6.airplanes.length;i++)
    {
      var z1 = document.createElement("TD");
      z1.style = "border-color:#002233;border-width: 3px;"
      var s1 = document.createElement("h4");
      var t1 = document.createTextNode(airplaneTypeList[i]);
      s1.appendChild(t1);
      z1.appendChild(s1);
      document.getElementById(trList[i]).appendChild(z1);
    }
  }

  function getAirplaneStatus()
  {
    let data7 = {
      callback: "airportStatusCallback"
    }
    webServiceRequest(url,data7);
  }
  function airportStatusCallback(data7)
  {
    let airplaneStatusList = [];
    for(let i = 0; i < data7.airplanes.length; i++)
    {
          airplaneStatusList.push(data7.airplanes[i].status);
    }
    // Checking for availability
    let bookData = localStorage.getItem("flightinfo");
    let flightInfo = JSON.parse(bookData);
    let selectedPLaneID = flightInfo.planeid;
    console.log(selectedPLaneID);
    console.log(flightInfo.distance);
    console.log(Number(selectedPLaneID)+1);
    let selectedPlaneStatus = flightInfo.status;
    console.log(flightInfo.aCountry);
    console.log(flightInfo.status);
    if (selectedPlaneStatus == "unavailable")
    {
      airplaneStatusList.splice(Number(selectedPLaneID)+1,1,"unavailable")
    }

    let trList = [];
    for(let i = 1; i <= data7.airplanes.length;i++)
    {
      trList.push(`tr${i}`);
    }

    for(let i = 0; i < data7.airplanes.length;i++)
    {
      var z1 = document.createElement("TD");
      z1.style = "border-color:#002233;border-width: 3px;"
      var s1 = document.createElement("h4");
      if(airplaneStatusList[i] == "available")
      {
        s1.style.color = "Green";
      }
      else
      {
        s1.style.color = "Red";
      }

      var t1 = document.createTextNode(airplaneStatusList[i]);
      s1.appendChild(t1);
      z1.appendChild(s1);
      document.getElementById(trList[i]).appendChild(z1);
    }
  }

  function getAirplaneAirline()
  {
    let data8 = {
      callback: "airportAirlineCallback"
    }
    webServiceRequest(url,data8);
  }
  function airportAirlineCallback(data8)
  {
    let airplaneAirlineList = [];
    for(let i = 0; i < data8.airplanes.length; i++)
    {
          airplaneAirlineList.push(data8.airplanes[i].airline);
    }
    let trList = [];
    for(let i = 1; i <= data8.airplanes.length;i++)
    {
      trList.push(`tr${i}`);
    }

    for(let i = 0; i < data8.airplanes.length;i++)
    {
      var z1 = document.createElement("TD");
      z1.style = "border-color:#002233;border-width: 3px;"
      var s1 = document.createElement("h4");
      var t1 = document.createTextNode(airplaneAirlineList[i]);
      s1.appendChild(t1);
      z1.appendChild(s1);
      document.getElementById(trList[i]).appendChild(z1);
    }
  }
