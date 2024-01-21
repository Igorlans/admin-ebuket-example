export const getCityList = async (storeId) => {
	try {
		const res = await fetch(`/api/queries/getData?storeId=41&table=City`);
		const json = await res.json();
		return json.data;
	} catch (e) {

	}
}