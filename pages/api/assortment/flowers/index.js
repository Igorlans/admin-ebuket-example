import prisma from "@/prisma/client";
import {updateBuketPrices} from "@/utils/updateBuketPrices";
const createFlower = async (req, res) => {
    try {

        const body = req.body;
        console.log(body)

        const newFlower = await prisma.store_flower.create({
            data: {
                country: body.country,
                color: body.color,
                price: body.price,
                variety: body.variety,
                comment: body.comment,
                height: body.height,
                storeId: body.storeId,
                flowerId: body.flowerId
            },
        })

        res.status(200).json({message: 'Good', data: newFlower})
    } catch (e) {
        throw e;
    }
}
const updateFlower = async (req, res) => {
    try {

        const body = req.body;
        console.log(body)

        const newFlower = await prisma.store_flower.update({
            where: {
              id: body.id
            },
            data: {
                country: body.country,
                color: body.color,
                price: body.price,
                variety: body.variety,
                comment: body.comment,
                height: body.height,
                storeId: body.storeId,
                flowerId: body.flowerId
            },
        })

        if (body?.oldPrice !== body?.price) {
            const buketsWithStoreFlower = await prisma.buketFlower.findMany({
                where: {
                    store_flowers: {
                        id: body.id,
                    },
                },
                select: {
                    idBuket: true,
                },
            });
            const buketIds = buketsWithStoreFlower.map((bf) => bf.idBuket);
            await updateBuketPrices(buketIds);
        }

        res.status(200).json({message: 'Good', data: newFlower})
    } catch (e) {
        throw e;
    }
}

const deleteFlower = async (req, res) => {
    try {
        const {id} = req.query;
        console.log("QUERY", req.query)

        // res.status(200).json(body)
        const updateBukets = prisma.buket.updateMany({
            where: {
                buket_flower: {
                    some: {
                        stroreFlowerId: Number(id)
                    }
                }
            },
            data: {
                prefer_stock: false
            }
        })

        const deleteBuketFlowers = prisma.buketFlower.deleteMany({
            where: {
                stroreFlowerId: Number(id)
            }
        })

        const deleteStoreFlower = prisma.store_flower.delete({
            where: {
                id: Number(id)
            }
        })

        const buketsWithStoreFlower = await prisma.buketFlower.findMany({
            where: {
                store_flowers: {
                    id: Number(id),
                },
            },
            select: {
                idBuket: true,
            },
        });
        const buketIds = buketsWithStoreFlower.map((bf) => bf.idBuket);
        const [updatedBukets, deletedBuketFlowers, deletedStoreFlower] = await prisma.$transaction([updateBukets, deleteBuketFlowers, deleteStoreFlower])


        await updateBuketPrices(buketIds);
        res.status(200).json({message: 'Good', data: deletedStoreFlower})
    } catch (e) {
        throw e;
    }
}

export default async function handler(req, res) {
    try {
        const requestMethod = req.method;
        switch (requestMethod) {
            case 'POST':
                return await createFlower(req, res);
            case 'PUT':
                return await updateFlower(req, res);
            case 'DELETE':
                return await deleteFlower(req, res);
            default:
                return res.status(500).json({message: 'Unsupported method'})
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({message: e.message})
    }
}
  