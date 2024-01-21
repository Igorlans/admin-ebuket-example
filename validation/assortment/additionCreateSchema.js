import * as yup from 'yup';

export const additionCreateSchema = yup.object().shape({
	name: yup.string().required('Поле обов\'язкове'),
	type_addition: yup.string().required('Поле обов\'язкове'),
	prefer_free: yup.boolean().optional(),
	price: yup.string().when('prefer_free', {
		is: false,
		then: yup.string().required('Поле обов\'язкове'),
		otherwise: yup.string().optional()
	}),
	// img_hash: yup.string().required('Поле обов\'язкове'),
})

// model Addition {
// 	id Int @id @default(autoincrement())
//
// 	idStore Store @relation(fields: [storeId], references: [id])
// 	storeId Int
//
// 	name String @db.VarChar(60)
//
// 	type_addition String  @db.VarChar(40)
// 	price         Int
// 	prefer_free   Boolean
// 	img_hash      String  @db.VarChar(50)
//
// 	status_moderation String  @db.VarChar(50)
// 	prefer_stock      Boolean @default(true)
// }