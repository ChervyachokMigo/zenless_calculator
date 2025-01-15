module.exports = ( skills, level, stage ) => {
	const founded = skills.filter( v => v.level === level && v.stage === stage);
	if (!founded) {
		throw new Error('No skill found');
	}
	const skill = founded.shift();
	return {
		element_type: skill.element_type,
		ability_multiplier: skill.ability_multiplier,
	}
}