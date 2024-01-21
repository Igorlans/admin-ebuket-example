import * as yup from "yup";

export const paymentsFormSchema = yup.object().shape({
	prefer_cash: yup.boolean().optional().nullable(),
	prefer_prepayment: yup.boolean().optional().nullable(),
	prefer_all_payment: yup.boolean().optional().nullable(),
	prefer_crypto: yup.boolean().optional().nullable(),
	prefer_payment_number: yup.boolean().optional().nullable(),
	prefer_cashless: yup.boolean().optional().nullable(),

	sum_prepayment: yup.string().optional().when("prefer_prepayment", {
		is: true,
		then: yup.string().required('Поле обов\'язкове').nullable()
	}),
	payment_card: yup.string().optional().nullable(),
	fio_card: yup.string().optional().nullable(),
	name_bank: yup.string().when("prefer_all_payment", {
		is: true,
		then: yup.string().required('Поле обов\'язкове').nullable()
	}).nullable(),
	payment_number: yup.string().when("prefer_payment_number", {
		is: true,
		then: yup.string().required('Поле обов\'язкове').matches(/^[A-Z]{2}[0-9]{2}[a-zA-Z0-9]{1,30}$/, 'Неправильний формат').nullable()
	}).optional().nullable()
})

// model Payment {
// 	id Int @id @default(autoincrement())
//
// 	idStore Store @relation(fields: [storeId], references: [id])
// 	storeId Int
// 	cityId  Int
//
// 	prefer_cash       Boolean
// 	prefer_prepayment Boolean
// 	sum_prepayment    Int?
//
// 		prefer_all_payment Boolean
// 	payment_card       String? @db.VarChar(25)
// 		fio_card           String? @db.VarChar(60)
// 		name_bank          String  @db.VarChar(25)
//
// 	prefer_payment_number Boolean
// 	payment_number        String  @db.VarChar(50)
//
// 	prefer_cashless Boolean
// 	prefer_crypto   Boolean
// }