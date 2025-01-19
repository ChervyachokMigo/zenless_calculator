const { readdirSync } = require("fs");
const path = require("path");


const crit_modes = require("../consts/crit_mode");

let agent_data = null;
let agent_stats = {};

const agent_data_path = path.join('consts', 'agent_data');

const _this = module.exports = {
	set_stats: ({ level, ATK, PEN_ratio, PEN, AP, crit_chance, crit_damage, total_damage_bonus, crit_mode, atribute_bonus_damage, RES_ignore }) => {
		agent_stats.level = level ? level : 60;
        agent_stats.ATK = ATK;
        agent_stats.PEN_ratio = PEN_ratio ? PEN_ratio : 0;
        agent_stats.PEN = PEN ? PEN : 0;
		agent_stats.RES_ignore = RES_ignore ? RES_ignore : 0;
        agent_stats.AP = AP ? AP : 0;
		agent_stats.crit_mode = typeof crit_mode !== 'undefined' ? crit_mode : crit_modes.average;
        agent_stats.crit_chance = crit_chance;
        agent_stats.crit_damage = crit_damage;
		agent_stats.total_damage_bonus = total_damage_bonus ? total_damage_bonus : 0;
		agent_stats.atribute_bonus_damage = atribute_bonus_damage ? atribute_bonus_damage : {};
	},

	set_charge: (value) => agent_stats.charges_count = value,

	set_stan: (is_active, multiplier = 0) => {
		if (!is_active) {
			agent_stats.stun_multiplier = 0;
		} else {
			agent_stats.stun_multiplier = multiplier;
		}
		agent_stats.stun = is_active;
	},

	select_mindscape: (level) => {
		agent_stats.mindscape_level = level
	},

	select_agent: (name) => {
		const agents = readdirSync(agent_data_path).map( v => v.replace('.js', ''));

		const founded_agent = agents.find( v => v === name);
        if (!founded_agent) {
            throw new Error('No agent found');
        }

		agent_stats.name = name;
		agent_data = require( path.join( '..', agent_data_path, name ));
	},

	set_skills_levels: (levels) => {
		agent_stats.skills_levels = levels;
	},

	set_stats_effect: ({ crit_chance, crit_damage, ATK, atribute_bonus_damage }) => {
		if (crit_chance) {
			agent_stats.crit_chance += crit_chance;
		}
		if (crit_damage) {
            agent_stats.crit_damage += crit_damage;
        }
		if (ATK) {
            agent_stats.ATK += ATK;
        }
		if (atribute_bonus_damage) {
			Object.entries(atribute_bonus_damage).map(([key, value]) => {
				if (agent_stats.atribute_bonus_damage[key]) {
					agent_stats.atribute_bonus_damage[key] += value;
				} else {
					agent_stats.atribute_bonus_damage[key] = value;
				}
			});
		}
	},

	get_stats: () => agent_stats,
	get_agent_data: () => agent_data,

	// calclulate_pre_skill_damage: (element_type, target_stats) => {
	// 	agent_stats.damage_type = damage_types.standart;
	// 	const total_damage_bonus_start = agent_stats.total_damage_bonus;
	// 	agent_stats.RES_ignore = agent_stats.RES_ignore ? agent_stats.RES_ignore : 0;
	// 	agent_stats.element_type = element_type;
	// 	agent_stats.ability_multiplier = 1;
	// 	const element_name = get_element_name_by_id(agent_stats.element_type);
	// 	if (is_atribute_in_obj(agent_stats.atribute_bonus_damage, element_name)) {
	// 		agent_stats.total_damage_bonus += agent_stats.atribute_bonus_damage[element_name];
	// 	}
	// 	if (agent_stats.mindscape_level >= 2) {
	// 		agent_stats.crit_chance += agent_data.effects.mindscape.second.crit_chance;
	// 	}

	// 	const calc_result = calculate_damage( agent_stats, target_stats );
	// 	//reset bmage bonus
	// 	agent_stats.total_damage_bonus = total_damage_bonus_start;
	// 	return calc_result;
	// },

	
}