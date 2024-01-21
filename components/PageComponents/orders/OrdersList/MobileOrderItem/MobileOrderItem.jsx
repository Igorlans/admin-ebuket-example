import classes from "./mobileOrderItem.module.scss"

const MobileOrderItem = ({order, openOrder, onClick}) => {

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
                <div className={classes.num}>
                    ID: {order.id}
                </div>
                <div className={classes.dateOrdering}>
                    {order.date}{order.time}
                </div>
                <div className={classes.status}>
                    <div>Новий</div>
                </div>
            </div>
            <div className={classes.rightSide}>
                <div className={classes.topRow}>
                    {order.Buket.name_buket}
                </div>
                <div className={classes.middleRow}>
                    {order.OrderAddition && order.OrderAddition.length > 0 ? (
                        <div className={classes.addition}>
                            {order.OrderAddition[0].additionId}
                        </div>
                    ) : (
                        <div className={classes.addition}>
                            Без доповнень
                        </div>
                    )}           
                    <div className={classes.price}>
                        <p>Сума: </p>
                        <div>{order.Buket.price} грн</div>
                    </div>
                </div>
                <div className={classes.bottomRow}>
                    <div className={classes.info}>
                        {order.name}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default MobileOrderItem;