const post = async ({ hostname = document.location.origin, url_path, args }) => {
	const url = `${hostname}/${url_path}`;
	return new Promise ( (res ,rej) => {
		console.log('fetch', url);
		fetch( url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(args)
		}).then( response => response.json())
		.then( data => res (data))
		.catch( error => {
			console.log(error)
			rej({ error });
		});
	});
}

