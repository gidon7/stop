/** @ */
var DataSet = function() {
	this.idx = -1;
	this.data = new Array(); //array
	this.row = new Array(); //map
}
DataSet.prototype.addRow = function(map) {
	this.data.push(map ? map : new Array());
	this.idx++;
	this.row = this.data[this.idx];
}
DataSet.prototype.getRow = function() {
	return this.row;
}
DataSet.prototype.put = function(name, value) {
	this.row[name] = value;
}
DataSet.prototype.getInt = function(name) {
	return this.row[name] ? parseInt(this.row[name]) : 0;
}
DataSet.prototype.getString = function(name) {
	return this.row[name] ? ("" + this.row[name]) : "";
}
DataSet.prototype.next = function() {
	this.idx++;
	this.row = this.data[this.idx];
	return this.row ? true : false;
}
DataSet.prototype.first = function() {
	this.idx = -1;
}
DataSet.prototype.last = function() {
	this.idx = this.size() - 1;
}
DataSet.prototype.size = function() {
	return this.data.length;
}
DataSet.prototype.p = function(element) {
	var s = "";
	for(var i in element) {
		if(element[i]) s += i + "=" + element[i] + "\n";
	}
	alert(s);
}



/** @ */
var MColor = function() {}
MColor.prototype.colorset = function(color, depth) {
	color = color.replace("#", "");
	var r = this.hexdec(color.substring(0, 2)) + depth;
	var g = this.hexdec(color.substring(2, 4)) + depth;
	var b = this.hexdec(color.substring(4, 6)) + depth;

	if(r < 0) r = 0; if(g < 0) g = 0; if(b < 0) b = 0;
	if(r > 255) r = 255; if(g > 255) g = 255; if(b > 255) b = 255;
	return this.hexpatch(this.dechex(r)) + this.hexpatch(this.dechex(g)) + this.hexpatch(this.dechex(b));
}
MColor.prototype.dechex = function(dec){
	if(dec < 0) dec = 0xFFFFFFFF + dec + 1;
	return parseInt(dec, 10).toString(16);
}
MColor.prototype.hexdec = function(hex){
	hex = (hex + "").replace(/[^a-f0-9]/gi, "");
	return parseInt(hex, 16);
}
MColor.prototype.hexpatch = function(hex) {
	return hex.length < 2 ? hex + hex : hex;
}
