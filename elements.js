
const element_type = {
	physical: 1,
	frost: 2,
	fire: 3,
	electric: 4,
	ether: 5
}

const anomaly_type_multipliers = {
	assault: 7.13,
	shatter: 5,
	burn: 0.5,
	shock: 1.25,
	corruption: 0.625,
}

module.exports = {
	element_type,
	anomaly_type_multipliers,
	get_element_name_by_id: (id) => {
		const founded_element = Object.entries(element_type).find(([key, value]) => value === id);
		if (!founded_element) {
			throw new Error('Unknown element');
		}
		return founded_element.shift();
	},
	is_atribute_in_obj: ( atrib_obj, name ) => {
		return Object.keys(atrib_obj).indexOf(name) > -1;
	},
	get_anomaly_type_multiplier: (element_id) => {
		switch (element_id) {
			case element_type.physical:
                return anomaly_type_multipliers.assault;
			case element_type.frost:
				return anomaly_type_multipliers.shatter;
			case element_type.fire:
				return anomaly_type_multipliers.burn;
			case element_type.electric:
				return anomaly_type_multipliers.shock;
			case element_type.ether:
				return anomaly_type_multipliers.corruption;

            default:
				throw new Error('Unknown element');

		}
	}
}