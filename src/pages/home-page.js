const { Page, layout, text, button } = require('larana-js')

const { header, snowflakes } = require('../components')

class HomePage extends Page {
	title() {
		return 'Happy New Year!'
	}

	generateFlakes(count) {

		const flakes = []

		for (let i = 0; i < count; i++) {
			flakes.push({
				x: 1920 * Math.random(),
				y: i * -25,
				swingD: 100 * Math.random() > 50 ? 1 : -1,
				swing: 5 * Math.random(),
				alpha: 255 * Math.random(),
				alphaD: 100 * Math.random() > 50 ? 1 : -1,
			})
		}

		return flakes
	}

	init() {
		const { initState } = this.useState()

		const count = 64

		initState({
			count,
			speed: 2,
			delay: 32,
			swing: 30,
			minAlpha: 30,
			maxAlpha: 255,
			flakes: this.generateFlakes(count),
		})
	}

	increment(model) {
		const { state, setState } = this.useState()
		const value = state[model] + 1

		setState({
			[model]: value,
		})

		if (model === 'count') {
			setState({
				flakes: this.generateFlakes(value)
			})
		}
	}

	decrement(model) {
		const { state, setState } = this.useState()
		const value = state[model] - 1

		setState({
			[model]: value,
		})

		if (model === 'count') {
			setState({
				flakes: this.generateFlakes(value)
			})
		}
	}

	root() {
		const controlRow = ({ model }) => {
			return layout({
				style: ['row', 'gap_3', 'hug'],
				children: [
					text({ value: model }),
					button({ text: '-', onClick: () => this.decrement(model) }),
					text({ model }),
					button({ text: '+', onClick: () => this.increment(model) }),
				]
			})
		}

		return layout({
			style: ['body', 'column'],
			children: [
				header({}),
				layout({
					style: {
						size: 9,
						padding: 'var:u2',
						gap: 'var:u2',
						direction: 'column',
					},
					children: [
						controlRow({ model: 'count' }),
						controlRow({ model: 'swing' }),
						controlRow({ model: 'minAlpha' }),
						controlRow({ model: 'maxAlpha' }),
						controlRow({ model: 'speed' }),
						controlRow({ model: 'delay' }),
					],
				}),
				snowflakes({}),
			],
		})
	}
}

module.exports = { HomePage }
