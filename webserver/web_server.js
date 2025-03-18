const bodyParser = require('body-parser');
const express = require('express');
const { readFileSync, writeFileSync, readdirSync } = require('fs');
const path = require('path');
const set_agent = require('../tools/set_agent');
const { set_target } = require('../tools/target');
const calc_agent = require('../calc_agent');
const { set_stats_effect } = require('../tools/atacker_stats');
const { compare_results, clear_results } = require('../tools/results');
const { get_agent_stats, transform_agent_stats } = require('./web_server_tools');
const check_folder = require('../tools/check_folder');

const host = '127.0.0.1';

const presets_path = path.join(__dirname, '..', 'userdata', 'presets');

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

const set_general_effects = () => {
	set_stats_effect({
		ATK: 1363,
		crit_chance: 0.22 + 0.2, 		
		crit_damage: 0.6 + 0.4,		
		atribute_bonus_damage: {
			electric: 0.45
		}
	});
}


module.exports = {
	start_webserver: async () => {
		const web_app = start_webserver(3000);

		check_folder(presets_path);

		web_app.post('/set_agent_stats',async (req, res) => {
			const request_data = req.body;

			if (!request_data.first || !request_data.second){
				res.send({ error: 'Ошибка: Отсутствует агент'});
                return;
			}

			const first_agent_stats = get_agent_stats(request_data.first);
			const second_agent_stats = get_agent_stats(request_data.second);

			clear_results();

			set_target('hati', 70);

			set_agent(first_agent_stats);
			set_general_effects();
			calc_agent();

			set_agent(second_agent_stats);
			set_general_effects();
			calc_agent();
			
			const result = compare_results();

			res.send( result );
		});

		web_app.post('/save_preset',async (req, res) => {
			const request_data = req.body;

			if (!request_data.name || !request_data.values){
				res.send({ error: 'Ошибка: Отсутствует пресет'});
                return;
			}

			const preset = {
				name: request_data.name,
                values: transform_agent_stats(get_agent_stats(request_data.values))
			}

			const filename = new Date().valueOf() + '.json';

			console.log(preset);

			writeFileSync(path.join(presets_path, filename), JSON.stringify(preset, null, 4), { encoding: 'utf8' });

			const result = { result: true };

			res.send( result );
		});

		web_app.post('/load_preset_list', async (req, res) => {
            //const request_data = req.body;
			const preset_files = readdirSync(presets_path, { encoding: 'utf8' });
			const presets = preset_files.map( filename => 
				JSON.parse(readFileSync(path.join(presets_path, filename), { encoding: 'utf8' })));
            res.send( presets );
		});
;	},
}
