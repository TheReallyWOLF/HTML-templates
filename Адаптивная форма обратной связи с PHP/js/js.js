var form;
function checkForm(){
	var exit=true;
	form = document.forms.myForm
	for (var i = 0; i < form.elements.length-2; i++){
		if (form.elements[i].value=="") {
			form.elements[i].style.border = "2px solid red";
			alert("Ошибка в поле "+ document.forms.myForm.elements[i].placeholder);
			exit=false;
			}else form.elements[i].style.border = "";
		}
		if (exit) {
			console.log("Отправка формы")
			}
	setTimeout(free, 2000);
}

function free(){
	for (var i = 0; i < form.elements.length-2; i++){
	form.elements[i].style.borderColor = "#999";
	}
}