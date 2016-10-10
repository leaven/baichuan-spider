var cheerio = require('cheerio');
var request = require('request');
var blogDao = require('../dao/blogpost/blogDao.js');
var siteDao = require('../dao/site/siteDao.js');
var metaSort = require('../utils/metaSort.js');


module.exports = {
	request: function(site) {
		this.site = site;
		this.getPageSize(site.url);
	},
	getPageSize: function(url) {
		request(url, function(err, response, body) {
			var $ = cheerio.load(body);
			var ps = $('.pagenavi .page-numbers').eq(-2).text() || 1;
			this.getPageContent(ps);
		}.bind(this));	
	},
	getPageContent: function(ps) {
		for(var i = 1; i <= ps; i++) {
			request(this.site.pageTemplate({'page': i}), function(err, response, body) {
				this.parseHTML(body);
			}.bind(this))
		}
	},
	parseHTML: function(body) {
		var $ = cheerio.load(body),
			breakFlag = false;
		//提取信息
		$('.articlemenu').each(function(i, item) {
			var $blogPost = $(this).find('.blogTitle'),
				title = $blogPost.text(),
				url = $blogPost.attr('href');
				
			if(!breakFlag) {
				blogDao.selectByUrl(url, function(err, res) {
					if(!err && res.length == 0) {
						//分类别
						var sort = metaSort(title);
						var contents = {
							url: url,
							title: title,
							brief: $(this).find('.text').text().replace(/[\r\n\t]/g, '').replace(/<([a-zA-Z]+)>.*<\/[a-zA-Z]+>/g, ''),
							post_date: $(this).find('.blogPs').text().replace(/.*\b(\d+)年(\d+)月(\d+)日.*/,'$1-$2-$3'),
							site: 'alloyteam',
							tag: sort.tag.join(','),
							meta: sort.meta.join(',')
						}
						blogDao.add(contents);
					}else {
						console.log('already exist!');
						breakFlag = true;
					}
				}.bind(this));
			}
		});
		console.log('成功插入'+$('.articlemenu').length+"条数据");
	}
}
