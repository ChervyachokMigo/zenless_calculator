const agents = {
	first: {},
	second: {},
}

const agent_names = {
	miyabi: 'Miyabi',
	solder_0_anby: 'Solder 0 Anby',
}

const set_agent_stats = async (agent_idx) => {
	const request_args = get_agent_form_data();

	agents[agent_idx] = request_args;

	$(`.agents > .${agent_idx}`).html(`
		<div class="count">${agent_idx}</div>
		<div class="name">${agent_names[request_args.agent_name]}</div>
		<div class="stats">
			<div class="atk">${request_args.agent_atk}</div>
			<div class="crit_rate">${request_args.agent_crit_rate}%</div>
			<div class="crit_dmg">${request_args.agent_crit_dmg}%</div>
		</div>`)
}