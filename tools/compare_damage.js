module.exports = (damage_1, damage_2) => {
	const differences = [];
	const percents = [];
	const texts = [];

	damage_1.forEach( (v, pos) => {
		if (!differences[pos]) {
			differences.push([]);
		}

		if (!percents[pos]) {
            percents.push([]);
        }

		if (!texts[pos]) {
            texts.push([]);
        }

		for (let i = 0; i < v.length; i++ ) {
			const name = v[i].skill_name;
			const Damage1 = v[i].value;
			const Damage2 = damage_2[pos][i].value;

			const diff = Damage2 - Damage1;
			const perc = (Damage2 / Damage1 - 1) * 100;
			const text = { 
				name,
				damage_1: Number(Damage1.toFixed(0)),
				damage_2: Number(Damage2.toFixed(0)),  
				difference: Number(diff.toFixed(0)),  
				percentage: Number(perc.toFixed(2))
			}
			
			differences[pos].push( diff );
			percents[pos].push( perc );
			texts[pos].push( text );
		}
    });
	return { differences, percents, texts };
}