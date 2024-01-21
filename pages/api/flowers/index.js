import prisma from "@/prisma/client";
import {updateBuketPrices} from "@/utils/updateBuketPrices";
const createFlower = async (req, res) => {
	try {

		const body = req.body;
		console.log(body)

		const newFlower = await prisma.flowers.create({
			data: {
				title_ua: body.title_ua,
				title_ru: body.title_ru,
				title_eng: body.title_eng,
			},
		})

		res.status(200).json({message: 'Good', data: newFlower})
	} catch (e) {
		throw e;
	}
}
const updateFlower = async (req, res) => {
	try {

		const body = req.body;
		console.log(body)

		const newFlower = await prisma.flowers.update({
			where: {
				id: Number(body.id)
			},
			data: {
				deleted: body.deletePos
			},
		})

		res.status(200).json({message: 'Good', data: newFlower})
	} catch (e) {
		throw e;
	}
}

const deleteFlower = async (req, res) => {
	try {
		const {id} = req.query;
		console.log("QUERY", req.query)

		// res.status(200).json(body)
		const deletedStoreFlower = await prisma.Flowers.delete({
			where: {
				id: Number(id)
			}
		})

		res.status(200).json({message: 'Good', data: deletedStoreFlower})
	} catch (e) {
		throw e;
	}
}

export default async function handler(req, res) {
	try {
		const requestMethod = req.method;
		switch (requestMethod) {
			case 'POST':
				return await createFlower(req, res);
			case 'PUT':
				return await updateFlower(req, res);
			case 'DELETE':
				return await deleteFlower(req, res);
			default:
				return res.status(500).json({message: 'Unsupported method'})
		}
	} catch (e) {
		console.log(e)
		res.status(500).json({message: e.message})
	}
}
