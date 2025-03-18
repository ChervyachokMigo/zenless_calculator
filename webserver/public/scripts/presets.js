
let presets = [];

const set_preset = (idx) => {
	fill_agent_form_data(presets[idx].values);
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

const load_preset_list = async () => {
	const result = await post({ url_path: 'load_preset_list' });
	presets = result;
	$('.presets').html(
		presets.map( (preset, idx) => `<input type="button" onclick="set_preset(${idx})" value="Set preset:&#x00A;${preset.name}" />`).join('')
	);
}

const save_preset = async () => {
	const preset_name = $('#agent_preset_name').val();

    if (preset_name) {
        const result = await post({ 
			url_path:'save_preset', 
			args: { name: preset_name, values: get_agent_form_data() }
		});
		await load_preset_list();
		$('#agent_preset_name').val(''); // clear input field after saving
        console.log(result);
    } else {
        console.log('Ошибка: Не указано имя пресета');
    }
}
