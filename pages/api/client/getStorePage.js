
import prisma from "@/prisma/client";

// const prisma = new PrismaClient()


// const get_data = async (table, id) => {
//     const res = await prisma[table].findMany({
//         where: {
//             storeId: id
//         }
//     })

//     return res
// }

export default async function handler(req, res) {

    // res.status(200).json({ name: 'John Doe' })
    const requestMethod = req.method
    
    if(requestMethod == 'GET'){
        try {

            const body = req.query;

            // res.status(200).json(body)

            const resStore = await prisma.Store.findUnique({
                where: {
                    id: Number(body.storeId)
                },
                include: {
                    Buket: {
                        where:{
                            prefer_stock: true
                        },
                        select: {
                            category_buket: true,
                            name_buket: true,
                            size_width: true,
                            size_height: true,
                            images_hash: true,
                            price: true
                        }
                    },
                    Store_schedule: {
                        select: {
                            order_schedule: true
                        }
                    },
                    Review: {
                        select: {
                            describe: true,
                            photo_hash: true,
                            stars: true,
                            buyer_name: true,
                            created_at: true,
                            compliment: true
                        }
                    },
                    Store_flower: {
                        select: {
                            id_flower: true,
                            color: true
                        }
                    },
                    
                    Delivery: {
                        select: {
                            Delivery_rates: true,
                            Pickup_list: true
                        }
                    },
                    Payment: {
                        select: {
                            prefer_cash: true,
                            prefer_prepayment: true,
                            prefer_all_payment: true,
                            prefer_cashless: true,
                            prefer_crypto: true
                        }
                    }
                }
            })


            // include: {
            //     Review: true,
            //     Addition: true,
            //     Store_schedule: true,
            //     Payment: true,
            //     Delivery: true
            // }

            const select_flower = await prisma.Flowers.findMany({
                where: {
                    id: {
                        in: resStore.Store_flower.map(flower => flower.id_flower)
                    }
                }
            })

            // const resAdditionData = await prisma.Addition.findMany({
            //     where: {
            //         id: {
            //             in: resBuket.additions.map(addition => addition.idAdditon)
            //         }
            //     }
            // })

            // const resDecorData = await prisma.Addition.findMany({
            //     where: {
            //         id: {
            //             in: resBuket.decors.map(decor => decor.idDecor)
            //         }
            //     }
            // })

            // const resReviewData = await get_data('Review', 41)

            res.status(200).json(
                { 
                    message: 'Good', 
                    resBuketData: resStore,
                    select_flower: select_flower
                }
            )
        } catch (e) {
            console.log(e)
            // throw e;

            // const error = prismaCustomErrorHandler(e);
            // res.send(error); 

            res.status(500).json({message: e})
        }
    }
}
