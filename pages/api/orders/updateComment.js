import prisma from "@/prisma/client";
const updateComment = async (req, res) => {
	try {
		const body = req.body;
		const newOrder = await prisma.orders.update({
			where: {
				id: body.id
			},
			data: {
				comment: body.comment
			}
		})
		return res.status(200).json({ message: 'Good', data: newOrder})

	} catch (e) {
		throw e;
	}
}

export default async function handler(req, res) {
	try {
		const requestMethod = req.method;
		switch (requestMethod) {
			case 'PUT':
				return await updateComment(req, res);
			default:
				return res.status(500).json({message: 'Unsupported method'})
		}
	} catch (e) {
		console.log(e)
		res.status(500).json({message: e.message})
	}
}