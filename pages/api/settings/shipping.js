import prisma from "@/prisma/client";
import {v4 as uuid} from 'uuid';
// const prisma = new PrismaClient()

export default async function handler(req, res) {

    // res.status(200).json({ name: 'John Doe' })
    const requestMethod = req.method
    // console.log(requestMethod)

    // const body = req.body;
    // console.log(body)

    // res.status(200).json({ message: body})

    if (requestMethod == 'POST') {
        try {

            const body = req.body;
            console.log('BODY', body)
            const upsertDelivery = prisma.delivery.upsert({
                where: {
                    storeId: body.storeId,
                },
                create: {
                    storeId: body.storeId,
                    prefer_courier: body.prefer_courier,
                    time_delivery: body.time_delivery,
                    price_delivery: body.price_delivery,
                    free_delivery_from: body.free_delivery_from,
                    advanced_delivery: body.advanced_delivery,
                    divergence_time: body.divergence_time,
                    prefer_pickup: body.prefer_pickup,
                    prefer_in_time: body.prefer_in_time,
                    prefer_free_from: body.prefer_free_from,
                    type_in_time: body.type_in_time,
                    price_in_time: body.price_in_time,
                    repeat_delivery: body.repeat_delivery,
                    price_in_repeat: body.price_in_repeat,
                    type_repeat_delivery: body.type_repeat_delivery,
                    Delivery_rates: body.Delivery_rates,
                    Pickup_list: body.Pickup_list,
                },
                update: {
                    prefer_courier: body.prefer_courier,
                    time_delivery: body.time_delivery,
                    price_delivery: body.price_delivery,
                    free_delivery_from: body.free_delivery_from,
                    prefer_free_from: body.prefer_free_from,
                    advanced_delivery: body.advanced_delivery,
                    type_in_time: body.type_in_time,
                    type_repeat_delivery: body.type_repeat_delivery,
                    divergence_time: body.divergence_time,
                    prefer_pickup: body.prefer_pickup,
                    prefer_in_time: body.prefer_in_time,
                    price_in_time: body.price_in_time,
                    repeat_delivery: body.repeat_delivery,
                    price_in_repeat: body.price_in_repeat,
                    Delivery_rates: body.Delivery_rates,
                    Pickup_list: body.Pickup_list,
                }
            })

            const updateStep = prisma.store.update({
                where: {
                    id: body.storeId
                },
                data: {
                    verifyStep: 5,
                    verified: true
                }
            })

            const [newDelivery] = await prisma.$transaction([upsertDelivery, updateStep])

            res.status(200).json({message: 'Good', data: newDelivery})
        } catch (e) {
            console.log(e)
            // throw e;

            // const error = prismaCustomErrorHandler(e);
            // res.send(error); 

            res.status(500).json({message: e.message})
        }
    }

    if(requestMethod == 'GET'){
        try {

            const body = req.body;
            console.log(body)

            // res.status(200).json(body)

            let delivery_rates
            let pickup_list




            const resData = await prisma.delivery.findFirst({
                where: {
                    storeId: body.storeId,
                    cityId: body.cityId
                }

            })
            
            await prisma.$disconnect()

            res.status(200).json({ message: 'Good', response: resData})
        } catch (e) {
            console.log(e)
            // throw e;

            // const error = prismaCustomErrorHandler(e);
            // res.send(error); 

            res.status(500).json({message: e})
        }
    }

    
  }

  