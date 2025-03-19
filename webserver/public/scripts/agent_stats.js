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

	const atk = request_args.agent_atk? request_args.agent_atk : '0';
	const crit_rate = request_args.agent_crit_rate? request_args.agent_crit_rate + '%' : '0';
	const crit_dmg = request_args.agent_crit_dmg? request_args.agent_crit_dmg + '%' : '0';

	$(`.agents > .${agent_idx}`).html(`
		<div class="count">${agent_idx}</div>
		<div class="name">${agent_names[request_args.agent_name]}</div>
		<div class="stats">
			<div class="atk">${atk}</div>
			<div class="crit_rate">${crit_rate}</div>
			<div class="crit_dmg">${crit_dmg}</div>
		</div>`)
}