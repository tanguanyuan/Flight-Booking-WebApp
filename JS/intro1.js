function openHTML()
{
  setTimeout("go('intro2.html')", 2000);
}

function go(url)
{
  location.href= url;
}

window.onload = function(){openHTML()};
