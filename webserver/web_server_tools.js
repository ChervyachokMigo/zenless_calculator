const { levels_12 } = require("../consts/skill_levels_preset")
const check_number = require("../tools/check_number")
const remove_zero = require("../tools/remove_zero")

module.exports = {
	// depricated
	div_insert: (data, classname, content) => {
		const reg = new RegExp(`<div class="${classname}">(.*)<\/div>`, 'g');
		const replace_content = `<div class="${classname}">${content}<\/div>`;
		return data.replace(reg, replace_content);
	},

	get_agent_stats: (values) => {
		return remove_zero({
			name: values.agent_name, 
			mindscape: check_number(values.agent_mindscape), 
			skill_levels: levels_12,
			ATK: check_number(values.agent_atk),
			AP: check_number(values.agent_ap),
			crit_chance: check_number(values.agent_crit_rate)/100,
			crit_damage: check_number(values.agent_crit_dmg)/100,
			PEN: check_number(values.agent_pen),
			PEN_ratio: check_number(values.agent_pen_ratio)/100,
			RES_ignore: check_number(values.agent_res_ignore),
			//crit_mode:crit_mode.force,
			//crit_mode:crit_mode.none,
			atribute_bonus_damage: remove_zero({
				physical: check_number(values.agent_attribute_physical)/100,
				frost: check_number(values.agent_attribute_ice)/100,
				fire: check_number(values.agent_attribute_fire)/100,
				electric: check_number(values.agent_attribute_electric)/100,
				ether: check_number(values.agent_attribute_ether)/100,
			})
		})
	},

	get_effects_stats: (values) => {
		return remove_zero({
			ATK: check_number(values.effects_atk),
			AP: check_number(values.effects_ap),
			crit_chance: check_number(values.effects_crit_rate)/100,
			crit_damage: check_number(values.effects_crit_dmg)/100,
			atribute_bonus_damage: remove_zero({
				physical: check_number(values.effects_attribute_physical)/100,
				fire: check_number(values.effects_attribute_fire)/100,
				frost: check_number(values.effects_attribute_ice)/100,
				electric: check_number(values.effects_attribute_electric)/100,
				ether: check_number(values.effects_attribute_ether)/100,
			})
		});
	},

	transform_agent_stats: (values) => {
		return remove_zero({
            agent_name: values.name,
            agent_mindscape: values.mindscape,
            agent_skill_levels: values.skill_levels,
            agent_atk: check_number(values.ATK),
			agent_ap: check_number(values.AP),
            agent_crit_rate: check_number(values.crit_chance) * 100,
            agent_crit_dmg: check_number(values.crit_damage) * 100,
            agent_pen: check_number(values.PEN),
            agent_pen_ratio: check_number(values.PEN_ratio) * 100,
            agent_res_ignore: check_number(values.RES_ignore),
            //crit_mode: values.crit_mode,
            //crit_mode: values.crit_mode,
			agent_attribute_physical: check_number(values.atribute_bonus_damage.physical) * 100,
            agent_attribute_ice: check_number(values.atribute_bonus_damage.frost) * 100,
            agent_attribute_fire: check_number(values.atribute_bonus_damage.fire) * 100,
            agent_attribute_electric: check_number(values.atribute_bonus_damage.electric) * 100,
            agent_attribute_ether: check_number(values.atribute_bonus_damage.ether) * 100
        })
	}
}