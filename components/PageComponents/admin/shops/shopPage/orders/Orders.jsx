import { useState, useEffect, use } from 'react';
import { useMediaQuery } from '@mui/material';
import OrderDetails from './OrderDetails/OrderDetails';
import classes from './orders.module.scss';
import OrdersList from './OrdersList/OrdersList';
import OrderModal from './OrderModal/OrderModal';

  

const Orders = ( { orders } ) => {
    const matches = useMediaQuery('(max-width: 991px)');

    const [openOrder, setOpenOrder] = useState(orders[0] || null);

    useEffect(() => {
        console.log(openOrder)
    }, [openOrder])

    return (
        <div className={classes.orders}>
            {
                matches ? (
                    <>
                        <OrdersList orders={orders} openOrder={openOrder} setOpenOrder={setOpenOrder} />
                        {
                            openOrder && <OrderModal order={openOrder} openOrder={openOrder} setOpenOrder={setOpenOrder} />
                        }
                    </>
                    
                ):(
                    <div className={classes.wrapper}>
                        <OrdersList orders={orders} openOrder={openOrder} setOpenOrder={setOpenOrder}/>
                        {
                            openOrder && <OrderDetails order={openOrder} />
                        }
                    </div>
                )
            }                
        </div>
    );
};

export default Orders;