const { element_type } = require("../elements");

module.exports = {
	skill: {
		basic_attack:
			[
				{ level: 12, stage: 1,
					element_type: element_type.electric, ability_multiplier: 0.657 },
				{ level: 12, stage: 2,
					element_type: element_type.electric, ability_multiplier: 1.249 },
				{ level: 12, stage: 3,
					element_type: element_type.electric, ability_multiplier: 1.604 },
				{ level: 12, stage: 4,
					element_type: element_type.electric, ability_multiplier: 0.806 },
				{ level: 12, stage: 5,
					element_type: element_type.electric, ability_multiplier: 3.096 },
				{ level: 12, stage: 6,
					element_type: element_type.electric, ability_multiplier: 2.97 },
			],
		basic_attack_charge:
			[
				{ level: 12, stage: 1,
					element_type: element_type.electric, ability_multiplier: 0 },
			],
		ex_special:
			[
				// цирковой приём
				{ level: 12, stage: 1,
					element_type: element_type.electric, ability_multiplier: 7.602 },
				// 3 электро болта + белая молния
				{ level: 12, stage: 2,
					element_type: element_type.electric, ability_multiplier: (0.87 * 3) + 3.344 },
			],
		chain_attack:
			[
				{ level: 12, stage: 1,
					element_type: element_type.electric, ability_multiplier: 11.281 },
			],
		ultimate:
			[
				{ level: 12, stage: 1,
					element_type: element_type.electric, ability_multiplier: 34.707 },
			],
	},
}
