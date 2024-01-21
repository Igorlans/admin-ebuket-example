import prisma from "@/prisma/client";
import {updateBuketPrices} from "@/utils/updateBuketPrices";
const updatePrice = async (req, res) => {
	try {
		const body = req.body;
		const newStoreFlower = await prisma.store_flower.update({
			where: {
				id: body.id
			},
			data: {
				price: body.price
			}
		})

		const buketsWithStoreFlower = await prisma.buketFlower.findMany({
			where: {
				store_flowers: {
					id: body.id,
				},
			},
			select: {
				idBuket: true,
			},
		});

		const buketIds = buketsWithStoreFlower.map((bf) => bf.idBuket);
		await updateBuketPrices(buketIds);
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
				return await updatePrice(req, res);
			default:
				return res.status(500).json({message: 'Unsupported method'})
		}
	} catch (e) {
		console.log(e)
		res.status(500).json({message: e.message})
	}
}