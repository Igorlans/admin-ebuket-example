import prisma  from "@/prisma/client";

export default async function handler(req, res) {

    // res.status(200).json({ name: 'John Doe' })
    const requestMethod = req.method
    
    if(requestMethod == 'POST'){
        try {

            const body = req.body;
            console.log(body)

            // res.status(200).json(body)
            const newPayment = prisma.payment.upsert({
                where: {
                    storeId: body.storeId,
                },
                update: {
                    prefer_cash: body.prefer_cash,
                    prefer_prepayment: body.prefer_prepayment,
                    sum_prepayment: body.sum_prepayment,
                    prefer_all_payment: body.prefer_all_payment,
                    payment_card: body.payment_card,
                    fio_card: body.fio_card,
                    name_bank: body.name_bank,
                    prefer_payment_number: body.prefer_payment_number,
                    payment_number: body.payment_number,
                    prefer_cashless: body.prefer_cashless,
                    prefer_crypto: body.prefer_crypto,
                },
                create: {
                    storeId: body.storeId,
                    prefer_cash: body.prefer_cash,
                    prefer_prepayment: body.prefer_prepayment,
                    sum_prepayment: body.sum_prepayment,
                    prefer_all_payment: body.prefer_all_payment,
                    payment_card: body.payment_card,
                    fio_card: body.fio_card,
                    name_bank: body.name_bank,
                    prefer_payment_number: body.prefer_payment_number,
                    payment_number: body.payment_number,
                    prefer_cashless: body.prefer_cashless,
                    prefer_crypto: body.prefer_crypto,
                },
            })

            const updateStep = prisma.store.update({
                where: {
                    id: body.storeId
                },
                data: {
                    verifyStep: 3,
                }
            })

            const [payment] = await prisma.$transaction([newPayment, updateStep])

            res.status(200).json({ message: 'Good', data: payment})
        } catch (e) {
            console.log(e)
            // throw e;

            // const error = prismaCustomErrorHandler(e);
            // res.send(error); 

            res.status(500).json({message: e.message})
        }
    }

    
  }
  