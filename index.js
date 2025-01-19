const { set_stats, set_stats_effect } = require("./atacker_stats");

const set_agent = require("./set_agent");

const { set_target } = require("./target_stats");

const print_result = require("./print_result");
const compare_damage = require("./compare_damage");
const atribute_damage = require("./atribute_damage");
const set_status_effects = require("./set_status_effects");
const crit_mode = require("./crit_mode");
const { levels_12, levels_14 } = require("./skill_levels_preset");
const calculate_standart_damage = require("./calculate_standart_damage");
const { compare_results } = require("./results");

set_target('hati', 70);

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
// set_stats({
// 	level: 60,
// 	ATK: 2969,
// 	PEN_ratio: 0,
// 	PEN: 0,
// 	AP: 238,
// 	crit_mode: crit_mode.force,
// 	crit_chance: 0.61,
// 	crit_damage: 2.42,
// 	total_damage_bonus: 0,
// 	atribute_bonus_damage: {
// 		frost: 0.3
// 	}
// });

// set_charge(0);
// set_stan(false);
// set_mindscape(2);
// set_agent('miyabi');
// set_skills_levels([12, 12, 12, 12, 12]);

// const result_1 = calculate_skill_damage(target_stats);
// print_result(result_1)





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

// const result_1 = calculate_skill_damage(target_stats);





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

// const result_1 = calculate_skill_damage(target_stats);




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

// const result_2 = calculate_skill_damage(target_stats);





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

// const result_2 = calculate_skill_damage(target_stats);

// set_stats({
// 	ATK: 3105,
// 	AP: 247,
// 	crit_chance: 1,
// 	crit_damage: 0.78
// });

// set_agent({ name: 'miyabi', mindscape: 0, skill_levels: [ 12, 12, 12, 12, 12 ]});

// const result_1 = calculate_skill_damage(target_stats);

// set_stats({
// 	ATK: 2969,
// 	AP: 238,
// 	crit_chance: 0.61,
// 	crit_damage: 1.62,
// 	//crit_mode:crit_mode.force,
// 	//crit_mode:crit_mode.none,
//     atribute_bonus_damage: {
//         frost: 0.3
//     }
// });

// set_agent({ name: 'miyabi', mindscape: 2, skill_levels: levels_12});

// set_stats_effect({ 
// 	crit_chance: 0.15 + 0.12,
// 	crit_damage: 0.80,
// 	ATK: 0
// });

//const res_1 = atribute_damage.calc(target_stats);

// const result_1 = calculate_skill_damage(target_stats);


// set_stats({
// 	ATK: 3229,
// 	AP: 238,
// 	crit_chance: 0.53,
// 	crit_damage: 1.572,
// 	//crit_mode:crit_mode.force,
// 	//crit_mode:crit_mode.none,
//     atribute_bonus_damage: {
//         frost: 0.3
//     }
// });

// set_stats({
// 	ATK: 3132,
// 	AP: 238,
// 	crit_chance: 0.482,
// 	crit_damage: 1.524,
// 	//crit_mode:crit_mode.force,
// 	//crit_mode:crit_mode.none,
//     atribute_bonus_damage: {
//         frost: 0.3
//     }
// });

// set_stats_effect({ 
// 	crit_chance: 0.15 + 0.12,
// 	crit_damage: 0.80,
// 	ATK: 0
// });

// set_agent({ name: 'miyabi', mindscape: 2, skill_levels: levels_12});

//const res_2 = atribute_damage.calc(target_stats);


// const result_2 = calculate_skill_damage(target_stats);

//atribute_damage.compare(res_1, res_2)

// compare_damage(result_1, result_2)

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

// const result_1 = calculate_skill_damage(target_stats);

// set_stats({
// 	ATK: 2523,
// 	AP: 265,
// 	crit_chance: 0.562+0.12,
// 	crit_damage: 1.812,
// 	//crit_mode:crit_mode.force,
// 	//crit_mode:crit_mode.none,
// 	atribute_bonus_damage: {
//         frost: 0.3
//     }
// });

set_stats({
	ATK: 3229,
	AP: 265,
	crit_chance: 0.53+0.12,
	crit_damage: 1.572,
	//crit_mode:crit_mode.force,
	//crit_mode:crit_mode.none,
	atribute_bonus_damage: {
        frost: 0.3
    }
});

set_agent({ name: 'miyabi', mindscape: 2, skill_levels: levels_12});

calculate_standart_damage();

// set_stats({
// 	ATK: 2726,
// 	AP: 292,
// 	crit_chance: 0.674+0.12,
// 	crit_damage: 1.476,
// 	//crit_mode:crit_mode.force,
// 	//crit_mode:crit_mode.none,
// 	atribute_bonus_damage: {
//         frost: 0.3
//     }
// });

set_stats({
	ATK: 3229,
	AP: 265,
	PEN: 100,
	crit_chance: 0.53+0.12,
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

calculate_standart_damage();

//const res_1 = atribute_damage.calc(target_stats);

//console.log(res_1)

 //const result_1 = calculate_skill_damage(target_stats);
 //console.log(result_1)
 //print_result(result_1);

compare_results();