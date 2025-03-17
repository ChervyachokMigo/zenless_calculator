const bodyParser = require('body-parser');
const express = require('express');
const { readFileSync } = require('fs');
const path = require('path');
const set_agent = require('../tools/set_agent');
const { set_target } = require('../tools/target');
const { levels_12 } = require('../consts/skill_levels_preset');
const { sadgod_2_anby } = require('../presets');
const calc_agent = require('../calc_agent');
const { set_stats_effect } = require('../tools/atacker_stats');
const { compare_results, clear_results } = require('../tools/results');

let app = null;

const div_insert = (data, classname, content) => {
	const reg = new RegExp(`<div class="${classname}">(.*)<\/div>`, 'g');
	const replace_content = `<div class="${classname}">${content}<\/div>`;

	return data.replace(reg, replace_content);
}

const host = '127.0.0.1';

const start_webserver = (port, public_path = path.join(__dirname, 'public')) => {
	const app = express();

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

	app.on('error', (e) => {
		if (e.code === 'EADDRINUSE') {
			console.error('Address in use, retrying...');
			rej('Address in use, retrying...');
		}
	});

	app.use(express.static( public_path ));

	app.listen(port, host,  () => {
		console.log(`http://${host}:${port}`);
	});

	return app;
}

const check_number = (val) => {
	if (!val) {
		return 0;
	}
	const is_nan = isNaN(Number(val));
	if (is_nan) {
        return 0;
    }
	return Number(val);
}

module.exports = {
	start_webserver: async () => {
		const web_app = start_webserver(3000);
		web_app.post('/set_agent_stats',async (req, res) => {
			const request_data = req.body;

			const agent_args = { 
				name: request_data.agent_name, 
				mindscape: check_number(request_data.agent_mindscape), 
				skill_levels: levels_12,
				ATK: check_number(request_data.agent_atk),
				crit_chance: check_number(request_data.agent_crit_rate)/100,
				crit_damage: check_number(request_data.agent_crit_dmg)/100,
				PEN: check_number(request_data.agent_pen),
				PEN_ratio: check_number(request_data.agent_pen_ratio)/100,
				RES_ignore: check_number(request_data.agent_res_ignore),
				//crit_mode:crit_mode.force,
				//crit_mode:crit_mode.none,
				atribute_bonus_damage: {
					physical: check_number(request_data.agent_attribute_physical)/100,
					frost: check_number(request_data.agent_attribute_ice)/100,
					fire: check_number(request_data.agent_attribute_fire)/100,
					electric: check_number(request_data.agent_attribute_electric)/100,
					ether: check_number(request_data.agent_attribute_ether)/100,
				}
			};

			clear_results();

			set_target('hati', 70);

			sadgod_2_anby();

			set_agent(agent_args);
			set_stats_effect({
				ATK: 1363,
				crit_chance: 0.22 + 0.2, 		
				crit_damage: 0.6 + 0.4,		
				atribute_bonus_damage: {
					electric: 0.45
				}
			});
			calc_agent();
			
			const result = compare_results();

			res.send( result );
		});
;	},
}
