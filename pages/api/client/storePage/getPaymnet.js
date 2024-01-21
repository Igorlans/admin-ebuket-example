import prisma from "@/prisma/client";


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
                    Payment: {
                        select: {
                            prefer_cash: true,
                            prefer_prepayment: true,
                            prefer_all_payment: true,
                            prefer_cashless: true,
                            prefer_crypto: true
                        }
                    },
                    Delivery: {
                        select: {
                            Delivery_rates: true,
                            Pickup_list: true
                        }
                    },
                    Store_schedule: {
                        select: {
                            order_schedule: true
                        }
                    },
                    // Review: {
                    //     select: {
                    //         stars: true,
                    //         buyer_name: true,
                    //     }
                    // },
                }
            })

            res.status(200).json(
                { 
                    message: 'Good', 
                    resBuketData: resStore
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
