import classes from './shops.module.scss';
import Button from "@/components/UI/Button/Button";
import {useRouter} from "next/navigation";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useMediaQuery } from '@mui/material';
// import SearchBar from '../SearchBar/SearchBar';
import MobileShopItem from './mobileShopItem/MobileShopItem';
import ShopItem from './shopItem/ShopItem';


const Shops = ( { shops, orders } ) => {
  
	const router = useRouter();
    const matches = useMediaQuery('(max-width: 991px)');
    
    return <DesctopTable shops={shops} orders={orders} />
};

const DesctopTable = ( { shops, orders } ) => {
  return (
    <TableContainer>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow style={{whiteSpace: 'nowrap'}}>
          <TableCell>Лого</TableCell>
          <TableCell>Назва</TableCell>
          <TableCell>К-продажів</TableCell>
          <TableCell>Дата реєстрації</TableCell>
        </TableRow>
      </TableHead>
      {
        shops && shops.length ? (
          <TableBody>
            {
              shops?.map(shop => (
                <ShopItem key={shop.id} shop={shop} orders={orders} />
              ))
            }
          </TableBody>
        ) : 
        (
          <div className={classes.bouquetsNotFound}>
            <h2 className={classes.title}>
              Немає асортименту букетів
            </h2>
          </div>
        )

      }
        {/* {shops && shops.length ? (
          <>
              <TableBody>
                {shops.map((bouquet) => (
        <ShopItem key={bouquet.id} bouquet={bouquet} />
                ))}
              </TableBody>
          </>
        ) : (
          <div className={classes.bouquetsNotFound}>
            <h2 className={classes.title}>
              Немає асортименту букетів
            </h2>
          </div>
        )} */}
    </Table>
    </TableContainer>
  );
}



export default Shops;

// return (
//   <div className={classes.bouquets}>
//     {matches ? (
//       <>
//         {shops && shops.length ? (
//             <>
//                 {shops.map((bouquet) => (
//                   <MobileShopItem key={bouquet.id} bouquet={bouquet} />
//                 ))}
//             </>
//           ) : (
//             <div className={classes.bouquetsNotFound}>
//               <h2 className={classes.title}>Немає асортименту букетів</h2>
//             </div>
//           )}
//       </>
//     ) : (
//       <>
        // <TableContainer>
        // <Table aria-label="simple table">
        //   <TableHead>
        //     <TableRow style={{whiteSpace: 'nowrap'}}>
        //       <TableCell>Лого</TableCell>
        //       <TableCell>Назва</TableCell>
        //       <TableCell>К-продажів</TableCell>
        //       <TableCell>Дата реєстрації</TableCell>
        //     </TableRow>
        //   </TableHead>
        //     {shops && shops.length ? (
        //       <>
        //           <TableBody>
        //             {shops.map((bouquet) => (
        //     <ShopItem key={bouquet.id} bouquet={bouquet} />
        //             ))}
        //           </TableBody>
        //       </>
        //     ) : (
        //       <div className={classes.bouquetsNotFound}>
        //         <h2 className={classes.title}>
        //           Немає асортименту букетів
        //         </h2>
        //       </div>
        //     )}
        // </Table>
        // </TableContainer>
//       </>
//     )}
//   </div>
// );