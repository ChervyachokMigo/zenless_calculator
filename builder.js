const crit_mode = require("./consts/crit_mode");
const { get_anomaly_type_multiplier, get_element_name_by_id } = require("./consts/elements");
const { get_target } = require("./tools/target");

const damage_types = {
	standart: 1,
	anomaly: 2
};

const level_factors = [
	null,
	// 1 - 10
	50, 54, 58, 62, 66,
	71, 76, 82, 88, 94,
	// 11 - 20
	100, 107, 114, 121, 129,
	137, 145, 153, 162, 172,
	// 21 - 30
	181, 191, 201, 211, 222,
	233, 245, 256, 268, 281,
	// 31 - 40
	293, 306, 319, 333, 347,
	361, 375, 390, 405, 421,
	// 41 - 50
	436, 452, 469, 485, 502, 
	519, 537, 555, 573, 592,
	// 51 - 60
	610, 629, 649, 669, 689,
	709, 730, 751, 772, 794
];

let debug = 0;
let is_debug = true;


const base_damage_calc = ( atacker_stats ) => {
	const ATK = atacker_stats.ATK;
	
	switch (atacker_stats.damage_type) {
		case damage_types.standart:
			const ability_multiplier = atacker_stats.ability_multiplier;
			return ATK * ability_multiplier;
			
        case damage_types.anomaly:
			const anomaly_multiplier = get_anomaly_type_multiplier(atacker_stats.element_type);
			return ATK * anomaly_multiplier;
	}
};

const defense_multiplier_calc = ( atacker_stats, target_stats ) => {
	const atacker_level_factor = level_factors[atacker_stats.level];
	return atacker_level_factor / 
		( Math.max(target_stats.DEF * (1 - atacker_stats.PEN_ratio) - atacker_stats.PEN, 0 ) + 
		atacker_level_factor );
};

const resistance_multiplier_calc = ( atacker_stats, target_stats ) => {
	let element_name = get_element_name_by_id(atacker_stats.element_type);

	const is_res_element = ( res_obj, name ) => {
		return Object.keys(res_obj).indexOf(name) > -1;
	}



	const RES = is_res_element( target_stats.RES, element_name ) ? target_stats.RES[element_name] : 0;
	const RES_reduction = is_res_element( target_stats.RES_reduction, element_name ) ? target_stats.RES_reduction[element_name] : 0;
	// 	console.log(
	// 	`Element: ${element_name}, RES: ${RES}, RES_reduction: ${RES_reduction}, RES_ignore: ${atacker_stats.RES_ignore}`
	// )
	const result = 1 - RES + RES_reduction + atacker_stats.RES_ignore;

    return result;
};

const damage_taken_multiplier_calc = ( target_stats ) => {
    return 1 + target_stats.damage_taken_increase - target_stats.damage_taken_reduction;
};

const anomaly_level_multiplier_calc = ( atacker_stats ) => {
	return 1 + 1/59 * (atacker_stats.level - 1);
};


module.exports = {
	damage_types,  
    level_factors,
    base_damage_calc,
    defense_multiplier_calc,
	resistance_multiplier_calc,
    damage_taken_multiplier_calc,
    anomaly_level_multiplier_calc,
    calculate_damage: ( atacker_stats ) => {
		if (debug == 0 || debug == 1 || debug == 12 || debug == 13 || debug == 3) {
			is_debug = true;
		} else {
			is_debug = false;
		}

		const target_stats = get_target();

		const base_damage = base_damage_calc( atacker_stats );

		const damage_bonus_multiplier = 1 + atacker_stats.total_damage_bonus;

		const defense_multiplier = defense_multiplier_calc( atacker_stats, target_stats );
		const resistance_multiplier = resistance_multiplier_calc( atacker_stats, target_stats );
		const damage_taken_multiplier = damage_taken_multiplier_calc( target_stats );	

		const anomaly_proficiency_multiplier = atacker_stats.AP * 0.01;
		const anomaly_level_multiplier = anomaly_level_multiplier_calc( atacker_stats );

		const stun_multiplier = atacker_stats.stun ? atacker_stats.stun_multiplier + target_stats.stun_multiplier : 1;
		
		switch (atacker_stats.damage_type) {
			
			case damage_types.standart:
				let crit_chance = 0;

				if (atacker_stats.crit_mode === crit_mode.none) {
					crit_chance = 0;
				} else if (atacker_stats.crit_mode === crit_mode.force) {
					crit_chance = 1;
				} else if (atacker_stats.crit_mode === crit_mode.average) {
					crit_chance = atacker_stats.crit_chance >= 1 ? 1 : atacker_stats.crit_chance;
				} else {
					throw new Error('unknown crit mode')
				}

				const crit_multiplier = 1 + (crit_chance * atacker_stats.crit_damage);

				const result = base_damage * 
					damage_bonus_multiplier * 
					crit_multiplier * 
					defense_multiplier * resistance_multiplier * 
					damage_taken_multiplier * 
					stun_multiplier;

				//log all
				
                    // console.log('base_damage:', base_damage);
                    // console.log('damage_bonus_multiplier:', damage_bonus_multiplier);
                    // console.log('defense_multiplier:', defense_multiplier);
                    // console.log('resistance_multiplier:', resistance_multiplier);
                    // console.log('damage_taken_multiplier:', damage_taken_multiplier);
                    // console.log('anomaly_proficiency_multiplier:', anomaly_proficiency_multiplier);
                    // console.log('anomaly_level_multiplier:', anomaly_level_multiplier);
                    // console.log('stun_multiplier:', stun_multiplier);
                    // console.log('result:', result);
                

				debug++;

				return result;

			case damage_types.anomaly:
				return base_damage * 
					anomaly_proficiency_multiplier * anomaly_level_multiplier * 
					damage_bonus_multiplier *
					defense_multiplier * resistance_multiplier * 
					damage_taken_multiplier * 
					stun_multiplier;

			default:
				throw new Error('unknown damage type');
		}

	},
};