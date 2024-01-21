import classes from "./orderItem.module.scss"
import dayjs from "dayjs";
import {dateFormat} from "@/config";


const OrderItem = ({order, openOrder, onClick}) => {

    const date = dayjs(new Date(order.createdAt)).format(dateFormat)
    console.log('ORDER ITEM ==========', order)
    return ( 
        <div 
            className={classes.box} 
            onClick={onClick} 
            style={{
                border: openOrder ? '2px solid #9DCA39' : '1px solid #D7D7E5',
                padding: openOrder ? '9.5px' : '10px',
                transition: '0.3s' // add or subtract padding based on the border thickness
            }}
        >
            <div className={classes.leftSide}>
                <div className={classes.status}>
                    Новий
                </div>
                <div className={classes.num}>
                    ID: {order.id}
                </div>
                <div className={classes.dateOrdering}>
                    {date}
                </div>
            </div>
            <div className={classes.rightSide}>
                <div className={classes.item}>
                    <div className={classes.title}>
                        Букет
                    </div>
                    <div className={classes.info}>
                        {order.Buket.name_buket}
                    </div>
                </div>
                {order.OrderAddition && order.OrderAddition.length > 0 ? (
                  <div className={classes.item}>
                    <div className={classes.title}>
                      Доповнення
                    </div>
                    <div className={classes.info}>
                      {order.OrderAddition[0].additionId}
                    </div>
                  </div>
                ) : (
                  <div className={classes.item}>
                    <div className={classes.title}>
                      Без доповнень
                    </div>
                  </div>
                )}
                {order.OrderAddition && order.OrderAddition.length > 0 ? (
                    <div className={classes.item}>
                        <div className={classes.title}>
                            Замовник
                        </div>
                        <div className={classes.info}>
                            {order.name}
                        </div>
                    </div>
                ) : (
                <div className={classes.item}>
                    <div className={classes.title}>
                        Швидке замовлення
                    </div>
                    <div className={classes.info}>
                        {order.phone}
                    </div>
                </div>
                )}
            </div>
        </div>
     );
}
 
export default OrderItem;