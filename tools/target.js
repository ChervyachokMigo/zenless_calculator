const { readdirSync } = require('fs');
const path = require('path');


let target = null;

const enemies_path = path.join( 'consts', 'enemies');

const _this = module.exports = {

	set_target: (name, level, effects = {}) => {
		const targets = readdirSync(enemies_path).map( v => v.replace('.js', ''));
		
		if (targets.indexOf(name) === -1) {
			throw new Error('unknown target');
		}

		const stats = require( path.join( '..', enemies_path, name ));
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
