const { set_stats, set_charge, set_stan, set_mindscape, set_agent, calculate_skills, set_skills_levels } = require("./atacker_stats");
const compare_damage = require("./compare_damage");
const crit_mode = require("./crit_mode");
const print_result = require("./print_result");
const { set_target } = require("./target_stats");

const target_stats = set_target('hati', 70);

//first atack
//1010
//3453

//second atack
//1101
//3764

//1.3 frost
//162+80% crit

//2969 atk




//sadgod
set_stats({
	level: 60,
	ATK: 2969,
	PEN_ratio: 0,
	PEN: 0,
	AP: 238,
	crit_mode: crit_mode.force,
	crit_chance: 0.61,
	crit_damage: 2.42,
	total_damage_bonus: 0,
	atribute_bonus_damage: {
		frost: 0.3
	}
});

set_charge(0);
set_stan(false);
set_mindscape(2);
set_agent('miyabi');
set_skills_levels([12, 12, 12, 12, 12]);

const result_1 = calculate_skills(target_stats);
print_result(result_1)





//livo4

// set_stats({
// 	level: 60,
// 	ATK: 2669,
// 	PEN_ratio: 0,
// 	PEN: 0,
// 	AP: 310,
// 	crit_chance: 0.70,
// 	crit_damage: 1.38
// });

// set_charge(0);
// set_stan(false);
// set_mindscape(1);
// set_agent('miyabi');
// set_skills_levels([12, 12, 12, 11, 11]);

// const result_1 = calculate_skills(target_stats);





//nnaoi frost

// set_stats({
// 	level: 60,
// 	ATK: 2489,
// 	PEN_ratio: 0,
// 	PEN: 63,
// 	AP: 265,
// 	crit_chance: 0.56,
// 	crit_damage: 1.812,
// 	total_damage_bonus: 0,
// 	crit_mode: crit_mode.average,
// 	atribute_bonus_damage: {
// 		frost: 0.3
// 	}
// });

// set_charge(0);
// set_stan(false);
// set_mindscape(0);
// set_agent('miyabi');
// set_skills_levels([12, 9, 12, 12, 12]);

// const result_1 = calculate_skills(target_stats);




//nnaoi damage

// set_stats({
// 	level: 60,
// 	ATK: 2668,
// 	PEN_ratio: 0,
// 	PEN: 63,
// 	AP: 265,
// 	crit_chance: 0.56,
// 	crit_damage: 1.812,
// 	total_damage_bonus: 0,
// 	crit_mode: crit_mode.average,
// 	atribute_bonus_damage: {}
// });

// set_charge(0);
// set_stan(false);
// set_mindscape(0);
// set_agent('miyabi');
// set_skills_levels([12, 9, 12, 12, 12]);

// const result_2 = calculate_skills(target_stats);





//akamiru
// set_stats({
// 	level: 60,
// 	ATK: 2680,
// 	PEN_ratio: 0,
// 	PEN: 0,
// 	AP: 310,
// 	crit_chance: 0.658,
// 	crit_damage: 1.62,
// 	total_damage_bonus: 0,
// 	crit_mode: crit_mode.average,
// 	atribute_bonus_damage: {
// 		frost: 0.3
// 	}
// });

// set_charge(0);
// set_stan(false);
// set_mindscape(0);
// set_agent('miyabi');
// set_skills_levels([12, 12, 12, 12, 12]);

// const result_2 = calculate_skills(target_stats);


// compare_damage(result_1, result_2)
