import TableRow from '@mui/material/TableRow';
import { TableCell } from '@mui/material';
import classes from "./bouquetItem.module.scss"
import dayjs from 'dayjs';
import {useRouter} from "next/navigation";
import Status from '@/components/UI/Admin/Status/Status';

const ShopItem = ( { shop, orders } ) => {
    const router = useRouter();

    const handleCheckFlower = () => {
      router.push(`/admin/shops/${shop.id}`)
  }
    return (
        <>
            <TableRow key={shop.id} onClick={handleCheckFlower}>
              <TableCell component="th" scope="row">
                <div style={{width: '75px', height: '75px', margin: '0px auto', borderRadius: '5px', overflow: 'hidden'}}>
                    {
                      shop?.image?.url ?
                        <img style={{width: '100%', height: '100%', objectFit: 'cover'}} src={shop?.image.url} alt="" />
                      :
                        <h1
                          style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '50px'}}
                        >☹</h1>
                    }
                </div>
              </TableCell>

              <TableCell>
                <div className={classes.name_buket}>
                  <p>{shop?.shop_name}</p>
                  <a href="https://ebuket.vercel.app/ua/product/2" target="_blank">Дивитися на сайті</a>
                </div>
              </TableCell>

              <TableCell>
                {
                  `${orders?.filter(order => order.Buket.idStore.id === shop.id).length} продажів`
                }
                {/* <Status variant={shop?.verified ? "ALLOWED" : "REJECTED"} /> */}
              </TableCell>

              <TableCell >{dayjs(shop?.createdAt).format("DD.MM.YYYY")}</TableCell>
            </TableRow>
        </>
    );
};

export default ShopItem;

