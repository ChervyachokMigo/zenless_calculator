const { element_type } = require("../elements");

module.exports = {
	element_type: element_type.frost,
	effects: {
		mindscape: {
			first: {
				RES_ignore: 0.06,
				RES_ignore_times_max: 6
			},
			second: {
				damage_bonus: { 
					basic_attack_kadzuhana_multiplier: 0.3
				},
				crit_chance: 0.15
			}
		},

		ultimate: {
			frost_damage_multiplier: 0.3
		}
	},
	skill: {
		basic_attack:
			[
				{ level: 11, stage: 1,
					element_type: element_type.physical, ability_multiplier: 0.519 },
				{ level: 11, stage: 2,
					element_type: element_type.physical, ability_multiplier: 0.566 },
				{ level: 11, stage: 3,
					element_type: element_type.frost, ability_multiplier: 1.208 },
				{ level: 11, stage: 4,
					element_type: element_type.frost, ability_multiplier: 1.845 },
				{ level: 11, stage: 5,
					element_type: element_type.frost, ability_multiplier: 2.47 },

				{ level: 12, stage: 1,
					element_type: element_type.physical, ability_multiplier: 0.544 },
				{ level: 12, stage: 2,
					element_type: element_type.physical, ability_multiplier: 0.593 },
				{ level: 12, stage: 3,
					element_type: element_type.frost, ability_multiplier: 1.266 },
				{ level: 12, stage: 4,
					element_type: element_type.frost, ability_multiplier: 1.933 },
				{ level: 12, stage: 5,
					element_type: element_type.frost, ability_multiplier: 2.588 },

				{ level: 13, stage: 1,
					element_type: element_type.physical, ability_multiplier: 0.569 },
				{ level: 13, stage: 2,
					element_type: element_type.physical, ability_multiplier: 0.62 },
				{ level: 13, stage: 3,
					element_type: element_type.frost, ability_multiplier: 1.324 },
				{ level: 13, stage: 4,
					element_type: element_type.frost, ability_multiplier: 2.021 },
				{ level: 13, stage: 5,
					element_type: element_type.frost, ability_multiplier: 2.706 },

				{ level: 14, stage: 1,
					element_type: element_type.physical, ability_multiplier: 0.594 },
				{ level: 14, stage: 2,
					element_type: element_type.physical, ability_multiplier: 0.647 },
				{ level: 14, stage: 3,
					element_type: element_type.frost, ability_multiplier: 1.382 },
				{ level: 14, stage: 4,
					element_type: element_type.frost, ability_multiplier: 2.109 },
				{ level: 14, stage: 5,
					element_type: element_type.frost, ability_multiplier: 2.824 },
			],
		basic_attack_charge:
			[
				{ level: 11, stage: 1,
					element_type: element_type.frost, ability_multiplier: 8.687 },
				{ level: 11, stage: 2,
					element_type: element_type.frost, ability_multiplier: 16.391 },
				{ level: 11, stage: 3,
					element_type: element_type.frost, ability_multiplier: 40.881 },
				
				{ level: 12, stage: 1,
					element_type: element_type.frost, ability_multiplier: 9.101 },
				{ level: 12, stage: 2,
					element_type: element_type.frost, ability_multiplier: 17.172 },
				{ level: 12, stage: 3,
					element_type: element_type.frost, ability_multiplier: 42.828 },

				{ level: 14, stage: 1,
					element_type: element_type.frost, ability_multiplier: 9.929 },
				{ level: 14, stage: 2,
					element_type: element_type.frost, ability_multiplier: 18.734 },
				{ level: 14, stage: 3,
					element_type: element_type.frost, ability_multiplier: 46.722 },
			],
		ex_special:
			[
				{ level: 11, stage: 1,
					element_type: element_type.frost, ability_multiplier: 7.524 },
				{ level: 11, stage: 2,
					element_type: element_type.frost, ability_multiplier: 9.232 },

				{ level: 12, stage: 1,
					element_type: element_type.frost, ability_multiplier: 7.883 },
				{ level: 12, stage: 2,
					element_type: element_type.frost, ability_multiplier: 9.672 },

				{ level: 14, stage: 1,
					element_type: element_type.frost, ability_multiplier: 8.601 },
				{ level: 14, stage: 2,
					element_type: element_type.frost, ability_multiplier: 10.552 },
			],
		chain_attack:
			[
				{ level: 11, stage: 1,
					element_type: element_type.frost, ability_multiplier: 12.01 },
				{ level: 12, stage: 1,
					element_type: element_type.frost, ability_multiplier: 12.583 },
				{ level: 14, stage: 1,
					element_type: element_type.frost, ability_multiplier: 13.729 },
			],
		ultimate:
			[
				{ level: 11, stage: 1,
					element_type: element_type.frost, ability_multiplier: 45.59},
				{ level: 12, stage: 1,
					element_type: element_type.frost, ability_multiplier: 47.761 },
				{ level: 14, stage: 1,
					element_type: element_type.frost, ability_multiplier: 52.103 },
			],
	},
}
