var _ = require('lodash');
module.exports = [
	{
		url: 'http://www.alloyteam.com',
		pageTemplate: _.template('http://www.alloyteam.com/page/<%=page%>/'),
		site: 'alloyteam'
	},
	{
		url: 'http://taobaofed.org',
		pageTemplate: _.template('http://taobaofed.org/page/<%=page%>/'),
		site: 'taobaofed'
	},
	{
		url: 'https://zhuanlan.zhihu.com/api/columns/FrontendMagazine/posts?limit=100',
		site: 'qianduanwaikan'
	},
	{
		url: 'http://gold.xitu.io/',
		pageTemplate: 'https://api.leancloud.cn/1.1/classes/Entry?&where=%7B%22%24or%22%3A%5B%7B%22tags%22%3A%7B%22%24in%22%3A%5B%7B%22__type%22%3A%22Pointer%22%2C%22className%22%3A%22Tag%22%2C%22objectId%22%3A%225597a05ae4b08a686ce56f6f%22%7D%2C%7B%22__type%22%3A%22Pointer%22%2C%22className%22%3A%22Tag%22%2C%22objectId%22%3A%225597a063e4b08a686ce57030%22%7D%2C%7B%22__type%22%3A%22Pointer%22%2C%22className%22%3A%22Tag%22%2C%22objectId%22%3A%22555e9a77e4b00c57d9955d64%22%7D%2C%7B%22__type%22%3A%22Pointer%22%2C%22className%22%3A%22Tag%22%2C%22objectId%22%3A%2255964d83e4b08a686cc6b353%22%7D%2C%7B%22__type%22%3A%22Pointer%22%2C%22className%22%3A%22Tag%22%2C%22objectId%22%3A%22555e99ffe4b00c57d99556aa%22%7D%2C%7B%22__type%22%3A%22Pointer%22%2C%22className%22%3A%22Tag%22%2C%22objectId%22%3A%2255e325a100b0ded317d2f846%22%7D%2C%7B%22__type%22%3A%22Pointer%22%2C%22className%22%3A%22Tag%22%2C%22objectId%22%3A%225597a04de4b08a686ce56e63%22%7D%2C%7B%22__type%22%3A%22Pointer%22%2C%22className%22%3A%22Tag%22%2C%22objectId%22%3A%2255978433e4b0c4d3e6fddcb1%22%7D%2C%7B%22__type%22%3A%22Pointer%22%2C%22className%22%3A%22Tag%22%2C%22objectId%22%3A%225597a602e4b08a686ce608d2%22%7D%2C%7B%22__type%22%3A%22Pointer%22%2C%22className%22%3A%22Tag%22%2C%22objectId%22%3A%225617d88960b2521f49db7220%22%7D%5D%7D%7D%2C%7B%22hot%22%3Atrue%7D%5D%7D&include=user&limit=20&order=-rankIndex',
		site: 'xitu'
	}
]