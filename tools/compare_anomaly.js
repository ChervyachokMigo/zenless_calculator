module.exports = (damage_1, damage_2) => {
	console.log(damage_1, damage_2)
	const diff = damage_2 - damage_1;
	const perc = (damage_2 / damage_1 - 1) * 100;
	const text = { 
		name: 'Anomaly',
		damage_1: Number(damage_1.toFixed(0)),
		damage_2: Number(damage_2.toFixed(0)),  
		difference: Number(diff.toFixed(0)),  
		percentage: Number(perc.toFixed(2))
	}
	return { text, diff, perc };
}