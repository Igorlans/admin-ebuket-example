import prisma from "@/prisma/client";

// const prisma = new PrismaClient()

export default async function handler(req, res) {

    // res.status(200).json({ name: 'John Doe' })
    const requestMethod = req.method
    console.log(requestMethod)
    



    if(requestMethod == 'POST'){
        try {

            const body = req.body;
            console.log(body)

            const newStore = await prisma.store.update({
                where: {
                  id: body.storeId
                },
                data: {
                    shop_name: body.shop_name,
                    logo: body.logo,
                    description: body.description,
                    name: body.name,
                    phone: body.phone,
                    email: body.email,
                    password: body.password,
                    prefer_viber: body.prefer_viber,
                    prefer_telegram: body.prefer_telegram,
                    prefer_phone: body.prefer_phone,
                    prefer_email: body.prefer_email,
                    verifyStep: 2,
                    cityId: body.cityId,
                    image: body.image
                },
            })
            
            res.status(200).json({ message: 'Good', data: newStore})
        } catch (e) {
            console.log(e)
            // throw e;

            // const error = prismaCustomErrorHandler(e);
            // res.send(error); 

            res.status(500).json({message: e})
        }
    }

    
  }
  