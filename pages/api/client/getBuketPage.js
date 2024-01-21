import prisma from "@/prisma/client";


export default async function handler(req, res) {

    // res.status(200).json({ name: 'John Doe' })
    const requestMethod = req.method
    
    if(requestMethod == 'GET'){
        try {

            const body = req.query;
            // console.log("data")
            // console.log(body.id)

            
            // res.status(200).json(body)

            const resStore = await prisma.Buket.findUnique({
                where: {
                    id: Number(body.buketId)
                },
                include: {
                    idStore:{
                        include: {
                            Delivery: {
                                select: {
                                    prefer_in_time: true,
                                    price_in_time: true,
                                    type_in_time: true,
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
                    },
                    reviews: {
                        select: {
                            describe: true,
                            image: true,
                            stars: true,
                            // buyer_name: true,
                            created_at: true,
                            compliment: true
                        }
                    },
                    buket_decors: {
                        include: {
                            decors: true
                        }
                    },
                    buket_flower: {
                        include: {
                            store_flowers: {
                                include: {
                                    flower: true
                                }
                            }
                        }
                    },
                    buket_addition: {
                        include: {
                            store_addition: true
                        }
                    }
                }
            })



            res.status(200).json(
                { 
                    message: 'Good', 
                    resStore: resStore
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
