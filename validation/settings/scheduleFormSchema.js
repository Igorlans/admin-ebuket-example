import * as yup from "yup";

const daySchema = yup.object().shape({
	isWeekend: yup.boolean().optional(),
	opening: yup.string(),
	closing: yup.string(),
})
const daySchemaRequired = yup.object().shape({
	isWeekend: yup.boolean().optional(),
	opening: yup.string().when('isWeekend', {
		is: false,
		then: yup.string().required('Поле обов\'язкове'),
		otherwise: yup.string()
	}),
	closing: yup.string().when('isWeekend', {
		is: false,
		then: yup.string().required('Поле обов\'язкове'),
		otherwise: yup.string(),
	})
})


export const scheduleFormSchema = yup.object().shape({
	order_schedule: yup.object().shape({
		advanced: yup.boolean().optional(),
		weekdays: daySchema.when('advanced', {
			is: false,
			then: daySchemaRequired,
			otherwise: daySchema
		}),
		weekends: daySchema.when('advanced', {
			is: false,
			then: daySchemaRequired,
			otherwise: daySchema
		}),

		monday: daySchema.when('advanced', {
			is: true,
			then: daySchemaRequired,
			otherwise: daySchema
		}),
		tuesday: daySchema.when('advanced', {
			is: true,
			then: daySchemaRequired,
			otherwise: daySchema
		}),
		wednesday: daySchema.when('advanced', {
			is: true,
			then: daySchemaRequired,
			otherwise: daySchema
		}),
		thursday: daySchema.when('advanced', {
			is: true,
			then: daySchemaRequired,
			otherwise: daySchema
		}),
		friday: daySchema.when('advanced', {
			is: true,
			then: daySchemaRequired,
			otherwise: daySchema
		}),
		saturday: daySchema.when('advanced', {
			is: true,
			then: daySchemaRequired,
			otherwise: daySchema
		}),
		sunday: daySchema.when('advanced', {
			is: true,
			then: daySchemaRequired,
			otherwise: daySchema
		}),
	}),
	couriers_schedule: yup.object().shape({
		advanced: yup.boolean().optional(),
		weekdays: daySchema.when('advanced', {
			is: false,
			then: daySchemaRequired,
			otherwise: daySchema
		}),
		weekends: daySchema.when('advanced', {
			is: false,
			then: daySchemaRequired,
			otherwise: daySchema
		}),
		monday: daySchema.when('advanced', {
			is: true,
			then: daySchemaRequired,
			otherwise: daySchema
		}),
		tuesday: daySchema.when('advanced', {
			is: true,
			then: daySchemaRequired,
			otherwise: daySchema
		}),
		wednesday: daySchema.when('advanced', {
			is: true,
			then: daySchemaRequired,
			otherwise: daySchema
		}),
		thursday: daySchema.when('advanced', {
			is: true,
			then: daySchemaRequired,
			otherwise: daySchema
		}),
		friday: daySchema.when('advanced', {
			is: true,
			then: daySchemaRequired,
			otherwise: daySchema
		}),
		saturday: daySchema.when('advanced', {
			is: true,
			then: daySchemaRequired,
			otherwise: daySchema
		}),
		sunday: daySchema.when('advanced', {
			is: true,
			then: daySchemaRequired,
			otherwise: daySchema
		}),
	}),
})

// model Store_schedule {
// 	id Int @id @default(autoincrement())
//
// 	idStore Store @relation(fields: [storeId], references: [id])
// 	storeId Int
// 	cityId  Int
//
// 	order_schedule    Json
// 	couriers_schedule Json
// }