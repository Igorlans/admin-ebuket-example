export const createStoreFlower = async (data) => {
        try {
            console.log("BODY", data)
            const res = await fetch('/api/assortment/flowers', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const json = await res.json();
            if (!res.ok) throw new Error(json.message)
            return json.data;
        } catch (e) {
            throw e
        }
}