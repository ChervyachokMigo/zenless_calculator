const obj_add_or_modify = require("./tools/obj_add_or_modify");
const { get_stats, get_agent_data } = require("./tools/atacker_stats");
const { calculate_damage, damage_types } = require("./builder");
const { get_element_name_by_id, is_atribute_in_obj } = require("./consts/elements");
const get_agent_stats = require("./tools/get_agent_stats");
const select_skill = require("./tools/select_skill");
const skill_name_generator = require("./tools/skill_name_generator");
const update_agent_stats = require("./tools/update_agent_stats");
const { skill_basic_attack, skill_basic_attack_charge, skill_ex_special, skill_chain_attack, skill_ultimate } = require("./consts/skill_type");
const { stat_element_type, stat_ability_multiplier, stat_damage_type, stat_total_damage_bonus } = require("./consts/stat_name");
const { add_results } = require("./tools/results");

module.exports = ( ) => {
	
	const agent_stats = get_stats();
	const agent_data = get_agent_data();

	const results = [];

	const skills = [
		{ name: skill_basic_attack, level_id: 0 },
		{ name: skill_basic_attack_charge, level_id: 0 },
		{ name: skill_ex_special, level_id: 3 },
		{ name: skill_chain_attack, level_id: 4 },
		{ name: skill_ultimate, level_id: 4 }];

	for(let skill of skills) {
		const level = agent_stats.skills_levels[skill.level_id];
		const skill_stage_count = agent_data.skill[skill.name].filter( v => v.level === level ).length + 1;

		const skill_results = [];

		for (let stage = 1; stage < skill_stage_count; stage++) {
			let skill_stats = get_agent_stats( {...skill, stage}, agent_stats, agent_data );

			skill_stats = obj_add_or_modify(skill_stats, stat_damage_type, damage_types.standart);

			const selected_skill = select_skill(agent_data.skill[skill.name], level, stage);	

			const element_type = selected_skill.element_type;
			
			skill_stats = obj_add_or_modify(skill_stats, stat_element_type, selected_skill.element_type);
			skill_stats = obj_add_or_modify(skill_stats, stat_ability_multiplier, selected_skill.ability_multiplier);

			const element_name = get_element_name_by_id( element_type );

			if (is_atribute_in_obj(agent_stats.atribute_bonus_damage, element_name)) {
				skill_stats = obj_add_or_modify(skill_stats, stat_total_damage_bonus, agent_stats.atribute_bonus_damage[element_name]);
			}

			const updated_stats = update_agent_stats( agent_stats, skill_stats );

			const calc_result = calculate_damage( updated_stats );

			skill_results.push({ skill_name: skill_name_generator(skill.name, level, stage), value: calc_result });
			console.log(updated_stats)
		}

		results.push(skill_results);
	}

	add_results(results);

}