const agents = {
	first: {},
	second: {},
}

const agent_names = {
	miyabi: 'Miyabi',
	solder_0_anby: 'Solder 0 Anby',
}

const agent_count_names = {
	first: 'Agent 1',
	second: 'Agent 2',
}

const insert_attribute_div = (classname, text, value, suffix = '%') => {
	return value ? `<div class="${classname}"><div class="Name">${text}</div><div class="Value">${value}${suffix}</div></div>` : '';
}

const set_agent_stats = async (agent_idx) => {
	const request_args = get_agent_form_data();

	agents[agent_idx] = request_args;

	const atk = request_args.agent_atk? request_args.agent_atk : '0';
	const crit_rate = request_args.agent_crit_rate? request_args.agent_crit_rate + '%' : '0';
	const crit_dmg = request_args.agent_crit_dmg? request_args.agent_crit_dmg + '%' : '0';

	$(`.agents > .${agent_idx}`).html(`
		<div class="title">${agent_count_names[agent_idx]}</div>
		<div class="name">${agent_names[request_args.agent_name]}</div>
		<div class="stats">
			<div class="atk"><div class="Name">ATK</div><div class="Value">${atk}</div></div>
			<div class="crit_rate"><div class="Name">Crit Rate</div><div class="Value">${crit_rate}</div></div>
			<div class="crit_dmg"><div class="Name">Crit DMG</div><div class="Value">${crit_dmg}</div></div>
			${insert_attribute_div('attribute_electric', 'Attribute Electric', request_args.agent_attribute_electric)}
			${insert_attribute_div('attribute_fire', 'Attribute Fire', request_args.agent_attribute_fire)}
			${insert_attribute_div('attribute_ice', 'Attribute Frost', request_args.agent_attribute_ice)}
			${insert_attribute_div('attribute_ether', 'Attribute Ether', request_args.agent_attribute_ether)}
			${insert_attribute_div('attribute_physical', 'Attribute Physical', request_args.agent_attribute_physical)}
		</div>`)
}