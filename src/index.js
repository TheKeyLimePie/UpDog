import './index.css';
require("jquery");
import 'jquery-ui/autocomplete';
import 'jquery-ui/button';
import 'jquery-ui-css/all.css';

const json = require('./data.json');

//require("jquery-ui.theme.css");

var map = new Object();
var names = new Array();

function getUrl(name) {
	return map[name.toLowerCase()];
}

function openChangeLog(name) {
	let url = getUrl(name);
	if (url) {
		window.open(url, '_blank');
	}
}

json
	.map(e => e.name)
	.forEach(name => names.push(name));

json.forEach(e => map[e.name.toLowerCase()] = e.url);

$("#autocomplete").autocomplete({
	source: function (given, callback) {
		let term = given.term.trim().toLowerCase();
		callback (names.filter(name => name.toLowerCase().search(term) > -1));
	},
	select: function (event, ui) {
		openChangeLog(ui.item.value);
	}
});

$("#button").button();
$("#button").click(function () {
	openChangeLog($("#autocomplete").val());
});