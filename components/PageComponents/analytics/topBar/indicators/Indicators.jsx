import { toCTR, sumKeyArrayData } from "@/utils/formatingAnalytic"
import classes from "./indicators.module.scss"

const Indicators = ({data}) => {
    console.log(data)

    const views = sumKeyArrayData(data, 'views')
    const clicks = sumKeyArrayData(data, 'clicks')
    const orders = sumKeyArrayData(data, 'orders')

    return ( 
        <div className={classes.box}>
            <div className={classes.item}>
                <div className={classes.itemTitle}>
                    Перегляди
                </div>
                <div className={classes.itemNum}>
                    {views}
                </div> 
            </div>
            <div className={classes.item}>
                <div className={classes.itemTitle}>
                    Кліків
                </div>
                <div className={classes.itemNum}>
                    {clicks}
                </div> 
            </div>
            <div className={classes.item}>
                <div className={classes.itemTitle}>
                    Замовлення
                </div>
                <div className={classes.itemNum}>
                    {orders}
                </div> 
            </div>
            <div className={classes.item}>
                <div className={classes.itemTitle}>
                    CTR
                </div>
                <div className={classes.itemNum}>
                    {toCTR(orders, views)}
                </div> 
            </div>
        </div>
     );
}
 
export default Indicators;