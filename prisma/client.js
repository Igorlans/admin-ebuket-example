import { PrismaClient } from "@prisma/client";


const prisma = global.prisma  ||  new PrismaClient()

if(process.env.NODE_ENV === "development") global.prisma = prisma

prisma.$use(async (params, next) => {
	// Check incoming query type
	if (params.model == 'Buket') {
		if (params.action == 'delete') {
			// Delete queries
			// Change action to an update
			params.action = 'update'
			params.args['data'] = { deleted: true }
		}
		if (params.action == 'deleteMany') {
			// Delete many queries
			params.action = 'updateMany'
			if (params.args.data != undefined) {
				params.args.data['deleted'] = true
			} else {
				params.args['data'] = { deleted: true }
			}
		}
	}
	return next(params)
})

prisma.$use(async (params, next) => {
	// Check incoming query type
	if (params.model == 'Occasion') {
		if (params.action == 'delete') {
			// Delete queries
			// Change action to an update
			params.action = 'update'
			params.args['data'] = { deleted: true }
		}
		if (params.action == 'deleteMany') {
			// Delete many queries
			params.action = 'updateMany'
			if (params.args.data != undefined) {
				params.args.data['deleted'] = true
			} else {
				params.args['data'] = { deleted: true }
			}
		}
	}
	return next(params)
})

prisma.$use(async (params, next) => {
	// Check incoming query type
	if (params.model == 'Flowers') {
		if (params.action == 'delete') {
			// Delete queries
			// Change action to an update
			params.action = 'update'
			params.args['data'] = { deleted: true }
		}
		if (params.action == 'deleteMany') {
			// Delete many queries
			params.action = 'updateMany'
			if (params.args.data != undefined) {
				params.args.data['deleted'] = true
			} else {
				params.args['data'] = { deleted: true }
			}
		}
	}
	return next(params)
})

export default prisma
