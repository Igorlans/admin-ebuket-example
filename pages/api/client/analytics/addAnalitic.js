import prisma from "@/prisma/client";
import Cors from 'cors';





const cors = Cors({
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
});
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
        try {
            const requestMethod = req.method
            
            const body = JSON.parse(req.body);

            console.log(body)
            
            const now = new Date().toISOString().slice(0,10)
            const checkOnProductRes = await checkOnProduct(body.buketId, now)
            
            let resData

            const dataAnalityc = {
                // views: {item: 2},
                [body.typeEvent]: 1,
                // orders: body.orders,
                createdAt: now,
                storeId: body.storeId,
                buketId: body.buketId
            }

            console.log(dataAnalityc)

            if(checkOnProductRes == true){
                resData = await prisma.Analytic.create(
                    {
                        data: dataAnalityc
                    }
                )
                resData = 'create'
            }else {

                console.log(checkOnProductRes)
                resData = await prisma.Analytic.update(
                    {
                        where: {
                            id: checkOnProductRes.id
                        },
                        data: {
                            [body.typeEvent]: {
                                increment: 1
                            }
                        }
                    }
                )
                resData = 'update'
            }



            res.status(200).json(
                { 
                    message: 'Good', 
                    body: body,
                    // resData: resData
                    // data: {
                    //     resOrder: resOrder
                    // },
                }
            )
        } catch (e) {
            console.log(e)
            res.status(500).json({message: e})
        }
}



const checkOnProduct = async (buketId, now) => {
    const checkOnProductRes = await prisma.Analytic.findMany({
        where: {
            createdAt: now,
            buketId: buketId,
        }
    })

    // console.log(checkOnProductRes)   

    return checkOnProductRes.length == 0 ? true : checkOnProductRes[0]
}