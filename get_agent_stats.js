module.exports = (skill, agent_stats, agent_data ) => {
	const action = require('./modify_stats/' + agent_stats.name );
	return action(skill, agent_stats, agent_data);
}