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
                    Buket: {
                        where:{
                            prefer_stock: true
                        },
                        select: {
                            id: true,
                            category_buket: true,
                            name_buket: true,
                            size_width: true,
                            size_height: true,
                            // : true,
                            price: true
                        }
                    },
                    Review: {
                        select: {
                            stars: true,
                            buyer_name: true,
                        }
                    },
                    Store_flowers: true,
                    
                    Delivery: {
                        select: {
                            Delivery_rates: true
                        }
                    }
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
