var cheerio = require('cheerio');
var request = require('request');
var blogDao = require('../dao/blogpost/blogDao.js');
var siteDao = require('../dao/site/siteDao.js');
var metaSort = require('../utils/metaSort.js');

// module.exports = function(body, url) {
// 	var $ = cheerio.load(body);
// 	$('.hentry').each(function(v, i) {

// 	});
// }

module.exports = {
	request: function(site) {
		this.site = site;
		this.getPageSize(site.url);
	},
	getPageSize: function(url) {
		request(url, function(err, response, body) {
			this.parseData(body);
		}.bind(this));	
	},
	parseData: function(body) {
		var data = JSON.parse(body),
			breakFlag = false,
			me = this;
		try{
			data.forEach(function(d, i) {
				var url = 'https://zhuanlan.zhihu.com'+d.url;
				if(!breakFlag) {
					blogDao.selectByUrl(url, function(err, res) {
						if(err) {
							throw err;
						}else if(!err && res.length == 0) {
							var	title = d.title;
							//分类别
							var sort = metaSort(title);
							var contents = {
								url: url,
								title: title,
								brief: '',
								post_date: new Date(d.publishedTime),
								site: '前端外刊评论',
								tag: sort.tag.join(','),
								meta: sort.meta.join(',')
							};
							blogDao.add(contents);
						}else {
							console.log('already exist!');
							breakFlag = true;
						}
					}.bind(this));
				}
			});
		}catch(e) {
			console.log(e);
		}
		console.log('成功插入'+data.length+"条数据");
	}
}