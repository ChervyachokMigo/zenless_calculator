module.exports = (damage_1, damage_2) => {
	const differences = [];
	const percents = [];

	damage_1.forEach( (v, pos) => {
		if (!differences[pos]) {
			differences.push([]);
		}

		if (!percents[pos]) {
            percents.push([]);
        }

		for (let i = 0; i < v.length; i++ ) {
			let name = v[i].skill_name;
			let Damage1 = v[i].value;
			let Damage2 = damage_2[pos][i].value;

			const diff = Damage2 - Damage1;
			let perc = (Damage2 / Damage1 - 1) * 100;

			console.log(
				name,
				'Damage 1:', Number(Damage1.toFixed(0)),
				'Damage 2:', Number(Damage2.toFixed(0)),  
				'Difference:', Number(diff.toFixed(0)),  
				'Percentage:', Number(perc.toFixed(2)), '%'
			)
			
			differences[pos].push( diff );
			percents[pos].push( perc );
		}
    });
	return percents;
}