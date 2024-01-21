import prisma from "@/prisma/client";
import {updateBuketPrices} from "@/utils/updateBuketPrices";
const createDecor = async (req, res) => {
	try {

		const body = req.body;
		console.log(body)

		const newDecor = await prisma.Decor.create({
			data: {
				characteristic:     body.characteristic,
				price:              body.price,
				comment:            body.comment,
				title:              body.title,
				storeId: body.storeId

			}
		})
		res.status(200).json({ message: 'Good', data: newDecor})
	} catch (e) {
		throw e;
	}
}

const updateDecor = async (req, res) => {
	try {

		const body = req.body;
		console.log(body)

		const newDecor = await prisma.decor.update({
			where: {
				id: body.id
			},
			data: {
				characteristic:     body.characteristic,
				price:              body.price,
				comment:            body.comment,
				title:              body.title,
			}
		})

		if (body?.oldPrice !== body?.price) {
			const buketsWithDecors = await prisma.buketDecors.findMany({
				where: {
					idDecor: body.id
				},
				select: {
					idBuket: true,
				},
			});

			const buketIds = buketsWithDecors.map((bf) => bf.idBuket);
			await updateBuketPrices(buketIds);
		}

		res.status(200).json({ message: 'Good', data: newDecor})
	} catch (e) {
		throw e;
	}
}

const deleteDecor = async (req, res) => {
	try {

		const {id} = req.query;

		const updateBukets = prisma.buket.updateMany({
			where: {
				buket_decors: {
					some: {
						idDecor: Number(id)
					}
				}
			},
			data: {
				prefer_stock: false
			}
		})

		const deleteBuketDecor = prisma.buketDecors.deleteMany({
			where: {
				idDecor: Number(id)
			}
		})

		const deleteDecor = prisma.decor.delete({
			where: {
				id: Number(id)
			}
		})

		const buketsWithDecors = await prisma.buketDecors.findMany({
			where: {
				idDecor: Number(id)
			},
			select: {
				idBuket: true,
			},
		});

		const buketIds = buketsWithDecors.map((bf) => bf.idBuket);
		const [updatedBukets, deletedBuketDecor, deletedDecor] = await prisma.$transaction([updateBukets, deleteBuketDecor, deleteDecor])
		await updateBuketPrices(buketIds);

		res.status(200).json({message: 'Good', data: deletedDecor})

	} catch (e) {
		throw e;
	}
}


export default async function handler(req, res) {
	try {
		const requestMethod = req.method;

		switch (requestMethod) {
			case 'POST':
				return await createDecor(req, res);
			case 'PUT':
				return await updateDecor(req, res);
			case 'DELETE':
				return await deleteDecor(req, res);
			default:
				return res.status(500).json({message: 'Unsupported method'})
		}
	} catch (e) {
		console.log(e)
		res.status(500).json({message: e.message})
	}
}
