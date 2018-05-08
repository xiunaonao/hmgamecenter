var deviceWidth = document.documentElement.clientWidth;
var deviceFontSize = (deviceWidth / 375) * 100;
document.querySelector("html").style.fontSize = deviceFontSize + 'px';