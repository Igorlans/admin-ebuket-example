export const apiRequest = async (url, data, method  = 'POST') => {
	try {
		console.log("BODY", data)
		const res = await fetch(url, {
			method: method,
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		})
		const json = await res.json();
		if (!res.ok) throw new Error(json.message)
		return json?.data;
	} catch (e) {
		throw e;
	}
}