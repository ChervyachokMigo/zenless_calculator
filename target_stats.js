const { readdirSync } = require('fs');

let target = null;

const _this = module.exports = {

	target_list: () => {
		return readdirSync('./enemies').map( v => v.replace('.js', ''));
	},

	set_target: (name, level, effects = {}) => {
		if (_this.target_list().indexOf(name) === -1) {
			throw new Error('unknown target');
		}

		const stats = require('./enemies/'+ name);
		let DEF = stats.DEF.find( v => v.level === level);
		if (!DEF) {
			throw new Error('DEF not found');
		}
		DEF = DEF.value;

		if (!effects.damage_taken_increase) {
			effects.damage_taken_increase = 0;
		}

		if (!effects.damage_taken_reduction) {
			effects.damage_taken_reduction = 0;
		}

		target =  {
			level,
			DEF,
			RES: stats.RES,
			RES_reduction: stats.RES_reduction,
			stun_multiplier: stats.stun_multiplier,
			...effects
		}
	},
	get_target: () => target,
}
