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
			var ps = $('#page-nav .page-number').eq(-1).text() || 1;
			this.getPageContent(ps);
		}.bind(this));	
	},
	getPageContent: function(ps) {
		for(var i = 1; i <= ps; i++) {
			var url; 
		
			if(i == 1) {
				url = this.site.url;
			}else {
				url = this.site.pageTemplate({'page': i});
			}
			request(url, function(err, response, body) {
				this.parseHTML(body);
			}.bind(this))
		}
	},
	parseHTML: function(body) {
		var $ = cheerio.load(body),
			breakFlag = false;
		try{
			$('.article').each(function(i, item) {
				var url = 'http://taobaofed.org'+$(this).find('.thumbnail').attr('href');
				if(!breakFlag) {
					blogDao.selectByUrl(url, function(err, res) {
						if(err) {
							throw err;
						}else if(!err && res.length == 0) {
							var	title = $(this).find('.title').text();
							//分类别
							var sort = metaSort(title);
							var contents = {
								url: url,
								title: title,
								brief: $(this).find('.article-excerpt').text().replace(/[\r\n\t]/g, '').replace(/<([a-zA-Z]+)>.*<\/[a-zA-Z]+>/g, ''),
								post_date: $(this).find('.date time').text(),
								site: 'taobaofed',
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
		console.log('成功插入'+$('.articlemenu').length+"条数据");
	}
}