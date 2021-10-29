function openHTML()
{
  setTimeout("go('intro3.html')", 2000);
}

function go(url)
{
  location.href= url;
}

window.onload = function(){openHTML()};
