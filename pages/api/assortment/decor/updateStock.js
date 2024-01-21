import prisma from "@/prisma/client";
const updateStock = async (req, res) => {
	try {

		const body = req.body;
		const updatedDecor = await prisma.decor.update({
			where: {
				id: body.id
			},
			data: {
				prefer_stock: body.prefer_stock
			}
		})

		res.status(200).json({message: 'Good', data: updatedDecor})

	} catch (e) {
		throw e;
	}
}


export default async function handler(req, res) {
	try {
		const requestMethod = req.method;

		switch (requestMethod) {
			case 'PUT':
				return await updateStock(req, res);
			default:
				return res.status(500).json({message: 'Unsupported method'})
		}
	} catch (e) {
		console.log(e)
		res.status(500).json({message: e.message})
	}
}
