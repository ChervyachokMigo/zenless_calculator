const make_result_div = (val) => {
	const damage_1 = val.damage_1? val.damage_1 : '0';
	const damage_2 = val.damage_2? val.damage_2 : '0';
	const difference = val.difference? val.difference : '0';
	const percentage = val.percentage ? val.percentage + '%': '0';
	const result = `<div class="Skill">
			<div class="Name">${val.name}</div>
			<div class="Params">
				<div class="Damage_1"><div class="name">Damage 1</div><div class="value">${damage_1}</div></div>
				<div class="Damage_2"><div class="name">Damage 2</div><div class="value">${damage_2}</div></div>
				<div class="Difference"><div class="name">Difference</div><div class="value">${difference}</div></div>
				<div class="Percentage"><div class="name">Percentage</div><div class="value">${percentage}</div></div>
			</div>
		</div>`
    return result;
}

const compare_agents = async () => {
	if (agents.first.agent_name && agents.second.agent_name) {
		const result = await post({ url_path: 'compare_agents', args: { agents, effects } });
		$('.results').html(result.texts.map( v => v.map( val => make_result_div(val)).join('')).join('') );
		console.log(result);
	} else {
		$('.results').html('<div class="results_error">Ошибка: Отсутствует агент</div>');
	}
}