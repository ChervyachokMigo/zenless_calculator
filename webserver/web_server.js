const express = require('express');
const { readFileSync } = require('fs');
const path = require('path');

let app = null;

const div_insert = (data, classname, content) => {
	const reg = new RegExp(`<div class="${classname}">(.*)<\/div>`, 'g');
	const replace_content = `<div class="${classname}">${content}<\/div>`;

	return data.replace(reg, replace_content);
}

module.exports = {
	init_webserver: (port = 3000) => {
		app = express();
		
		app.get('/', (req, res) => {
			let filedata = readFileSync(path.join(__dirname, 'public', 'index.html'), { encoding: 'utf8'});
			const agent_miyabi = `<div class="agent_icon"><img src="images/agent/miyabi.png" /></div>`;
			filedata = div_insert(filedata, 'agent_list', agent_miyabi);
			console.log(filedata);
            res.send(filedata);
		});

		app.use(express.static(path.join(__dirname, 'public')));

		app.listen(port, () => {
			console.log(`http://localhost:${port}`);
		});
	}
}
