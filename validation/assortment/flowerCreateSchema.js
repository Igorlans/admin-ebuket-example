import * as yup from "yup";

export const flowerCreateSchema = yup.object().shape({
    name: yup.string().optional(),
    flowerId: yup.string().required('Виберіть квітку з випадаючого списку').nullable(),
    country: yup.string().required('Поле обов\'язкове'),
    color: yup.string().required('Поле обов\'язкове').nullable(),
    price: yup.string().required('Поле обов\'язкове'),
    height: yup.string().required('Поле обов\'язкове'),

    variety: yup.string().optional(),
    comment: yup.string().optional(),
    // prefer_stock: yup.boolean().optional(),
})
// model Store_flower {
//     id Int @id @default(autoincrement())
//
//     idStore   Store @relation(fields: [storeId], references: [id])
//     storeId   Int
//     id_flower Int
//
//     country      String  @db.VarChar(50)
//     color        String  @db.VarChar(25)
//     price        Int
//     variety      String? @db.VarChar(30)
//         comment      String? @db.Text
//         height       String  @db.VarChar(15)
//     prefer_stock Boolean
// }