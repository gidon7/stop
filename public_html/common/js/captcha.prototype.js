(new Image()).src = "../images/global/reload.gif";

var MGCaptcha = function(init) {
	this.objName = init['objName'];
	this.srcElement = init['srcElement'];
	this.tgtElement = init['tgtElement'];

	this.txtLength = init['txtLength'] ? init['txtLength'] : 8;
	this.reloadImg = init['reloadImg'] ? init['reloadImg'] : "../images/global/reload.gif";
	this.fontsize = init['fontsize'] ? init['fontsize'] : 22;
	this.fontcolor = init['fontcolor'] ? init['fontcolor'] : "#495265";
	this.fontfamily = init['fontfamily'] ? init['fontfamily'] : "tahoma, arial";
	this.padding = init['padding'] ? init['padding'] : 5;
	this.randItalic = init['randItalic'] ? init['randItalic'] : false;
	this.randColor = init['randColor'] ? init['randColor'] : false;
	this.border = init['border'] ? init['border'] : "1px solid #A4ACBD";
	this.backgroundColor = init['backgroundColor'] ? init['backgroundColor'] : "";
	this.background = init['background'] ? init['background'] : "";
	this.txtType = init['txtType'] ? init['txtType'] : "number,az,AZ";

	this.tgtId = this.tgtElement.getAttribute("id");
	this.container = null;
	this.cmpName = this.srcElement.getAttribute("name") + "_captcha";
	this.cmpElement = null;

	this.draw(this.getData());
	this.callbackDraw = init['callbackDraw'] ? init['callbackDraw'] : "";
}

MGCaptcha.prototype.rand = function(range) {
	return range[0] + (Math.round(Math.random() * (range[1] - range[0])));
}
MGCaptcha.prototype.getData = function() {
	var ascii = new Array();
	var types = this.txtType.replace(/ +/g, "").split(",");
	for(var i=0; i<types.length; i++){
		if(types[i] == "number") ascii.push(new Array(48, 57));
		else if(types[i] == "az") ascii.push(new Array(97, 122));
		else if(types[i] == "AZ") ascii.push(new Array(65, 90));
	}
	var colors = new Array(
		"#FF0000"
		, "#FF8000"
		, "#DBDB00"
		, "#00B700"
		, "#004080"
		, "#8000FF"
		, "#800000"
	);

	var result = new Array();
	for(var i=0; i<this.txtLength; i++) {
		var color = this.rand(new Array(1, 10));
		var italic = this.rand(new Array(1, 3));
		result.push(
			(this.randItalic && italic == 1 ? "<i>" : "") 
			+ (this.randColor ? "<font style='color:" + (colors[color] ? colors[color] : this.fontcolor) + "'>" : "")
			+ String.fromCharCode(this.rand(ascii[this.rand(new Array(0, ascii.length - 1))])) + "</i>"
			+ (this.randColor ? "</font>" : "")
			+ (this.randItalic && italic == 1 ? "</i>" : "") 
		);
	}

	this.compareElement(result.join(""));

	return result;
}
MGCaptcha.prototype.compareElement = function(value) {
	this.findContainer();
	if(this.container) {
		this.cmpElement = this.container[this.cmpName];
		if(!this.cmpElement) {
			var input = document.createElement("input");
			input.type = "hidden";
			input.setAttribute("name", this.cmpName);
			this.container.appendChild(input);
			this.cmpElement = input;
		}
		this.cmpElement.value = this.stripTags(value);
	}
}
MGCaptcha.prototype.test = function() {
	return this.cmpElement ? this.cmpElement.value && this.cmpElement.value == this.srcElement.value : false;
}
MGCaptcha.prototype.stripTags = function(str) {
	return str.replace(/<\/?[^>]+>/gi, '');
}
MGCaptcha.prototype.draw = function(data) {
	if(!data) data = this.getData();

	var capt = document.createElement("div");
	capt.innerHTML = data.join("");
	capt.style.float = "left";
	capt.style.styleFloat = "left";
	capt.style.cssFloat = "left";
	capt.style.fontSize = this.fontsize + "px";
	capt.style.fontWeight = "bold";
	capt.style.fontFamily = this.fontfamily;
	capt.style.color = this.fontcolor;
	capt.style.letterSpacing = "1px";

	var reload = document.createElement("div");
	var reloadGap = Math.round(this.fontsize / 5) + 2;
	reload.style.float = "left";
	reload.style.styleFloat = "left";
	reload.style.cssFloat = "left";
	reload.style.marginLeft = reloadGap + "px";
	reload.innerHTML = '<div><a href="javascript:' + this.objName + '.draw()"><img src="' + this.reloadImg + '" align="absmiddle" border="0" style="padding:0px; margin:0px;"></a></div>';

	var wrap = document.createElement("div");
	wrap.style.float = "left";
	wrap.style.styleFloat = "left";
	wrap.style.cssFloat = "left";
	wrap.style.position = "relative";
	wrap.style.border = this.border;
	wrap.style.padding = this.padding + "px";
	if(this.background) {
		wrap.style.background = this.background;
	} else if(this.backgroundColor) {
		wrap.style.backgroundColor = this.backgroundColor;
	}

	var obj = this;
	reload.getElementsByTagName("img")[0].onload = function() {
		if(capt.offsetHeight > reload.offsetHeight) {
			var mt = ((wrap.offsetHeight - obj.padding * 2) - reload.offsetHeight) / 2;
			this.parentNode.parentNode.style.marginTop = (mt <= 1 ? 0 : mt)+ "px";
		}
	}

	wrap.appendChild(capt);
	wrap.appendChild(reload);
	this.tgtElement.innerHTML = "";
	this.tgtElement.appendChild(wrap);

	var s = Math.round(this.fontsize / 5);
	if(s < 0) s = 3;
	if(s > 20) s = 20
	for(var i=s; i>=0; i--) {
		var lay = capt.cloneNode(true);
		lay.innerHTML = data.join("");
		lay.style.position = "absolute";
		lay.style.top = capt.offsetTop + i + "px";
		lay.style.left = capt.offsetLeft + i + "px";
		lay.style.color = this.fontcolor;
		lay.style.filter = "alpha(opacity=24)";
		lay.style.opacity = 0.24;
		wrap.appendChild(lay);
	}

	var cover = capt.cloneNode(true);
	cover.style.position = "absolute";
	cover.style.width = (capt.offsetWidth + this.padding * 1 + reloadGap) + "px";
	cover.style.height = (capt.offsetHeight + this.padding * 2) + "px";
	cover.style.top = "0px";
	cover.style.left = "0px";
	cover.style.filter = "alpha(opacity=0)";
	cover.style.opacity = 0;
	cover.style.backgroundColor = "#ffffff";
	cover.innerHTML = "";

	wrap.appendChild(cover);
	if(this.callbackDraw) eval(this.callbackDraw);
}
MGCaptcha.prototype.findContainer = function() {
	var obj = this.srcElement;
	if(obj.parentNode) {
		do {
			if(obj.tagName && obj.tagName.toLowerCase() == "form") {
				this.container = obj;
				break;
			}
		} while(obj = obj.parentNode);
	}
}
