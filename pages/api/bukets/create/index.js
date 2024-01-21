import prisma from "@/prisma/client";
import {SITE_URL} from "@/config";

// const prisma = new PrismaClient()
// export async function getCreateBuketData(store) {
//
// 	return jsonData
// }
export default async function handler(req, res) {

	// res.status(200).json({ name: 'John Doe' })
	const requestMethod = req.method

	if (requestMethod === 'GET') {
		try {
			const body = req.query;
			const data = await prisma.Store.findUnique({
				where: {
					id: Number(body.storeId),
				},
				select: {
					Store_flower: {
						include: {
							flower: true
						}
					},
					Addition: true,
					Decor: true,
				}
			})
			return res.status(200).json({ message: 'Good', data})

		} catch (e) {
			console.log(e)
			// throw e;

			// const error = prismaCustomErrorHandler(e);
			// res.send(error);

			return res.status(500).json({message: e})
		}

	}


}
