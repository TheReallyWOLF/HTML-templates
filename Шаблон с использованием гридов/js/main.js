$(function(){

	$(".left-slider-buttons a").click(function(){
		var getId = this.id;
		var getCurrent = $(".left-slider-content." + getId);

		$(".left-slider-content").not(getCurrent).hide(500);
		getCurrent.show(500);
		return false;
	});

	$("#imgContainer img").click(function(){
		var src = $(this).attr('src');
		
		$("#bigImg").attr("src", src);
		return false;
	});
});

menu.onclick = function myFunction() {
	var x = document.getElementById('myTopnav')

	if(x.className === "main-nav"){
		x.className += " responsive";
	}else {
		x.className = "main-nav"
	}
}