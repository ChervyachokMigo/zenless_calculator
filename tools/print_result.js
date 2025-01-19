module.exports = (result) => {

	result.forEach( (v, pos) => {
		for (let i = 0; i < v.length; i++ ) {
			let name = v[i].skill_name;
			let Damage = v[i].value;

			console.log(
				name,
				'Damage:', Number(Damage.toFixed(0)),
			)
			
		}
    });

}