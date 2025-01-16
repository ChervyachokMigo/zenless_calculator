const { readdirSync } = require("fs");

const { calculate_damage, damage_types } = require("./builder");
const select_skill = require("./select_skill");
const { is_atribute_in_obj, get_element_name_by_id } = require("./elements");
const skill_name_generator = require("./skill_name_generator");
const crit_modes = require("./crit_mode");

let agent_data = null;
let agent_stats = {};

module.exports = {
	set_stats: ({ level, ATK, PEN_ratio, PEN, AP, crit_chance, crit_damage, total_damage_bonus, crit_mode, atribute_bonus_damage }) => {
		agent_stats.level = level ? level : 60;
        agent_stats.ATK = ATK;
        agent_stats.PEN_ratio = PEN_ratio ? PEN_ratio : 0;
        agent_stats.PEN = PEN ? PEN : 0;
        agent_stats.AP = AP;
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
		const agents = readdirSync('./agent_data').map( v => v.replace('.js', ''));

		const founded_agent = agents.find( v => v === name);
        if (!founded_agent) {
            throw new Error('No agent found');
        }

		agent_data = require('./agent_data/'+ name);
	},

	set_skills_levels: (levels) => {
		agent_stats.skills_levels = levels;
	},

	calclulate_pre_skill_damage: (element_type, target_stats) => {
		agent_stats.damage_type = damage_types.standart;
		const total_damage_bonus_start = agent_stats.total_damage_bonus;
		agent_stats.RES_ignore = agent_stats.RES_ignore ? agent_stats.RES_ignore : 0;
		agent_stats.element_type = element_type;
		agent_stats.ability_multiplier = 1;
		const element_name = get_element_name_by_id(agent_stats.element_type);
		if (is_atribute_in_obj(agent_stats.atribute_bonus_damage, element_name)) {
			agent_stats.total_damage_bonus += agent_stats.atribute_bonus_damage[element_name];
		}
		if (agent_stats.mindscape_level >= 2) {
			agent_stats.crit_chance += agent_data.effects.mindscape.second.crit_chance;
		}

		const calc_result = calculate_damage( agent_stats, target_stats );
		//reset bmage bonus
		agent_stats.total_damage_bonus = total_damage_bonus_start;
		return calc_result;
	},

	calculate_skill_damage: (target_stats) => {

		agent_stats.damage_type = damage_types.standart;

		if (agent_stats.mindscape_level >= 2) {
			agent_stats.crit_chance += agent_data.effects.mindscape.second.crit_chance;
		}

		const get_skill_results = (skill_name) => {
			const results = [];
			const total_damage_bonus_start = agent_stats.total_damage_bonus;

			agent_stats.RES_ignore = agent_stats.RES_ignore ? agent_stats.RES_ignore : 0;
			let skill_id = null;

			if (skill_name === 'basic_atack') {
				if (agent_stats.mindscape_level >= 2) {
					agent_stats.total_damage_bonus += agent_data.effects.mindscape.second.damage_bonus.basic_atack_kadzuhana_multiplier;
				}
				skill_id = 0;
			}

			if (skill_name === 'basic_atack_charge') {
				if (agent_stats.mindscape_level  >= 1) {
					agent_stats.RES_ignore += agent_data.effects.mindscape.first.RES_ignore * agent_stats.charges_count;
				}
				skill_id = 0;
			}
			if (skill_name === 'ex_special') {
				skill_id = 3;
			}
			if (skill_name === 'chain_atack') {
				skill_id = 4;
			}
			if (skill_name === 'ultimate') {
				agent_stats.total_damage_bonus += agent_data.effects.ultimate.frost_damage_multiplier;
				skill_id = 4;
			}

			const level = agent_stats.skills_levels[skill_id];
			const skill_stages_count = agent_data.skill[skill_name].filter( v => v.level === level ).length + 1;

			const total_damage_bonus_default = agent_stats.total_damage_bonus;

			for (let stage = 1; stage < skill_stages_count; stage++) {
				const selected_skill = select_skill(agent_data.skill[skill_name], level, stage);	

				agent_stats.element_type = selected_skill.element_type;
				agent_stats.ability_multiplier = selected_skill.ability_multiplier;

				const element_name = get_element_name_by_id(agent_stats.element_type);
				if (is_atribute_in_obj(agent_stats.atribute_bonus_damage, element_name)) {
					agent_stats.total_damage_bonus += agent_stats.atribute_bonus_damage[element_name];
				}

				const calc_result = calculate_damage( agent_stats, target_stats );

				results.push({ skill_name: skill_name_generator(skill_name, level, stage), value: calc_result });
				
				//reset damage bonus
				agent_stats.total_damage_bonus = total_damage_bonus_default;
			}

			//reset bmage bonus
			agent_stats.total_damage_bonus = total_damage_bonus_start;

			return results;
		}

		return [
			get_skill_results('basic_atack'),
			get_skill_results('basic_atack_charge'),
			get_skill_results('ex_special'),
			get_skill_results('chain_atack'),
			get_skill_results('ultimate'),
		];
	},

	
}