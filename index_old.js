const wengine = [
	{ CR: 24, CA: 0 },
	{ CR: 0, CA: 48 }
];

const disk_CR = 2.4;
const disk_CA = 4.8;

const disk_6_slot = {
	CR: 24,
	CA: 48
}

const disk_stats_4_stats = [
	//4 stats
	{ CR: 1, CA: 6, CR_UP: '+0', CA_UP: '+5'},
	{ CR: 2, CA: 5, CR_UP: '+1', CA_UP: '+4'},
	{ CR: 3, CA: 4, CR_UP: '+2', CA_UP: '+3'},
	{ CR: 4, CA: 3, CR_UP: '+3', CA_UP: '+2'},
	{ CR: 5, CA: 2, CR_UP: '+4', CA_UP: '+1'},
	{ CR: 6, CA: 1, CR_UP: '+5', CA_UP: '+0'},
];

const disk_stats_3_stats = [
    //3 stats
	{ CR: 1, CA: 5, CR_UP: '+0', CA_UP: '+4'},
	{ CR: 2, CA: 4, CR_UP: '+1', CA_UP: '+3'},
	{ CR: 3, CA: 3, CR_UP: '+2', CA_UP: '+2'},
	{ CR: 4, CA: 2, CR_UP: '+3', CA_UP: '+1'},
	{ CR: 5, CA: 1, CR_UP: '+4', CA_UP: '+0'},
];


const calculate = (damage = 3000, atacks_count = 10000, stats = disk_stats_4_stats) => {
	const disk_sets = [];

	for (let w = 0; w < wengine.length; w++) {

		for ( let m = 0; m <= 1; m ++) {

		for ( let a = 0; a < stats.length; a++) {
			const disk_1 = Object.assign({}, stats[a]);

			disk_1.CR = Number((disk_1.CR * disk_CR).toFixed(1));
			disk_1.CA = Number((disk_1.CA * disk_CA).toFixed(1));

			for ( let b = 0; b < stats.length; b++) {
			const disk_2 = Object.assign({}, stats[b]);

			disk_2.CR = Number((disk_2.CR * disk_CR).toFixed(1));
			disk_2.CA = Number((disk_2.CA * disk_CA).toFixed(1));

			for ( let c = 0; c < stats.length; c++) {
			const disk_3 = Object.assign({}, stats[c]);

			disk_3.CR = Number((disk_3.CR * disk_CR).toFixed(1));
			disk_3.CA = Number((disk_3.CA * disk_CA).toFixed(1));
			
			for ( let d = 0; d < stats.length; d++) {
			const disk_4 = Object.assign({}, stats[d]);

			disk_4.CR = Number((disk_4.CR * disk_CR).toFixed(1));
			disk_4.CA = Number((disk_4.CA * disk_CA).toFixed(1));
			
			for ( let e = 0; e < stats.length; e++) {
			const disk_5 = Object.assign({}, stats[e]);
			
			disk_5.CR = Number((disk_5.CR * disk_CR).toFixed(1));
			disk_5.CA = Number((disk_5.CA * disk_CA).toFixed(1));
			
			for ( let f = 0; f < stats.length; f++) {
			const disk_6 = Object.assign({}, stats[f]);

			if (m == 0) {
				disk_6.CR = disk_6_slot.CR;
				disk_6.CA = Number((disk_6.CA * disk_CA).toFixed(1));
			}
			if (m == 1) {
				disk_6.CR = Number((disk_6.CR * disk_CR).toFixed(1));
				disk_6.CA = disk_6_slot.CA;
			}

			const CR = Number((disk_1.CR + disk_2.CR + disk_3.CR + disk_4.CR + disk_5.CR + disk_6.CR + wengine[w].CR).toFixed(2));
			const CA = Number((disk_1.CA + disk_2.CA + disk_3.CA + disk_4.CA + disk_5.CA + disk_6.CA + wengine[w].CA).toFixed(2));

			const CA_CR_RATIO =  Number( (CA / CR).toFixed(2) );


			disk_sets.push({ disks: [disk_1, disk_2, disk_3, disk_4, disk_5, disk_6], wengine: wengine[w], CA, CR, CA_CR_RATIO });

	}}}}}}}}

	for (let disk of disk_sets) {
		disk.dps = 0;
		disk.success_atacks = 0;
		for (let a = 0; a < atacks_count; a++) {
			const success_atack = Math.random() < (disk.CR * 0.01);
			disk.success_atacks += success_atack ? 1 : 0;
			disk.dps = disk.dps + damage * ( success_atack ? (disk.CA + 100) * 0.01 : 1) ;
		}
		disk.success_atacks =  Number( (disk.success_atacks / atacks_count).toFixed(2) );
		disk.dps =  Number( (disk.dps / atacks_count).toFixed(2) );
	}

	disk_sets.sort((a, b) => b.dps - a.dps && (b.success_atacks <= (b.CR / 100)) && (a.success_atacks <= (a.CR / 100)) );

	console.log("Top 10 disk sets with the highest damage per attack:");

	for (let i = 0; i < 10; i++) {
		console.log(disk_sets[i]);
		console.log("---------------------------------");
		console.log("");
	}

}

calculate(3000, 10000, disk_stats_3_stats);