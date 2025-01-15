const { select_agent, select_mindscape, set_skills_levels } = require("./atacker_stats");
const set_status_effects = require("./set_status_effects");

module.exports = ({ name, mindscape, skill_levels }) => {
	select_agent(name);
	select_mindscape(mindscape);
	set_skills_levels(skill_levels);
	set_status_effects();
}