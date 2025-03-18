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

const compare_agents = async () => {
	if (agents.first.agent_name && agents.second.agent_name) {
		const result = await post({ url_path: 'compare_agents', args: agents });
		$('.results').html(result.texts.map( v => v.map( val => make_result_div(val)).join('')).join('') );
		console.log(result);
	} else {
		$('.results').html('<div class="results_error">Ошибка: Отсутствует агент</div>');
	}
}