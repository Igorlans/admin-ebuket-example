import Button from "@/components/UI/Button/Button";
import Checkbox from "@/components/UI/Checkbox/Checkbox";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import CommentModal from "./CommentModal/CommentModal";
import classes from "./orderDetails.module.scss"
import dayjs from "dayjs";
import {dateFormat} from "@/config";

const OrderDetails = ({order}) => {

    const [openComment, setOpenComment] = useState(false);
    const [comment, setComment] = useState(order?.comment || '');
    const pickupDate = order?.date ? dayjs(Number(order.date)).format(dateFormat) : undefined;
    const deliveryDate = order?.time_delivery ? dayjs(Number(order.date)).format(dateFormat) : undefined;

        useEffect(() => {
        setComment(order?.comment)
    }, [order])
    console.log("ORDER",order)

    
    return ( 
       <div style={{position: 'relative'}}>
            <div className={classes.box}>
                  <div className={classes.orderInfo}>
                    <div className={classes.wr}>
                        <p>Замовлення: №{order?.id.substring(order?.id.lastIndexOf('-') + 1)}</p>
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
                        <div className={classes.orderPrice}>
                            <div>
                                <p>Сумма замовлення: </p> {order?.Buket?.price}
                            </div>
                            <div>
                                <p>Доставка: </p> Безкоштовно
                            </div>
                            <div>
                                <p>Коментар: {comment}</p> 
                                <CiEdit
                                    size="1.2rem"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        setOpenComment(true);
                                    }}
                                />
                                <CommentModal order={order} openComment={openComment} setOpenComment={setOpenComment} setComment={setComment} />
                            </div>
                        </div>
                        <div className={classes.orderStatusData}>
                        <div className={classes.orderDate}>
                            {order?.time}
                        </div>
                        <div className={classes.orderStatus}>
                            <Checkbox
                                label="Замовлення прийнято в обробку"
                                color="primary"
                            />
                        </div>
                        </div>
                    </div>
    
                    <div className={classes.statusButtons}>
                        <Button>
                            Передати флористу
                        </Button>
                        <Button variant="outlined">
                            Скасувати
                        </Button>
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
                            <p>Час доставки</p><p>{deliveryDate || pickupDate || "Немає"}</p>
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
               
            </div>
       </div>
       
     );
}
 
export default OrderDetails;