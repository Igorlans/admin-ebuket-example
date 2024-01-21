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
                    Review: {
                        select: {
                            describe: true,
                            photo_hash: true,
                            stars: true,
                            buyer_name: true,
                            created_at: true,
                            compliment: true
                        }
                    }
                }
            })

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
