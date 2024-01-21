import prisma from "@/prisma/client";

export const updateBuketPrices = async (buketIds) => {
    try {
            // Retrieve the Buket records with the given IDs, along with their associated BuketFlower and BuketDecors records
            const bukets = await prisma.buket.findMany({
                where: {
                    id: { in: buketIds },
                },
                select: {
                    id: true,
                    price: true,
                    buket_flower: {
                        select: {
                            id: true,
                            number: true,
                            stroreFlowerId: true,
                            store_flowers: {
                                select: {
                                    price: true,
                                },
                            },
                        },
                    },
                    buket_decors: {
                        select: {
                            id: true,
                            numbers: true,
                            idDecor: true,
                            decors: {
                                select: {
                                    price: true,
                                },
                            },
                        },
                    },
                },
            });

            // Update the price of each affected buket
            const updatePromises = bukets.map(async (buket) => {
                // Calculate the new price of the buket based on its BuketFlower and BuketDecors records
                let newPrice = 0;
                buket.buket_flower.forEach((buketFlower) => {
                    const storeFlowerPrice = buketFlower.store_flowers.price;
                    const flowerCount = buketFlower.number;
                    newPrice += storeFlowerPrice * flowerCount;
                });
                buket.buket_decors.forEach((buketDecor) => {
                    const decorPrice = buketDecor.decors.price;
                    const decorCount = buketDecor.numbers;
                    newPrice += decorPrice * decorCount;
                });

                // Update the buket price if it has changed
                if (buket.price !== newPrice) {
                    await prisma.buket.update({
                        where: { id: buket.id },
                        data: { price: newPrice },
                    });
                }
            });

            // Wait for all updates to complete
            await Promise.all(updatePromises);

    } catch (e) {
        throw e
    }
}