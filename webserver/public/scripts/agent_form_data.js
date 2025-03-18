const get_agent_form_data = () => {
	return {
		agent_name: 		$('#agent_name').val(),
		agent_mindscape: 	$('#agent_mindscape').val(),
        agent_atk: 			$('#agent_atk').val(),
		agent_crit_rate: 	$('#agent_crit_rate').val(),
        agent_crit_dmg: 	$('#agent_crit_dmg').val(),
        agent_pen: 			$('#agent_pen').val(),
        agent_pen_ratio: 	$('#agent_pen_ratio').val(),
        agent_res_ignore: 	$('#agent_res_ignore').val(),
		agent_attribute_electric: 	$('#agent_attribute_electric').val(),
		agent_attribute_fire: 		$('#agent_attribute_fire').val(),
		agent_attribute_ice: 		$('#agent_attribute_ice').val(),
		agent_attribute_ether: 		$('#agent_attribute_ether').val(),
		agent_attribute_physical: 	$('#agent_attribute_physical').val(),
    };
}

const set_defined_value = (selector, value) => {
	if (value) {
		$(selector).val(value);
	}
}

const fill_agent_form_data = (values) => {
	set_defined_value('#agent_name', values.agent_name);
	set_defined_value('#agent_mindscape', values.agent_mindscape);
	set_defined_value('#agent_atk', values.agent_atk);
	set_defined_value('#agent_crit_rate', values.agent_crit_rate);
	set_defined_value('#agent_crit_dmg', values.agent_crit_dmg);
	set_defined_value('#agent_pen', values.agent_pen);
	set_defined_value('#agent_pen_ratio', values.agent_pen_ratio);
	set_defined_value('#agent_res_ignore', values.agent_res_ignore);
	set_defined_value('#agent_attribute_electric', values.agent_attribute_electric);
	set_defined_value('#agent_attribute_fire', values.agent_attribute_fire);
	set_defined_value('#agent_attribute_ice', values.agent_attribute_ice);
	set_defined_value('#agent_attribute_ether', values.agent_attribute_ether);
	set_defined_value('#agent_attribute_physical', values.agent_attribute_physical);
}