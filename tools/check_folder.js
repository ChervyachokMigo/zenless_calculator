const { existsSync, mkdirSync } = require('fs');

module.exports = (folder_path) => {
	if (!existsSync(folder_path)) {
		mkdirSync(folder_path, { recursive: true });
	}
}