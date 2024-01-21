import prisma from "@/prisma/client";
const createOccasion = async (req, res) => {
	try {

		const body = req.body;

		const newOccasion = await prisma.occasion.create({
			data: {
				name: body.name,
				name_eng: body.name_eng,
				name_ru: body.name_ru,
			},
		})

		res.status(200).json({message: 'Good', data: newOccasion})
	} catch (e) {
		throw e;
	}
}
const updateOccasion = async (req, res) => {
	try {

		const body = req.body;
		console.log(body)

		const newOccasion = await prisma.occasion.update({
			where: {
				id: body.id
			},
			data: {
				name: body.name,
				name_eng: body.name_eng,
			},
		})

		res.status(200).json({message: 'Good', data: newOccasion})
	} catch (e) {
		throw e;
	}
}


const deleteOccasion = async (req, res) => {
	try {
		const {id} = req.query;
		console.log("QUERY", req.query)

		// res.status(200).json(body)
		const deletedOccasion = await prisma.occasion.update({
			where: {
				id: Number(id)
			},
			data: {
				deleted: true
			}
		})

		res.status(200).json({message: 'Good', data: deletedOccasion})
	} catch (e) {
		throw e;
	}
}

export default async function handler(req, res) {
	try {
		const requestMethod = req.method;
		switch (requestMethod) {
			case 'POST':
				return await createOccasion(req, res);
			case 'PUT':
				return await updateOccasion(req, res);
			case 'DELETE':
				return await deleteOccasion(req, res);
			default:
				return res.status(500).json({message: 'Unsupported method'})
		}
	} catch (e) {
		console.log(e)
		res.status(500).json({message: e.message})
	}
}
