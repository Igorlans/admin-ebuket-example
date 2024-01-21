import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import SearchBar from '../assortment/SearchBar/SearchBar';
import OrderDetails from './OrderDetails/OrderDetails';
import classes from './orders.module.scss';
import OrdersList from './OrdersList/OrdersList';
import OrderModal from './OrderModal/OrderModal';


const FilterItems = [
    {id: 1, title: 'Наявність', href: '/orders', options: [
        {id: 1, title: 'Так', href: '/settings/shipping'},
        {id: 2, title: 'Ні', href: '/settings/shipping'},
    ]},
    {id: 3, title: 'Вид', options: [
        {id: 31, title: 'Упаковка', href: '/assortment/flowers'},
        {id: 32, title: 'Лента', href: '/assortment/decor'},
        {id: 33, title: 'Угорщина', href: '/assortment/addition'},
    ]},
    {id: 4, title: 'Кількість', href: '/bouquets', options: [
        {id: 23, title: 'Доставки', href: '/settings/shipping'},
        {id: 24, title: 'Працівники', href: '/settings/employee'},
        {id: 25, title: 'Графік роботи', href: '/settings/schedule'},
    ]},
  ]
  

const Orders = ({orders}) => {
    const matches = useMediaQuery('(max-width: 991px)');
    const [openOrder, setOpenOrder] = useState(orders[0] || null);
    const [selectedTags, setSelectedTags] = useState([]);
    // const filteredFlowers = flowers.filter((flower) =>
    // ((selectedTags.filter(obj => obj.value === "Наявність")[0]?.value == "Так") ? flower.prefer_stock == true : flower.prefer_stock==false)
    // // (flower.prefer_stock.includes(selectedTags.title.toLowerCase())) &&
    //     // (flower?.email?.toLowerCase().includes(selectedTags.title.toLowerCase()))
    // );  

    console.log("OPENED", openOrder)

    useEffect(() => {
        console.log(orders)
    },[selectedTags])
    console.log(orders)

    return (
        <div className={classes.orders}>
            <SearchBar FilterItems={FilterItems} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>
            {
                matches ? (
                    <>
                        <OrdersList orders={orders} openOrder={openOrder} setOpenOrder={setOpenOrder}/>
                        {openOrder ? <OrderModal order={openOrder} openOrder={openOrder} setOpenOrder={setOpenOrder}/> : null} 
                    </>
                    
                ):(
                    <div className={classes.wrapper}>
                        <OrdersList orders={orders} openOrder={openOrder} setOpenOrder={setOpenOrder}/>
                        {openOrder && <OrderDetails order={openOrder} />}
                    </div>
                )
            }                
        </div>
    );
};

export default Orders;