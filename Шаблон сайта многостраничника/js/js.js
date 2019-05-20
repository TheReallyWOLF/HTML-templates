menu.onclick = function myFunction() {
	var x = document.getElementById('myTopnav');
	var y = document.getElementById("project");

	if (x.className === "topnav") {
		x.className += " responsive";
		y.style.marginTop = "300px";
	} else {
		x.className = "topnav";
		y.style.marginTop = "0px";
	}
}
