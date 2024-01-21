import prisma from "@/prisma/client";

// const prisma = new PrismaClient()

export default async function handler(req, res) {

    // res.status(200).json({ name: 'John Doe' })
    const requestMethod = req.method
    
    if(requestMethod == 'POST'){
        try {

            const body = req.body;
            console.log(body)

            // res.status(200).json(body)

            const newStoreSchedule = prisma.store_schedule.upsert({
                where: {
                    storeId: body.storeId,
                },
                create: {
                    storeId: body.storeId,
                    order_schedule:     body.order_schedule,
                    couriers_schedule:  body.couriers_schedule
                },
                update: {
                    order_schedule:     body.order_schedule,
                    couriers_schedule:  body.couriers_schedule
                }
            })

            const updateStep = prisma.store.update({
                where: {
                    id: body.storeId
                },
                data: {
                    verifyStep: 4,
                }
            })

            const [storeSchedule] = await prisma.$transaction([newStoreSchedule, updateStep])

            res.status(200).json({ message: 'Good', data: storeSchedule})
        } catch (e) {
            console.log(e)
            // throw e;

            // const error = prismaCustomErrorHandler(e);
            // res.send(error); 

            res.status(500).json({message: e.message})
        }
    }

    
  }
  