var cheerio = require('cheerio');
var request = require('request');
var blogDao = require('../dao/blogpost/blogDao.js');
var siteDao = require('../dao/site/siteDao.js');
var metaSort = require('../utils/metaSort.js');


module.exports  = {
	request: function(site) {
		this.site = site;
		this.getPageSize(site.pageTemplate);
	},
	getPageSize: function(url) {
		request({
			url: url,
			headers: {
				'X-LC-Id': 'mhke0kuv33myn4t4ghuid4oq2hjj12li374hvcif202y5bm6',
				'X-LC-Session': 'rqb59saxwwo6al9msyj023ycw',
				'X-LC-Sign': 'c11ec13fe1c23eacc29aa08114a3fdd0,1471928528039',
				'X-LC-UA': 'AV/js1.2.1'
			}
		}, function(err, response, body) {
			if(err) {
				console.log(err);
				return;
			}
			this.parseData(body);
		}.bind(this));	
	},
	parseData: function(body) {
		var data = JSON.parse(body).results,
			breakFlag = false;
			
		data.forEach(function(d, i) {
			var url = d.url;
			if(!breakFlag) {
				blogDao.selectByUrl(url, function(err, res) {
					if(err) {
						throw err;
					}else if(!err && res.length == 0) {
						var	title = d.title;
						//分类别
						var sort = metaSort(d.content);
						var contents = {
							url: url,
							title: title,
							brief: d.content,
							post_date: new Date(d.updatedAt),
							site: '稀土掘金',
							tag: sort.tag.join(','),
							meta: sort.meta.join(',')
						};
						blogDao.add(contents);
					}else {
						breakFlag = true;
					}
				}.bind(this));
			}
		});
		console.log('成功插入'+data.length+"条数据");
	}
}