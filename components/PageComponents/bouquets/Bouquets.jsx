import classes from './bouquets.module.scss';
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
import MobileBouquetItem from './MobileBouquetItem/MobileBouquetItem';
import BouquetItem from './BouquetItem/BouquetItem';


const FilterItems = [
	{id: 1, title: 'Категорія', href: '/orders', options: [
	  {id: 1, title: 'Авторські букети', href: '/settings/shipping'},
	  {id: 2, title: 'Моно букети', href: '/settings/shipping'},
	  {id: 1, title: 'Букети в кошику', href: '/settings/shipping'},
	  {id: 1, title: 'Букети в коробці', href: '/settings/shipping'},
	]},
	{id: 1, title: 'Наявність', href: '/orders', options: [
	  {id: 1, title: 'Так', href: '/settings/shipping'},
	  {id: 2, title: 'Ні', href: '/settings/shipping'},
	]},
	{id: 3, title: 'Вид', options: [
	  {id: 31, title: 'Упаковка', href: '/assortment/flowers'},
	  {id: 32, title: 'Лента', href: '/assortment/decor'},
	  {id: 33, title: 'Угорщина', href: '/assortment/addition'},
	]},
	{id: 4, title: 'Кіл замовлень', href: '/bouquets', options: [
	  {id: 23, title: 'Доставки', href: '/settings/shipping'},
	  {id: 24, title: 'Працівники', href: '/settings/employee'},
	  {id: 25, title: 'Графік роботи', href: '/settings/schedule'},
	]},
  ]

  
const Bouquets = ({bouquets}) => {
	const router = useRouter();
    const matches = useMediaQuery('(max-width: 991px)');
    
    return (
      <div className={classes.bouquets}>
        <Button
          onClick={() => router.push('bouquets/create')}
          style={{ position: 'absolute', top: 15, right: 15 }}
        >
          Додати Букет
        </Button>
        {matches ? (
          <>
            {bouquets && bouquets.length ? (
                <>
                    {bouquets.map((bouquet) => (
                      <MobileBouquetItem key={bouquet.id} bouquet={bouquet} />
                    ))}
                </>
              ) : (
               
				<div className={classes.bouquetsNotFound}>
					<h2 className={classes.title}>У Вас поки що немає асортименту букетів</h2>
					<h3 className={classes.subtitle}>Створіть базу букетів</h3>
					<Button
						onClick={() => router.push('bouquet/create')}
					>
						Додати букет
					</Button>
				</div>
              )}
          </>
        ) : (
          <>
            {/* <SearchBar FilterItems={FilterItems}/> */}
            <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow style={{whiteSpace: 'nowrap'}}>
                  <TableCell>Фото</TableCell>
                  <TableCell>Назва</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell>Дата</TableCell>
                  <TableCell>Категорія</TableCell>
                  <TableCell>Ціна</TableCell>
                  <TableCell>В наявності</TableCell>
				  <TableCell>Замовлень</TableCell>
				  <TableCell></TableCell>
                </TableRow>
              </TableHead>

                {bouquets && bouquets.length ? (
                  <>
                    	<TableBody>
                    		{bouquets.map((bouquet) => (
								          <BouquetItem key={bouquet.id} bouquet={bouquet} />
                    	  ))}
                    	</TableBody>
                  </>
                ) : (
                  <div className={classes.bouquetsNotFound}>
                    <h2 className={classes.title}>
                      У Вас поки що немає асортименту оформлень 
                    </h2>
                    <h3 className={classes.subtitle}>
                    Створіть базу декоративних єлементів, які Ви використовуєте для створення букету  це допоможе зручно створювати букети у розділі товари
                    </h3>
                    <Button onClick={() => router.push('flowers/create')}>
                      Додати оформлення
                    </Button>
                  </div>
                )}
            </Table>
            </TableContainer>
          </>
        )}
      </div>
    );
};

export default Bouquets;