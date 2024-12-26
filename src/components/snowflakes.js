const {
	BaseComponent,
	figure,
	line,
	point,
} = require('larana-js')

const snowflake = ({
		x,
		y,
		radius = 20,
		alpha,
		width = 2,
	}) => {
	const halfRadius = radius / 2

	let a = alpha.toString(16)
	if (a.length === 1) {
		a = '0' + a
	}

	return {
		to: (queue) => {
			const params = {
				borderColor: '#aaaaff' + a,
				borderWidth: width,
			}

			line({
				...params,
				points: [
					point({ x: x - halfRadius, y: y - halfRadius }),
					point({ x: x + halfRadius, y: y + halfRadius }),
					point({ x: x + halfRadius, y: y - halfRadius, moveTo: true }),
					point({ x: x - halfRadius, y: y + halfRadius }),
					point({ x: x + halfRadius, y, moveTo: true }),
					point({ x: x - halfRadius, y }),
					point({ x, y: y - halfRadius, moveTo: true }),
					point({ x, y: y + halfRadius }),
				],
			}).to(queue)
		},
	}
}

class SnowflakesFigure extends BaseComponent {
	update() {
		const { h, w } = this.useResolution()
		const { state, setState } = this.useState()

		const flakes = state.flakes.map((f) => {
			const flake = {
				...f,
				x: f.x,
				y: f.y + state.speed,
				swing: f.swing + f.swingD,
				alpha: f.alpha + f.alphaD,
			}

			if (flake.swing >= state.swing) {
				flake.swingD = -1
			}
			if (flake.swing <= state.swing * -1) {
				flake.swingD = 1
			}

			if (flake.alpha >= state.maxAlpha) {
				flake.alpha = state.maxAlpha
				flake.alphaD = -1
			}
			if (flake.alpha <= state.minAlpha) {
				flake.alpha = state.minAlpha
				flake.alphaD = 1
			}

			if (flake.y > h + 20) {
				flake.y = 0
				flake.x = w * Math.random()
			}

			return flake
		})

		setTimeout(() => {
			setState({ flakes })
		}, state.delay)
	}

	template(_, queue) {
		const { state } = this.useState()

		state.flakes.forEach((f) => {
			snowflake({
				...f,
				x: f.x + f.swing,
			}).to(queue)
		})
		this.update()
	}

	root() {
		return figure({
			style: {
				width: 0,
				height: 0,
			},
			template: (fig, queue) => {
				this.template(fig, queue)
			},
		})
	}
}

const snowflakes = (options) => {
	return new SnowflakesFigure(options)
}

module.exports = { SnowflakesFigure, snowflakes }
