import prisma from "@/prisma/client";
import dayjs from "dayjs";
const createSeo = async (req, res) => {
	try {

		const body = req.body;
		console.log(body)

		const newSeo = await prisma.seo.create({
			data: {
				heading: body.heading,
				heading_ru: body.heading_ru,
				url: body.url,
				title: body.title,
				title_ru: body.title_ru,
				complexity: body.complexity,
				description: body.description,
				description_ru: body.description_ru,
				lastChange: String(dayjs(new Date()).valueOf()),
				pageText: body.pageText,
				pageText_ru: body.pageText_ru
			},
		})

		res.status(200).json({message: 'Good', data: newSeo})
	} catch (e) {
		throw e;
	}
}
const updateSeo = async (req, res) => {
	try {

		const body = req.body;

		const updatedSeo = await prisma.seo.update({
			where: {
				id: body.id
			},
			data: {
				heading: body.heading,
				heading_ru: body.heading_ru,
				url: body.url,
				title: body.title,
				title_ru: body.title_ru,
				complexity: body.complexity,
				description: body.description,
				description_ru: body.description_ru,
				lastChange: String(dayjs(new Date()).valueOf()),
				pageText: body.pageText,
				pageText_ru: body.pageText_ru
			},
		})

		res.status(200).json({message: 'Good', data: updatedSeo})
	} catch (e) {
		throw e;
	}
}

const deleteSeo = async (req, res) => {
	try {
		const {id} = req.query;
		console.log("QUERY", req.query)

		// res.status(200).json(body)
		const deletedSeo = await prisma.seo.delete({
			where: {
				id
			}
		})

		res.status(200).json({message: 'Good', data: deletedSeo})
	} catch (e) {
		throw e;
	}
}

export default async function handler(req, res) {
	try {
		const requestMethod = req.method;
		switch (requestMethod) {
			case 'POST':
				return await createSeo(req, res);
			case 'PUT':
				return await updateSeo(req, res);
			case 'DELETE':
				return await deleteSeo(req, res);
			default:
				return res.status(500).json({message: 'Unsupported method'})
		}
	} catch (e) {
		console.log(e)
		res.status(500).json({message: e.message})
	}
}
