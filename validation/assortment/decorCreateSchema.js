import * as yup from 'yup';

export const decorCreateSchema = yup.object().shape({
	title: yup.string().required('Поле обов\'язкове'),
	characteristic: yup.string().required('Поле обов\'язкове'),
	price: yup.string().required('Поле обов\'язкове'),
	comment: yup.string().optional(),
})

// model Addition {
// 	id Int @id @default(autoincrement())
//
// 	idStore Store  @relation(fields: [storeId], references: [id])
// 	storeId Int
// 	title   String @db.VarChar(70)
//
// 	characteristic String  @db.VarChar(100)
// 	price          Int
// 	comment        String? @db.Text
// 		prefer_stock   Boolean @default(true)
// }