import prisma from "@/prisma/client";

const createBuket = async (req, res) => {
	try {

		const body = req.body;
		console.log(body)

		// res.status(200).json(body)

		const createBuket = prisma.buket.create({
			data: {
				name_buket: body.name_buket,
				name_buket_ru: body.name_buket_ru,
				category_buket: body.category_buket,
				size_width: body.size_width,
				size_height: body.size_height,
				time_build: body.time_build,
				prefer_stock: true,
				images_hash: body.images_hash,
				price: body.price,
				storeId: body.storeId,
				occasions: {
					create: body.occasions
				},
				buket_flower: {
					create: body.buket_flower
				},
				buket_decors: {
					create: body.buket_decor
				},
				buket_addition: {
					create: body.buket_addition
				}
			}
		})

		const updateStep = prisma.store.update({
			where: {
				id: body.storeId
			},
			data: {
				verified: true,
			}
		})

		const [newBuket] = await prisma.$transaction([createBuket, updateStep])

		res.status(200).json({ message: 'Good', data: newBuket})
	} catch (e) {
		throw e;
	}
}

const updateBuket = async (req, res) => {
	try {

		const body = req.body;
		console.log(body)

		// res.status(200).json(body)
		const deleteOccasions = prisma.buketOccasion.deleteMany({
			where: {
				buketId: body.id
			}
		})
		const deleteFlowers = prisma.buketFlower.deleteMany({
			where: {
				idBuket: body.id
			}
		})
		const deleteDecors = prisma.buketDecors.deleteMany({
			where: {
				idBuket: body.id
			}
		})
		const deleteAdditions = prisma.buketAddition.deleteMany({
			where: {
				idBuket: body.id
			}
		})

		const updateBuket = prisma.buket.update({
			where: {
				id: body.id
			},
			data: {
				name_buket: body.name_buket,
				name_buket_ru: body.name_buket_ru,
				category_buket: body.category_buket,
				size_width: body.size_width,
				size_height: body.size_height,
				time_build: body.time_build,
				prefer_stock: true,
				images_hash: body.images_hash,
				price: body.price,
				storeId: body.storeId,
				status_moderation: 'ON_MODERATION',
				occasions: {
					create: body.occasions
				},
				buket_flower: {
					create: body.buket_flower
				},
				buket_decors: {
					create: body.buket_decor
				},
				buket_addition: {
					create: body.buket_addition
				}
			}
		})

		const [deletedOccasions, deletedFlowers, deletedAdditions, deletedDecors, updatedBuket] = await prisma.$transaction([deleteOccasions, deleteFlowers, deleteAdditions, deleteDecors, updateBuket])

		res.status(200).json({ message: 'Good', data: updatedBuket})
	} catch (e) {
		throw e;
	}
}

export default async function handler(req, res) {
	try {
		const requestMethod = req.method;
		switch (requestMethod) {
			case 'POST':
				return await createBuket(req, res);
			case 'PUT':
				return await updateBuket(req, res);
			default:
				return res.status(500).json({message: 'Unsupported method'})
		}
	} catch (e) {
		console.log(e)
		res.status(500).json({message: e.message})
	}
}
