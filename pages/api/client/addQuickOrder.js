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
            console.log('body'+body)

            const resOrder = await prisma.Buket.update({
                where: {
                    id: body.buketId
                },
                data: {
                    QuickOrder: {
                        create: {
                            cityId: body.city,
                            phone: body.phone,

    
                            Addition: {
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
