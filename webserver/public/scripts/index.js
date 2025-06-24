let effects = {}

const effects_names = {
	effects_atk: 'ATK',
	effects_ap: 'AP',
    effects_crit_rate: 'Crit Rate',
    effects_crit_dmg: 'Crit Damage',
    effects_attribute_electric: 'Attribute Electric',
	effects_attribute_fire: 'Attribute Fire',
    effects_attribute_ice: 'Attribute Frost',
    effects_attribute_ether: 'Attribute Ether',
    effects_attribute_physical: 'Attribute Physical',
}

const get_effects_form_data = () => {
	return {
        effects_atk: 			$('#effects_atk').val(),
		effects_ap: 		$('#effects_ap').val(),
		effects_crit_rate: 		$('#effects_crit_rate').val(),
        effects_crit_dmg: 		$('#effects_crit_dmg').val(),
		effects_attribute_electric: 	$('#effects_attribute_electric').val(),
		effects_attribute_fire: 		$('#effects_attribute_fire').val(),
		effects_attribute_ice: 			$('#effects_attribute_ice').val(),
		effects_attribute_ether: 		$('#effects_attribute_ether').val(),
		effects_attribute_physical: 	$('#effects_attribute_physical').val(),
    };
}

const div_by_value = (name, val, suffix = '%') => {
	return val ?
		`<div class="${name}" title="${effects_names[name]}">
			<div class="Name">${effects_names[name]}</div>
			<div class="Value">${val}${suffix}</div>
		</div>` : '';
}

const set_effects = () => {
	effects = get_effects_form_data();
	$(`.effects`).html(`
		<div class="title">Effects stats</div>
		<div class="stats">
			${div_by_value('effects_atk', effects.effects_atk, '')}
			${div_by_value('effects_ap', effects.effects_ap, '')}
			${div_by_value('effects_crit_rate', effects.effects_crit_rate)}
			${div_by_value('effects_crit_dmg', effects.effects_crit_dmg)}
			${div_by_value('effects_attribute_electric', effects.effects_attribute_electric)}
			${div_by_value('effects_attribute_fire', effects.effects_attribute_fire)}
			${div_by_value('effects_attribute_ice', effects.effects_attribute_ice)}
			${div_by_value('effects_attribute_ether', effects.effects_attribute_ether)}
			${div_by_value('effects_attribute_physical', effects.effects_attribute_physical)}
		</div>`);
}


$( document ).ready( async function () {

	await load_preset_list();

});