import prisma from "@/prisma/client";


export default async function handler(req, res) {

    // res.status(200).json({ name: 'John Doe' })
    const requestMethod = req.method
    
    if(requestMethod == 'GET'){
        try {

            const body = req.query;

            // res.status(200).json(body)

            let resReview = await prisma.review.findMany({
                where: {
                    Buket: {
                        storeId: Number(body.storeId)
                    },
                },
            })

            resReview = JSON.parse(JSON.stringify(resReview))

            res.status(200).json(
                { 
                    message: 'Good', 
                    resReview: resReview
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
