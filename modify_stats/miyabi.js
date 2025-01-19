const obj_add_or_modify = require("../obj_add_or_modify");
const { skill_basic_attack, skill_basic_attack_charge, skill_ultimate } = require("../skill_type");
const { stat_crit_chance, stat_total_damage_bonus, stat_RES_ignore } = require("../stat_name");

module.exports = (skill, agent_stats, agent_data) => {
	let new_stats = {};

	if (agent_stats.mindscape_level >= 2) {
		new_stats = obj_add_or_modify( new_stats, 
			stat_crit_chance, 
			agent_data.effects.mindscape.second.crit_chance
		);
	}

	if (skill.name === skill_basic_attack) {
		if (agent_stats.mindscape_level >= 2) {
			new_stats = obj_add_or_modify( new_stats, 
				stat_total_damage_bonus, 
				agent_data.effects.mindscape.second.damage_bonus.basic_attack_kadzuhana_multiplier
			);
		}
	}

	if (skill.name === skill_basic_attack_charge) {
		if (agent_stats.mindscape_level >= 1) {
			new_stats = obj_add_or_modify( new_stats, 
				stat_RES_ignore, 
				agent_data.effects.mindscape.first.RES_ignore * (skill.stage * 2) //charges
			);
		}
	}
	
	if (skill.name === skill_ultimate) {
		new_stats = obj_add_or_modify(new_stats, 
			stat_total_damage_bonus, 
			agent_data.effects.ultimate.frost_damage_multiplier
		);
	}

	return new_stats;
}