import classes from './decor.module.scss';
import DecorItem from "@/components/PageComponents/assortment/Decor/DecorItem/DecorItem";
import Button from "@/components/UI/Button/Button";
import {useRouter} from "next/navigation";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useMediaQuery } from '@mui/material';
import MobileDecorItem from './MobileDecorItem/MobileDecorItem';
import SearchBar from '../SearchBar/SearchBar';


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

const Decor = ({decors}) => {
	const router = useRouter();
    const matches = useMediaQuery('(max-width: 991px)');
    
    return (
      <div className={classes.decor}>
        <Button
          onClick={() => router.push('/assortment/decor/create')}
          style={{ position: 'absolute', top: 15, right: 15 }}
        >
          Додати оформлення
        </Button>
        {matches ? (
          <>
            {decors && decors.length ? (
                <>
                    {decors.map((decor) => (
                      <MobileDecorItem key={decor.id} decor={decor} />
                    ))}
                </>
              ) : (
               
				<div className={classes.decorNotFound}>
					<h2 className={classes.title}>У Вас поки що немає асортименту оформлень</h2>
					<h3 className={classes.subtitle}>Створіть базу декоративних єлементів, які Ви використовуєте для створення букету  це допоможе зручно створювати букети у розділі товари</h3>
					<Button
						onClick={() => router.push('/assortment/decor/create')}
					>
						Додати оформлення
					</Button>
				</div>
              )}
          </>
        ) : (
          <>
            <SearchBar FilterItems={FilterItems}/>
            <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow style={{whiteSpace: 'nowrap'}}>
                  <TableCell>Назва</TableCell>
                  <TableCell>Розмір</TableCell>
                  <TableCell>Ціна</TableCell>
                  <TableCell>Кіл. букетів</TableCell>
                  <TableCell>В наявності</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

                {decors && decors.length ? (
                  <>
                      <TableBody>
                        {decors.map((decor) => (
                          <DecorItem key={decor.id} decor={decor} />
                        ))}
                      </TableBody>
                  </>
                ) : (
                  <div className={classes.decorNotFound}>
                    <h2 className={classes.title}>
                      У Вас поки що немає асортименту оформлень 
                    </h2>
                    <h3 className={classes.subtitle}>
                    Створіть базу декоративних єлементів, які Ви використовуєте для створення букету  це допоможе зручно створювати букети у розділі товари
                    </h3>
                    <Button onClick={() => router.push('/assortment/decor/create')}>
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

export default Decor;




