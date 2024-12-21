const { Page, layout, text } = require('larana-js')

const { header } = require('../components')

class NotFoundPage extends Page {
	title() {
		return '404 | Page not found'
	}

	root({ w }) {
		return layout({
			style: ['body', 'column'],
			children: [
				header({}),
				layout({
					style: {
						direction: w > 1028 ? 'row' : 'column',
						size: 9,
						padding: 'var:u2',
						gap: 'var:u2',
					},
					children: [
						text({ value: '404', style: 'h1' }),
						text({ value: 'Go back to home', style: 'text' }),
					],
				}),
			],
		})
	}
}

module.exports = { NotFoundPage }
