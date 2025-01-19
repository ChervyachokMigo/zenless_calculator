const { set_stats } = require("./tools/atacker_stats");

const set_agent = require("./tools/set_agent");

const { set_target } = require("./tools/target");

const { levels_12 } = require("./consts/skill_levels_preset");
const { compare_results } = require("./tools/results");
const calc_agent = require("./calc_agent");

set_target('hati', 70);


set_stats({
	ATK: 2726,
	AP: 292,
	crit_chance: 0.674,
	crit_damage: 1.476,
	//crit_mode:crit_mode.force,
	//crit_mode:crit_mode.none,
	atribute_bonus_damage: {
        frost: 0.3
    }
});

set_agent({ name: 'miyabi', mindscape: 2, skill_levels: levels_12});

calc_agent();

set_stats({
	ATK: 3229,
	AP: 265,
	PEN: 100,
	crit_chance: 0.53,
	crit_damage: 1.572,
	//crit_mode:crit_mode.force,
	//crit_mode:crit_mode.none,
	atribute_bonus_damage: {
        frost: 0.3
    }
});

set_agent({ name: 'miyabi', mindscape: 2, skill_levels: levels_12});


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