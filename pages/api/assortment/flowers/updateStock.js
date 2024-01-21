import prisma from "@/prisma/client";
const updateStock = async (req, res) => {
	try {
		const body = req.body;
		const newStoreFlower = await prisma.store_flower.update({
			where: {
				id: body.id
			},
			data: {
				prefer_stock: body.prefer_stock
			}
		})
		return res.status(200).json({ message: 'Good', data: newStoreFlower})
	} catch (e) {
		throw e;
	}
}

export default async function handler(req, res) {
	try {
		const requestMethod = req.method;
		switch (requestMethod) {
			case 'PUT':
				await updateStock(req, res);
				break;
			default:
				res.status(500).json({message: 'Unsupported method'})
				break;
		}
	} catch (e) {
		console.log(e)
		res.status(500).json({message: e.message})
	}
}