const path = require('path');

module.exports = (skill, agent_stats, agent_data ) => {
	const action = require( path.join( '..', 'modify_stats', agent_stats.name) );
	return action(skill, agent_stats, agent_data);
}