import * as React from 'react';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import classes from "./orderModal.module.scss"
import Button from "@/components/UI/Button/Button"
import { RxCross2 } from 'react-icons/rx';
import { useState } from 'react';
import ControlledTextarea from '@/components/UI/TextArea/ControlledTextArea';
import toast from 'react-hot-toast';
import { apiRequest } from '@/utils/apiRequest';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CiEdit } from 'react-icons/ci';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: "10px",
  p: 2,
};

const OrderModal = ({order, openOrder, setOpenOrder}) => {

 
    const router = useRouter()
    const [value, setValue] = useState(order?.comment || '')


    const handleSaveComment = async () => {
        try {
            await toast.promise(
                apiRequest(
                    '/api/orders/updateComment',
                    {id: order.id, comment: value},
                    'PUT'
                ),
                {
                    loading: 'Створення коментаря...',
                    success: (data) => {
                        setOpenComment(false)
                        setComment(data.comment)
                        setValue('')
                        router.replace('/orders')
                        return `Коментар створений`
                    },
                    error: (err) => err.message
                }
            );
        } catch (e) {
            console.log(e)
        }
    };

  return (
    <div>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div className={classes.closeModal} onClick={() => setOpenOrder(false)}>
                <RxCross2 size="2rem" style={{position: 'absolute', top: '20px', right: '20px'}}/>
            </div>
            <div className={classes.topSide}>
                <div className={classes.orderInfo}>
                    <div className={classes.status}>
                        {/* {order.status} */}
                        Новий
                    </div>
                    <div className={classes.num}>
                        <p>Замовлення: №{order?.id}</p>
                    </div>
                    <div className={classes.orderDate}>
                        {order.time}
                    </div>
                </div>
                <div className={classes.products}>
                    <div className={classes.product}>
                        <div style={{width: '50px', height: '50px', margin: '0px auto', borderRadius: '5px', overflow: 'hidden'}}>
                            {order?.Buket?.images_hash?.images?.[0]?.url &&
                              <img style={{width: '100%', height: '100%', objectFit: 'cover'}} src={order?.Buket?.images_hash?.images?.[0]?.url} alt="" />                  
                            }
                        </div>
                        <div className={classes.info}>
                            <div className={classes.category}>Букет</div>
                            <div className={classes.productName}>{order?.Buket?.name_buket}</div>
                        </div>
                        <div className={classes.price}>
                            {order.Buket.price} грн
                        </div>
                    </div>
                </div>    
                <div className={classes.price}>
                    <div className={classes.productsPrice}>
                        <div>Сума замовлення:</div>
                        <p>{order.Buket.price}грн</p>
                    </div>
                    <div className={classes.deliveryPrice}>
                        <div> Доставка:</div>
                        <p>Безкоштовно</p>
                    </div>
                </div>
            </div>
            
            {!order.name ? (
                    <div className={classes.quickOrder}>
                        <div className={classes.phoneRow}>
                            <div className={classes.title}>Швидке замовлення</div>
                            <div className={classes.item}>
                                <p> Номер телефону:</p><p>{order.phone}</p>
                            </div>
                        </div>
                    </div>
                ):(
                    <div className={classes.contactInfo}>
                    <p>Контактна інформація</p>
                    <div className={classes.custumerData}>
                        <div className={classes.title}>Дані замовника</div>
                        <div className={classes.item}>
                            <p>Ім'я</p><p>{order.name}</p>
                        </div>
                    </div>
                    <div className={classes.receiverData}>
                        <div className={classes.title}>Дані отримувача</div>
                        <div className={classes.item}>
                            <p>Ім'я</p><p>{order?.name_recipient}</p>
                        </div>
                        <div className={classes.item}>
                            <p>Телефон</p><p>{order?.phone_recipient}</p>
                        </div>
                        <div className={classes.item}>
                            <p>Email</p><p>{order?.email}</p>
                        </div>
                    </div>
                    <div className={classes.deliveryData}>
                        <div className={classes.title}>Доставка</div>
                        <div className={classes.item}>
                            <p>{order?.type_delivery?.trim() === "delivery" ? "Доставка кур'єром" : "Самовиніс"}</p>
                        </div>
                        <div className={classes.item}>
                            <p>Адреса</p><p>{order?.address}</p>
                        </div>
                        <div className={classes.item}>
                            <p>Квартира</p><p>{order?.apartment_number}</p>
                        </div>
                    </div>
                    <div className={classes.payData}>
                        <div className={classes.title}>Оплата</div>
                        <div className={classes.item}>
                            <p>
                                {(() => {
                                    switch (order?.type_payment?.trim()) {
                                        case "cash":
                                            return "Готівкою";
                                        case "precash":
                                            return "Предоплата";
                                        case "fullcash":
                                            return "Повна оплата готівкою";
                                        case "cashless":
                                            return "Безготівковий розрахунок";
                                        case "crypto":
                                            return "Криптовалюта";
                                        default:
                                            return "";
                                    }
                                })()}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </Box>
      </Modal>
    </div>
  );
}

export default OrderModal;