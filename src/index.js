import './index.css';
require("jquery");
import 'jquery-ui/autocomplete';
import 'jquery-ui/button';
import 'jquery-ui-css/all.css';

/**
 * @typedef {Object} UpDogEntry
 * @property {String} name
 * @property {String} url
 */

/** @type {UpDogEntry[]} **/
const json = require('../data.json');

let map = {};
let names = [];

const getUrl = name => map[name.toLowerCase()];

const openChangeLog = name => {
	const url = getUrl(name);
	return url && window.open(url, '_blank');
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

$("#button")
	.button()
	.click(function () {
		openChangeLog($("#autocomplete").val());
	});