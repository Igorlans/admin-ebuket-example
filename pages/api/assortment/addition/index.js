import prisma from "@/prisma/client";
const createAddition = async (req, res) => {
	try {
		const body = req.body;
		const newAddition = await prisma.Addition.create({
			data: {
				name: body.name,
				type_addition: body.type_addition,
				price: body.price,
				prefer_free: body.prefer_free,
				status_moderation: 'active',
				image: body.image,
				storeId: body.storeId
			}
		})

		res.status(200).json({ message: 'Good', data: newAddition})

	} catch (e) {
		throw e;
	}
}

const updateAddition = async (req, res) => {
	try {
		const body = req.body;

		const newAddition = await prisma.addition.update({
			where: {
				id: body.id
			},
			data: {
				name: body.name,
				type_addition: body.type_addition,
				price: body.price,
				prefer_free: body.prefer_free,
				status_moderation: 'active',
				image: body.image,
			}
		})

		res.status(200).json({message: 'Good', data: newAddition})

	} catch (e) {
		throw e;
	}
}

const deleteAddition = async (req, res) => {
	try {
		const {id} = req.query;

		const deleteBuketAddition = prisma.buketAddition.deleteMany({
			where: {
				idAddition: Number(id)
			}
		})
		const deleteAddition = prisma.addition.delete({
			where: {
				id: Number(id)
			}
		})

		const [deletedBuketAddition, deletedAddition] = await prisma.$transaction([deleteBuketAddition, deleteAddition])

		res.status(200).json({ message: 'Good', data: deletedAddition})
	} catch (e) {
		throw e;
	}
}
export default async function handler(req, res) {
	try {
		const requestMethod = req.method;
		switch (requestMethod) {
			case 'POST':
				return await createAddition(req, res);
			case 'PUT':
				return await updateAddition(req, res);
			case 'DELETE':
				return await deleteAddition(req, res);
			default:
				return res.status(500).json({message: 'Unsupported method'})
		}
	} catch (e) {
		console.log(e)
		res.status(500).json({message: e.message})
	}
}