import * as yup from 'yup';

export const bouquetsCreateSchema = yup.object().shape({
	category_buket: yup.string().required('Поле обов\'язкове'),
	name_buket: yup.string().required('Поле обов\'язкове'),
	name_buket_ru: yup.string().required('Поле обов\'язкове'),
	size_width: yup.string().required('Поле обов\'язкове'),
	size_height: yup.string().required('Поле обов\'язкове'),
	time_build: yup.string().required('Поле обов\'язкове'),
	occasions: yup.array().min(1, 'Поле обов\'язкове')
})

// model Buket {
// 	id Int @id @default(autoincrement())
//
// 	idStore Store @relation(fields: [storeId], references: [id])
// 	storeId Int
//
// 	category_buket String @db.VarChar(40)
// 	name_buket     String @db.VarChar(40)
// 	size_width     String @db.VarChar(10)
// 	size_height    String @db.VarChar(10)
// 	time_build     String @db.VarChar(10)
// 	images_hash    Json
//
// 	flowers   Json
// 	decors    Json
// 	additions Json
//
// 	price        Int
// 	prefer_stock Boolean
//
// 	status_moderation String          @db.VarChar(35)
// 	createdAt         DateTime        @default(now())
// 	occasions         BuketOccasion[]
// }