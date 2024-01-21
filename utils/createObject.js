export default function createObject(...keys) {
	let obj = {};
	for (let key of keys) {
		let putInto = obj;
		let tokens = key.split('.');
		for (let i = 0; i < tokens.length; i++) {
			let name = tokens[i];
			let value = (i === tokens.length - 1) ? '' : {};
			putInto[name] = putInto[name] || value;
			putInto = putInto[name];
		}
	}
	return obj;
}