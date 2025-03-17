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

const make_div = (val) => {
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

const set_agent_stats = async () => {
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
	const result = await post({ url_path: 'set_agent_stats', args: request_args });
	$('.results').html(result.texts.map( v => v.map( val => make_div(val)).join('')).join('') );
	console.log(result);
}