import prisma from "@/prisma/client";

// const prisma = new PrismaClient()

export default async function handler(req, res) {

    // res.status(200).json({ name: 'John Doe' })
    const requestMethod = req.method
    
    if(requestMethod === 'POST'){
        try {

            const body = req.body;
            console.log(body)

            // res.status(200).json(body)

            await prisma.Store.update({
                where: {
                    id: body.storeId,
                },
                data: {
                    Buket: {
                        create: {

                            category_buket: body.category_buket,
                            name_buket: body.name_buket,
                            size_width: body.size_width,
                            size_height: body.size_height,
                            time_build: body.time_build,                    
                            occasions: {
                                create: body.occasions
                            },
                            images_hash: body.images_hash,
                            
        
                            flowers: body.flowers,
                            decors: body.decors,
                            additions: body.additions,
        
                            price: body.price,
                            prefer_stock: body.prefer_stock,
                            status_moderation: body.status_moderation
                        },
                        include: {
                            occasions: true
                        }
                    }
                }
                
            })

            await prisma.$disconnect()

            return res.status(200).json({ message: 'Good'})
        } catch (e) {
            console.log(e)
            // throw e;

            // const error = prismaCustomErrorHandler(e);
            // res.send(error); 

            return res.status(500).json({message: e})
        }
    }

    
  }
  