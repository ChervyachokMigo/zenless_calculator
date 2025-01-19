const { set_stats, get_stats, set_stats_effect } = require("./tools/atacker_stats");

const set_agent = require("./tools/set_agent");

const { set_target } = require("./tools/target");

const { levels_12 } = require("./consts/skill_levels_preset");
const { compare_results } = require("./tools/results");
const calc_agent = require("./calc_agent");
const set_status_effects = require("./tools/set_status_effects");
const get_agent_stats = require("./tools/get_agent_stats");
const { sadgod_1 } = require("./presets");

set_target('hati', 70);

sadgod_1();

// set_agent({ 
// 	name: 'miyabi', 
// 	mindscape: 2, 
// 	skill_levels: levels_12,
// 	ATK: 3608,
// 	crit_chance: 0.602,
// 	crit_damage: 1.14,
// 	//crit_mode:crit_mode.force,
// 	//crit_mode:crit_mode.none,
// 	atribute_bonus_damage: {
//         frost: 0.3
//     }
// });

set_agent({ 
	name: 'miyabi', 
	mindscape: 2, 
	skill_levels: levels_12,
	ATK: 3551,
	crit_chance: 0.554,
	crit_damage: 1.284,
	//crit_mode:crit_mode.force,
	//crit_mode:crit_mode.none,
	atribute_bonus_damage: {
        frost: 0.3	//5 слот оружия
    }
});


set_stats_effect({
	crit_chance: 0.12, //бонус после раскалывания
	crit_damage: 0.8, //сигна 50%, сэт 30%
	atribute_bonus_damage: {
		frost: 0.4	//2 стака с Ешки по 20%
	}
});

// set_stats_effect({ 
// 	crit_chance: 0.15 + 0.12,
// 	crit_damage: 0.80,
// 	ATK: 0
// });

calc_agent();

//const res_1 = atribute_damage.calc(target_stats);

//console.log(res_1)

 //const result_1 = calculate_skill_damage(target_stats);
 //console.log(result_1)
 //print_result(result_1);

compare_results();