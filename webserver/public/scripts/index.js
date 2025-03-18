let effects = {}

const effects_names = {
	effects_atk: 'ATK',
    effects_crit_rate: 'Crit Rate',
    effects_crit_dmg: 'Crit Damage',
    effects_attribute_electric: 'Electric Bonus Damage',
	effects_attribute_fire: 'Fire Bonus Damage',
    effects_attribute_ice: 'Frost Bonus Damage',
    effects_attribute_ether: 'Ether Bonus Damage',
    effects_attribute_physical: 'Physical Bonus Damage',
}

const get_effects_form_data = () => {
	return {
        effects_atk: 			$('#effects_atk').val(),
		effects_crit_rate: 		$('#effects_crit_rate').val(),
        effects_crit_dmg: 		$('#effects_crit_dmg').val(),
		effects_attribute_electric: 	$('#effects_attribute_electric').val(),
		effects_attribute_fire: 		$('#effects_attribute_fire').val(),
		effects_attribute_ice: 			$('#effects_attribute_ice').val(),
		effects_attribute_ether: 		$('#effects_attribute_ether').val(),
		effects_attribute_physical: 	$('#effects_attribute_physical').val(),
    };
}

const div_by_value = (name, val, suffix = '') => {
	if (val) {
		return `<div class="${name}" title="${effects_names[name]}">${val}${suffix}</div>`;
	} else {
		return '';
	}
}

const set_effects = () => {
	effects = get_effects_form_data();
	$(`.effects`).html(`<div class="stats">
		${div_by_value('effects_atk', effects.effects_atk)}
		${div_by_value('effects_crit_rate', effects.effects_crit_rate, '%')}
		${div_by_value('effects_crit_dmg', effects.effects_crit_dmg, '%')}
		${div_by_value('effects_attribute_electric', effects.effects_attribute_electric, '%')}
		${div_by_value('effects_attribute_fire', effects.effects_attribute_fire, '%')}
		${div_by_value('effects_attribute_ice', effects.effects_attribute_ice, '%')}
		${div_by_value('effects_attribute_ether', effects.effects_attribute_ether, '%')}
		${div_by_value('effects_attribute_physical', effects.effects_attribute_physical, '%')}
	</div>`);
}


$( document ).ready( async function () {

	await load_preset_list();

});