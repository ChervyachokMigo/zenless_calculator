const { set_stats, get_stats, set_stats_effect } = require("./tools/atacker_stats");

const set_agent = require("./tools/set_agent");

const { set_target } = require("./tools/target");

const { levels_12 } = require("./consts/skill_levels_preset");
const { compare_results } = require("./tools/results");
const calc_agent = require("./calc_agent");
const set_status_effects = require("./tools/set_status_effects");
const get_agent_stats = require("./tools/get_agent_stats");
const { sadgod_1, sadgod_2_anby } = require("./presets");
const { start_webserver } = require("./webserver/web_server");

// set_target('hati', 70);

// sadgod_2_anby();

// set_agent({ 
// 	name: 'solder_0_anby', 
// 	mindscape: 1, 
// 	skill_levels: levels_12,
// 	ATK: 2943,
// 	crit_chance: 0.698,
// 	crit_damage: 1.364,
// 	PEN: 45,
// 	//RES_ignore: 0.18,
// 	//crit_mode:crit_mode.force,
// 	//crit_mode:crit_mode.none,
// 	atribute_bonus_damage: {
// 		electric: 0.4
// 	}
// });


// set_stats_effect({
// 	ATK: 1365,
// 	crit_chance: 0.22 + 0.2, 		
// 	crit_damage: 0.6 + 0.4,		
// 	atribute_bonus_damage: {
// 		electric: (0.2 + 0.25)
// 	}
// });

// calc_agent();

// compare_results();



start_webserver();



//const res_1 = atribute_damage.calc(target_stats);

//console.log(res_1)

 //const result_1 = calculate_skill_damage(target_stats);
 //console.log(result_1)
 //print_result(result_1);
