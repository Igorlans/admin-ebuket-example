import classes from "./bouquetPage.module.scss"
import Orders from "@/components/PageComponents/admin/shops/shopPage/orders/Orders";
import dayjs from 'dayjs';


const ShopPage = ( { orders } ) => {
    const detaisData = [
        {id: 1, title: 'Назва', descr: orders?.[0].Buket.idStore.shop_name},
        {id: 2, title: 'К-продажів', descr: orders?.length},
        {id: 3, title: 'Дата реєстрації', descr: dayjs(orders?.[0].Buket.idStore.createdAt).format("DD.MM.YYYY")},
    ]
    return ( 
        <div className={classes.page}>
            <div className={classes.sides}>

                <div className={classes.photoSide}>
                    <div className={classes.photosContainer}>
                        <img src={orders?.[0].Buket.idStore.image.url} />
                    </div>
                </div>

                <ShopDetails data={detaisData} />
                
            </div>
            
            <Orders orders={orders} />

        </div>
     );
}
 
export default ShopPage;

const ShopDetails = ( { data } ) => {
    return (
        <div className={classes.infoSide}>
            {
                data?.map(item => (
                    <>
                        <div className={classes.item}>
                            <div className={classes.title}>
                                { item.title }
                            </div>
                            <div className={classes.descr}>
                                { item.descr }
                            </div>
                        </div>
                    </>
                ))
            }
        </div>
    )
}