const { select_agent, select_mindscape, set_skills_levels, set_stats } = require("./atacker_stats");
const set_status_effects = require("./set_status_effects");

module.exports = (stats) => {
	set_stats(stats)
	select_agent(stats.name);
	select_mindscape(stats.mindscape);
	set_skills_levels(stats.skill_levels);
	set_status_effects();
}