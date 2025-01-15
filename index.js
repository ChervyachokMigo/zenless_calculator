const { set_stats, calculate_skill_damage, calclulate_pre_skill_damage } = require("./atacker_stats");

const set_agent = require("./set_agent");

const { set_target } = require("./target_stats");

const print_result = require("./print_result");
const compare_damage = require("./compare_damage");
const atribute_damage = require("./atribute_damage");

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

set_stats({
	ATK: 2969,
	AP: 238,
	crit_chance: 0.61,
	crit_damage: 1.62,
    atribute_bonus_damage: {
        frost: 0.3
    }
});

set_agent({ name: 'miyabi', mindscape: 2, skill_levels: [ 12, 12, 12, 12, 12 ]});

const res_1 = atribute_damage.calc(target_stats);

set_stats({
	ATK: 2669,
	AP: 310,
	crit_chance: 0.70,
	crit_damage: 1.38,
	atribute_bonus_damage: {
        frost: 0.3
    }
});

set_agent({ name: 'miyabi', mindscape: 0, skill_levels: [ 12, 12, 12, 12, 12 ]});

const res_2 = atribute_damage.calc(target_stats);

atribute_damage.compare(res_1, res_2)

// const result_2 = calculate_skill_damage(target_stats);


// compare_damage(result_1, result_2)


