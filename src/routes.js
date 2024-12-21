const { NotFoundPage, HomePage } = require('./pages')

const routes = [
	{ path: '/', name: 'home', page: HomePage },
	{ path: '404', name: 'not-found', page: NotFoundPage },
]

module.exports = { routes }
