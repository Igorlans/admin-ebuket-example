import prisma from "@/prisma/client";
import {SITE_URL} from "@/config";

// const prisma = new PrismaClient()
export async function getData(table) {
	try {
		const response = await fetch(`${SITE_URL}/api/queries/getData?table=${table}`)
		const jsonData = await response.json()
		return jsonData.data;
	} catch (e) {
		throw e;
	}
}

export default async function handler(req, res) {
	// res.status(200).json({ name: 'John Doe' })
		try {
			const requestMethod = req.method
			if (requestMethod == 'GET') {
			const body = req.query;
			console.log(body)

			// res.status(200).json(body)

			const resQuery = await prisma[body.table].findMany({})

			res.status(200).json({ message: 'Good', data: resQuery})
			}
		} catch (e) {
			console.log(e)
			// throw e;

			// const error = prismaCustomErrorHandler(e);
			// res.send(error);

			res.status(500).json({message: e})
		}
}
