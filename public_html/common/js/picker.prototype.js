(new Image()).src = "/sysop/html/images/admin/btn/btn_x.gif";

var MPicker = function(name) {
	this.obj = name;
	this.id = "";
	this.names = new Array();
	this.delMsg = "";
	this.formName = "form1";
	this.ulClass = "";
	this.liClass = "";
	this.sep = " , ";
	this.removeMsg = "";

	this.hideArea = document.createElement("div");
	this.hideArea.style.display = "none";
	this.hideArea.id = this.id + "_HIDE";
	document.forms[this.formName].appendChild(this.hideArea);
}
MPicker.prototype.display = function(txt) {
	var names = document.getElementsByName(this.names[0]);
	var values = document.getElementsByName(this.names[1]);

	var arr = new Array();
	for(var i=0; i<names.length; i++) {
		arr.push(values[i].value + ' <a href="javascript:' + this.obj + '.remove(\'' + names[i].value + '\')"><img src="/sysop/html/images/admin/btn/btn_x.gif" style="vertical-align:-2px;"></a>');
	}
	document.getElementById(this.id).innerHTML = arr.length > 0 ? arr.join(this.sep) : (txt ? txt : "");
}
MPicker.prototype.remove = function(id) {
	if(this.delMsg != "" && !confirm(this.delMsg)) return;
	var names = document.getElementsByName(this.names[0]);
	var values = document.getElementsByName(this.names[1]);
	for(var i=0; i<names.length; i++) {
		if(names[i].value == id) {
			names[i].parentNode.removeChild(names[i]);
			values[i].parentNode.removeChild(values[i]);
		}
	}
	this.display(this.removeMsg);
}
MPicker.prototype.set = function(id, value) {
    var elements = document.getElementsByName(this.names[0]);
    for(var i=0; i<elements.length; i++) {
        if(elements[i].value == id) return false;
    }

    //Quirks mode patch
    var tmp = document.createElement("input");
    tmp.type = "hidden";
    tmp.name = "____tmp____";
    document.body.appendChild(tmp);

    if(document.getElementsByName("____tmp____").length == 0) {
        var nameElement = document.createElement("<input type='hidden' name='" + this.names[0] + "' value='" + id + "'>");
        var valueElement = document.createElement("<input type='hidden' name='" + this.names[1] + "' value='" + value + "'>");
        this.hideArea.appendChild(nameElement);
        this.hideArea.appendChild(valueElement);
    } else {
        var nameElement = document.createElement("input");
        nameElement.name = this.names[0];
        nameElement.type = "hidden";
        nameElement.value = id;
        this.hideArea.appendChild(nameElement);

        var valueElement = document.createElement("input");
        valueElement.name = this.names[1];
        valueElement.type = "hidden";
        valueElement.value = value;
        this.hideArea.appendChild(valueElement);
    }

    document.body.removeChild(tmp);

    return true;
}

/*
ex)
<div id="bookArea"></div>
<script language="javascript" src="../html/js/picker.prototype.js"></script>
<script>
addEvent("onload", init);
var picker;
function init() {
	picker = new MPicker("picker");
	picker.id = "bookArea";
	picker.names = new Array("book_id", "book_name");
	picker.delMsg = "삭제하시겠습니까?";
//	picker.formName = "form1";

	<!-- LOOP START 'books' -->
	picker.set("{{books.id}}", "{{books.name}}");
	<!-- LOOP END 'books' -->

	<!-- IF START 'modify' -->
	picker.display();
	<!-- IF END 'modify' -->
}
</script>
*/