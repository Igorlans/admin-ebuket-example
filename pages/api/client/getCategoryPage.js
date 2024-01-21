import prisma from "@/prisma/client";


function strToArray(inputStr) {
    return inputStr.split(',');
}

export default async function handler(req, res) {

    const PAGE_SIZE = 6
    const requestMethod = req.method
    
    if(requestMethod == 'GET'){
        try {

            const body = req.query;

            
            const flowersArray = body.kvitka !== undefined ? strToArray(body.kvitka) : 'none'
            const kolirArray = body.kolir !== undefined ? strToArray(body.kolir) : 'none'
            const visotaArray = body.visota !== undefined ? strToArray(body.visota) : 'none'
            const prividArray = body.privid !== undefined ? strToArray(body.privid) : 'none'
            const pohodzhennyaArray = body.pohodzhennya !== undefined ? strToArray(body.pohodzhennya) : 'none'


            const sortBy = body.sort === undefined ? 'asc' :
                body.sort == 'expensive' ? 'desc' :
                body.sort == 'cheap' ? 'asc' : 'asc'
            

            // let categoryPage
            // if(body.shopName !== undefined) {
            //         categoryPage = {idStore: {
            //             shop_name: 'Магаз максоніка'
            //         }}
            // }else{
            //     categoryPage = {
            //         category_buket: body.category
            //     }
            // }

            
            // res.status(200).json(body)
            console.log(body)

            

            const resBuket = await prisma.Buket.findMany({
                take: body.load_more == 1 ? (PAGE_SIZE * Number(body.page)) : PAGE_SIZE,
                skip: body.load_more == 1 ? (PAGE_SIZE * Number(body.page)-2) : body.page === undefined ? (PAGE_SIZE * 0) : (PAGE_SIZE * (Number(body.page)-1)),
                orderBy: {
                    price: sortBy
                },
                where: {
                    ...(body.shopName !== undefined ? {idStore: {shop_name: body.shopName}} : {category_buket: body.category}),

                    // idStore: body.shopName !== undefined ? {
                    //     shop_name: 'Магаз максоніка'
                    // }:{},

                    // category_buket: body.category !== undefined ? body.category : {},
                    status_moderation: 'ALLOWED',
                    price: {
                        gte: body.min === undefined ? 0 : Number(body.min),
                        lte: body.max === undefined ? 100000 : Number(body.max)
                    },

                    size_height: visotaArray !== 'none' ? {
                        in: visotaArray
                    }:{},

                    occasions: {
                        some: {
                          Occasion: {
                            name_eng: prividArray !== 'none' ? {
                                in: prividArray
                            }:{}
                          }
                        }
                    },
                    
                    buket_flower: {
                        some: {
                            store_flowers: {
                                is: {
                                    flower: flowersArray !== 'none' ? {
                                        title_eng: {
                                            in: flowersArray
                                        }
                                    }:{},
                                    color_eng: kolirArray !== 'none' ? {
                                        in: kolirArray
                                    }:{},
                                    country_eng: pohodzhennyaArray !== 'none' ? {
                                        in: pohodzhennyaArray
                                    }:{},
                                },
                            }
                        }
                    }
                            
                },
                include: {
                    buket_flower: true
                }
            })

            const resFlowers = await prisma.Store_flower.findMany({
                distinct: ['flowerId'],
                include: {
                    flower: {
                        select: {
                            id: true,
                            title_ua: true,
                            title_ru: true,
                            title_eng: true
                        }
                    }
                }
            })

            const resOccasion = await prisma.Occasion.findMany()
            const resBuketFilter = await prisma.Buket.findMany()

        

            res.status(200).json(
                { 
                    message: 'Good', 
                    dataQuery: body,
                    data: {
                        resBuketData: resBuket,
                        resFlowers: resFlowers,
                        resOccasion: resOccasion,
                        resBuketFilter: resBuketFilter
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
}
