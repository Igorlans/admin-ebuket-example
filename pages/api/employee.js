import prisma from "@/prisma/client";
const createEmployee = async (req, res) => {
    try {
        const body = req.body;
        console.log('BODY ======', body)
        const dbUser = await prisma.user.findUnique({
            where: {
                email: body.email
            },
            include: {
                Employee: true
            }
        })

        const isEmployed = !!dbUser?.Employee?.userId;
        if (isEmployed) return res.status(400).json({message: 'Робітник вже був зареєстрований'})

        const isExist = !!dbUser;

        if (isExist) {
            const updatedUser = await prisma.user.update({
                where: {
                  id: dbUser.id
                },
                data: {
                    email: body.email,
                    password: body.password,
                    name: body.name,
                    phone: body.phone,
                    Employee: {
                        create: {
                            role: body.role,
                            storeId: body.storeId
                        }
                    }
                }
            })
            return res.status(200).json({ message: 'Good', data: updatedUser})

        } else {
            const newUser = await prisma.user.create({
                data: {
                    email: body.email,
                    password: body.password,
                    name: body.name,
                    phone: body.phone,
                    Employee: {
                        create: {
                            role: body.role,
                            storeId: body.storeId
                        }
                    }
                }
            })
            return res.status(201).json({message: 'Good', data: newUser})
        }

    } catch (e) {
        throw e;
    }
}

const updateEmployee = async (req, res) => {
    try {
        const body = req.body;

        const updatedUser = await prisma.user.update({
            where: {
                id: body.id
            },
            data: {
                email: body.email,
                password: body.password,
                name: body.name,
                phone: body.phone,
                Employee: {
                    update: {
                        role: body.role,
                        storeId: body.storeId
                    }
                }
            }
        })
        res.status(200).json({ message: 'Good', data: updatedUser})

    } catch (e) {
        throw e;
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const {id} = req.query;

        const deletedUser = await prisma.employee.delete({
            where: {
                id: id
            }
        })

        res.status(200).json({ message: 'Good', data: deletedUser})
    } catch (e) {
        throw e;
    }
}
export default async function handler(req, res) {
    try {
        const requestMethod = req.method;
        switch (requestMethod) {
            case 'POST':
                return await createEmployee(req, res);
            case 'PUT':
                return await updateEmployee(req, res);
            case 'DELETE':
                return await deleteEmployee(req, res);
            default:
                return res.status(500).json({message: 'Unsupported method'})
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({message: e.message})
    }
}