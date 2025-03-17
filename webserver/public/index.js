const post = async ({ hostname = document.location.origin, url_path, args }) => {
	const url = `${hostname}/${url_path}`;
	return new Promise ( (res ,rej) => {
		console.log('fetch', url);
		fetch( url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(args)
		}).then( response => response.json())
		.then( data => res (data))
		.catch( error => {
			console.log(error)
			rej({ error });
		});
	});
}

const make_result_div = (val) => {
	const result = `<div class="Skill">
			<div class="Name">${val.name}</div>
			<div class="Params">
				<div class="Damage_1"><div class="name">Damage 1</div><div class="value">${val.damage_1}</div></div>
				<div class="Damage_2"><div class="name">Damage 2</div><div class="value">${val.damage_2}</div></div>
				<div class="Difference"><div class="name">Difference</div><div class="value">${val.difference}</div></div>
				<div class="Percentage"><div class="name">Percentage</div><div class="value">${val.percentage}%</div></div>
			</div>
		</div>`
    return result;
}

const agents = {
	first: {},
	second: {},
}

const agent_names = {
	miyabi: 'Miyabi',
	solder_0_anby: 'Solder 0 Anby'
}

const set_agent_stats = async (agent_idx) => {
	const request_args = {
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

const calculate_damage = async () => {
	if (agents.first.agent_name && agents.second.agent_name) {
		const result = await post({ url_path: 'set_agent_stats', args: agents });
		$('.results').html(result.texts.map( v => v.map( val => make_result_div(val)).join('')).join('') );
		console.log(result);
	} else {
		$('.results').html('<div class="results_error">Ошибка: Отсутствует агент</div>');
	}
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

const set_preset_2 = () => {
	const preset_values = { 
		agent_name: 'solder_0_anby', 
		agent_mindscape: 1, 
		agent_atk: 3090,
		agent_crit_rate: 53,
		agent_crit_dmg: 184.4,
		agent_pen: 18,
		agent_attribute_electric: 40
	}

	fill_agent_form_data(preset_values);
}