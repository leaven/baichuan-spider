var request = require('request');

var sites = require('../conf/sites.js');
var templates = require('../templates/');

var siteTemplates = {
	'alloyteam': templates.alloyteam,
	'taobaofed': templates.taobaofed,
	'qianduanwaikan': templates.waikan,
	'xitu': templates.xitu
}

sites.forEach(function(v, k) {
	siteTemplates[v.site].request(v);
})

