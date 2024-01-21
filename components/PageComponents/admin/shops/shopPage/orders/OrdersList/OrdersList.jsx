import OrderItem from './OrderItem/OrderItem';
import { useMediaQuery } from '@mui/material';
import MobileOrderItem from './MobileOrderItem/MobileOrderItem';

const OrdersList = ({orders, openOrder, setOpenOrder}) => {
  const matches = useMediaQuery('(max-width: 991px)');

  return (
    <div>
        {orders.map(order =>
          matches ? (
            <MobileOrderItem
              key={order.id}
              order={order}
              openOrder={order.id === openOrder?.id}
              onClick={() => setOpenOrder(order)}
            />
          ) : (
            <OrderItem
              key={order.id}
              order={order}
              openOrder={order.id === openOrder?.id}
              onClick={() => setOpenOrder(order)}
            />
          )
        )}
    </div>
  );
};

export default OrdersList;
