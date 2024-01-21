import prisma from "@/prisma/client";

import Cors from 'cors';

// Initialize the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(req, res) {

    await runMiddleware(req, res, cors);


    // res.status(200).json(req.body)
    
    
        try {
            const requestMethod = req.method
            
            const body = req.body;
 
            // res.status(200).json(body)

            const resOrder = await prisma.Buket.update({
                where: {
                    id: body.buketId
                },
                data: {
                    Orders: {
                        create: {
                            name: body.name,
                            phone: body.phone,
                            email: body.email,
                            cityId: body.city,
                            delivery_type: body.delivery_type,
                            date: body.date,
                            time: body.time,
                            prefer_specify_address: body.prefer_specify_address,
                            address: body.address,
                            house_number: body.house_number,
                            apartment_number: body.apartment_number,
                            type_delivery: body.delivery_type,
                            type_recipient: body.type_recipient,
                            name_recipient: body.name_recipient,
                            phone_recipient: body.phone_recipient,
                            time_delivery: body.time_delivery,
                            prefer_photo_before: body.prefer_photo_before,
                            type_payment: body.payment_type,
                            prefer_fast_delivery: String(body.prefer_fast_delivery),
    

                            sumPrice: body.sumPrice,
                            deliveryPrice: body.deliveryPrice,
    
                            OrderAddition: {
                                create: body.OrderAddition
                            }
                        }
                        
                    }
                    
                }
            })

            

        

            res.status(200).json(
                { 
                    message: 'Good', 
                    data: {
                        resOrder: resOrder
                    },
                    
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
