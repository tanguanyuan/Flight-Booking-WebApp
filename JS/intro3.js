function openHTML()
{
  setTimeout("go('mainPage.html')", 2000);
}

function go(url)
{
  location.href= url;
}

window.onload = function(){openHTML()};
