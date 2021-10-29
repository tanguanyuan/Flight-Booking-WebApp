function changeTitle()
{
  let titleRef= document.getElementById("Title")

  let checked = document.getElementById("switch-1").checked

  if (checked == true)
  {
    titleRef.innerHTML = "<center>Past Flights</center>"
  }
  else if (checked == false)
  {
    titleRef.innerHTML = "<center>Current / Scheduled Flights</center>"
  }

}
