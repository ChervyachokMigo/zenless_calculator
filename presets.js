const calc_agent = require("./calc_agent");
const { levels_12 } = require("./consts/skill_levels_preset");
const { set_stats_effect } = require("./tools/atacker_stats");
const set_agent = require("./tools/set_agent");

module.exports = {
	sadgod_1: () => {
		set_agent({ 
			name: 'miyabi', 
			mindscape: 2, 
			skill_levels: levels_12,
			ATK: 3551,
			crit_chance: 0.626,
			crit_damage: 1.284,
			//crit_mode:crit_mode.force,
			//crit_mode:crit_mode.none,
			atribute_bonus_damage: {
				frost: 0.3			//5 слот оружия
			}
		});

		set_stats_effect({
			crit_chance: 0.12, 		//бонус после раскалывания
			crit_damage: 0.8,		//сигна 50%, сэт 30%
			atribute_bonus_damage: {
				frost: 0.4			//2 стака с Ешки по 20%
			}
		});

		calc_agent();
	},

	sadgod_2_anby: () => {
		// set_agent({ 
		// 	name: 'solder_0_anby', 
		// 	mindscape: 1, 
		// 	skill_levels: levels_12,
		// 	ATK: 2912,
		// 	crit_chance: 0.554,
		// 	crit_damage: 2.004,
		// 	PEN: 36,
		// 	//RES_ignore: 0.18,
		// 	//crit_mode:crit_mode.force,
		// 	//crit_mode:crit_mode.none,
		// 	atribute_bonus_damage: {
		// 		electric: 0.3
		// 	}
		// });

		set_agent({ 
			name: 'solder_0_anby', 
			mindscape: 1, 
			skill_levels: levels_12,
			ATK: 3090,
			crit_chance: 0.53,
			crit_damage: 1.844,
			PEN: 18,
			//RES_ignore: 0.18,
			//crit_mode:crit_mode.force,
			//crit_mode:crit_mode.none,
			atribute_bonus_damage: {
				electric: (0.3 + 0.1)
			}
		});

		set_stats_effect({
			ATK: 1363,
			crit_chance: 0.22 + 0.2, 		
			crit_damage: 0.6 + 0.4,		
			atribute_bonus_damage: {
				electric: 0.45
			}
		});

		calc_agent();
	}
} 