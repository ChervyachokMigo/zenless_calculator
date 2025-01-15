const { set_charge, set_stan } = require("./atacker_stats");

module.exports = (effects) => {
	if (!effects) effects = {};
	if (typeof effects?.stun === 'undefined') effects.stun = false;
	if (typeof effects?.charge_count === 'undefined') effects.charge_count = 0;
	set_stan( effects.stun );	
	set_charge( effects.charge_count );
}