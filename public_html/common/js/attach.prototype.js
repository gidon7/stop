var MAttach = function() {
	this.elements = new Array();
	this.img = "../html/images/btn/btn_add.gif";
	this.boxClass = "txt";
	this.btnClass = "";
	this.btnMarginLeft = 4;
	this.noUseClassName = "NoImage";
	this.isChrome = navigator.userAgent.indexOf("Chrome") != -1;
	this.IE6 = /compatible; MSIE 6.0/.test(navigator.userAgent);
}
MAttach.prototype.start = function() {
	this.findFileElement();
	var x = this;
	if(window.addEventListener) window.addEventListener("load", function() { x.convert(); }, false);
	else if(window.attachEvent) window.attachEvent("onload", function() { x.convert(); });
}
MAttach.prototype.findFileElement = function() {
	var inputs = document.getElementsByTagName("input");
	for(var i=0; i<inputs.length; i++) {
		if(inputs[i].type == "file" && inputs[i].className.indexOf(this.noUseClassName) == -1) {
			this.elements.push(inputs[i]);
		}
	}
}
MAttach.prototype.convert = function() {
	for(var i=0; i<this.elements.length; i++) {
		var parentNode = this.elements[i].parentNode;
		var next = this.elements[i].nextSibling;
		var width = this.elements[i].offsetWidth;
		var el = parentNode.removeChild(this.elements[i]);

		var container = document.createElement("div");
		container.style.position = "relative";

		var showArea = document.createElement("div");

		var hideArea = document.createElement("div");
		hideArea.style.position = "absolute";
		hideArea.style.top = "0px";
		hideArea.style.left = "0px";

		var box = document.createElement("input");
		box.className = this.boxClass;

		var btn = document.createElement("img");
		var url = this.elements[i].getAttribute("img");
		btn.src = url ? url : this.img;
		btn.className = this.btnClass;
		btn.style.marginLeft = this.btnMarginLeft + "px";
		btn.style.verticalAlign = (this.IE6 ? -1 : -4) + "px";
		hideArea.appendChild(el);
		showArea.appendChild(box);
		showArea.appendChild(btn);
		container.appendChild(showArea);
		container.appendChild(hideArea);

		el.style.filter = "alpha(opacity=0)";
		el.style.opacity = "0";
		el.onchange = function() {
			this.parentNode.parentNode.getElementsByTagName("input")[0].value = this.value;
		}
		parentNode.insertBefore(container, next);

		var btnWidth = this.isChrome ? 60 : btn.offsetWidth;

		box.style.width = (width - btnWidth - parseInt(this.btnMarginLeft) - 5) + "px";
		hideArea.style.width = (box.offsetWidth + btnWidth + parseInt(this.btnMarginLeft)) + "px";
		hideArea.style.textAlign = "right";

		this.elements[i].style.height = box.offsetHeight + "px";
	}
}

/* ex1)
<script src="../html/js/attach.prototype.js"></script>
<script>
var attach = new MAttach();
//attach.img = "../html/images/btn/btn_add.gif"; or <input type="file" name="xxx" img="../html/images/btn/btn_add.gif" size="60">
//attach.boxClass = "txt";
//attach.btnClass = "btn";
//attach.btnMarginLeft = 4;
//attach.noUseClassName = "NoImage";
attach.start();
</script>
*/

/* ex2)
<script src="../html/js/attach.prototype.js"></script>
<script>new MAttach().start();</script>
*/