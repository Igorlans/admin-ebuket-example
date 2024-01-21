import prisma from "@/prisma/client";

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const body = req.body;
            const newUser = await prisma.user.create({
                data: {
                    email: body.email,
                    password: body.password,
                    Employee: {
                        create: {
                            role: 'OWNER',
                            store: {
                                create: {
                                    shop_name: 'Невідомий магазин',
                                    name: body.email,
                                    phone: 'вкажіть номер',
                                    email: body.email
                                }
                            }
                        }
                    }
                }
            })
            res.status(200).json({message: 'good', data: newUser})
        } else {
            throw new Error('Unsupported request method')
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({message: e.message})
    }
}
