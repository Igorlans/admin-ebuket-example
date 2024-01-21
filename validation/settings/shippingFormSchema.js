import * as yup from "yup";



export const shippingFormSchema = yup.object().shape({
	cityId: yup.string().optional().nullable(),
	prefer_courier: yup.boolean().optional().nullable(),
	time_delivery: yup.string().optional().when("prefer_courier", {
		is: true,
		then: yup.string().required('Поле обов\'язкове').nullable()
	}).nullable(),
	price_delivery: yup.string().optional().when("prefer_courier", {
		is: true,
		then: yup.string().required('Поле обов\'язкове').nullable()
	}).nullable(),
	prefer_free_from: yup.boolean().optional().nullable(),
	free_delivery_from: yup.string().optional().when("prefer_free_from", {
		is: true,
		then: yup.string().required('Поле обов\'язкове').nullable()
	}).nullable(),
	Delivery_rates: yup.array().of(yup.object().shape({
		rate_price_delivery: yup.string().required('Поле обов\'язкове').nullable(),
		time_from: yup.string().required('Поле обов\'язкове').matches(/^\d{2}:\d{2}$/, 'Неправильний формат').nullable(),
		time_to: yup.string().required('Поле обов\'язкове').matches(/^\d{2}:\d{2}$/, 'Неправильний формат').nullable(),
		rate_prefer_free_from: yup.boolean().nullable(),
		rate_free_delivery_from: yup.string().optional().when("rate_prefer_free_from", {
			is: true,
			then: yup.string().required('Поле обов\'язкове').nullable()
		}).nullable(),
	})).nullable(),
	divergence_time: yup.string().optional().nullable(),
	Pickup_list: yup.array().of(yup.object().shape({
		address: yup.string().required('Поле обов\'язкове').nullable(),
		weekdays_time_from: yup.string().required('Поле обов\'язкове').matches(/^\d{2}:\d{2}$/, 'Неправильний формат').nullable(),
		weekdays_time_to: yup.string().required('Поле обов\'язкове').matches(/^\d{2}:\d{2}$/, 'Неправильний формат').nullable(),
		weekend_time_from: yup.string().required('Поле обов\'язкове').matches(/^\d{2}:\d{2}$/, 'Неправильний формат').nullable(),
		weekend_time_to: yup.string().required('Поле обов\'язкове').matches(/^\d{2}:\d{2}$/, 'Неправильний формат').nullable(),
		type_payment: yup.string().optional().nullable(),
	})).nullable(),
	prefer_in_time: yup.boolean().optional().nullable(),
	type_in_time: yup.string().optional().nullable(),
	price_in_time: yup.string().optional().when("type_in_time", {
		is: 'Платна',
		then: yup.string().required('Поле обов\'язкове').nullable()
	}).nullable(),
	repeat_delivery: yup.boolean().optional().nullable(),
	type_repeat_delivery: yup.string().optional().nullable(),
	price_in_repeat: yup.string().optional().when("type_repeat_delivery", {
		is: 'Платна',
		then: yup.string().required('Поле обов\'язкове').nullable()
	}).nullable(),

})

// model Delivery {
// 	id                  Int       @id @default(autoincrement())
//
// 	idStore             Store     @relation(fields: [storeId], references: [id])
// 	storeId             Int
// 	cityId              Int
// 	prefer_courier      Boolean
// 	time_delivery       String    @db.VarChar(10)
// 	price_delivery      String    @db.VarChar(10)
// 	free_delivery_from  String    @db.VarChar(10)
// 	advanced_delivery   Boolean
// 	divergence_time     String    @db.VarChar(70)
//
// 	prefer_pickup       Boolean
//
// 	prefer_in_time      Boolean
// 	price_in_time       String    @db.VarChar(25)
//
// 	repeat_delivery     Boolean
// 	price_in_repeat     String    @db.VarChar(10)
//
// 	Delivery_rates      Delivery_rates[]
// 	Pickup_list         Pickup_list[]
// }
//
//
// model Delivery_rates {
// 	id                  Int       @id @default(autoincrement())
// 	deliveryId          Delivery  @relation(fields: [idDeliver], references: [id])
// 	idDeliver           Int
// 	time_from           String    @db.VarChar(5)
// 	time_to             String    @db.VarChar(5)
// 	price_delivery      String    @db.VarChar(10)
// 	free_delivery_from  String    @db.VarChar(10)
// }
//
// model Pickup_list {
// 	id                  Int       @id @default(autoincrement())
// 	deliveryId          Delivery  @relation(fields: [idDeliver], references: [id])
// 	idDeliver           Int
// 	address             String    @db.VarChar(50)
// 	weekdays_time_from  String    @db.VarChar(5)
// 	weekdays_time_to    String    @db.VarChar(5)
// 	weekend_time_from   String    @db.VarChar(5)
// 	weekend_time_to     String    @db.VarChar(5)
// 	type_payment        String    @db.VarChar(15)
// }