import classes from './addition.module.scss';
import Button from "@/components/UI/Button/Button";
import {useRouter} from "next/navigation";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// import useMedia, { useIsMobile } from '@/hooks/useMedia';
import { useMediaQuery } from '@mui/material';
import MobileAdditionItem from './MobileAdditionItem/MobileAdditionItem';
import AdditionItem from './AdditionItem/AdditionItem';

const Addition = ({additions}) => {
    const router = useRouter();
    const matches = useMediaQuery('(max-width: 991px)');
    console.log("Additions", additions)
    return (
      <div className={classes.additionNotFound}>
        <Button
          onClick={() => router.push('/assortment/addition/create')}
          style={{ position: 'absolute', top: 15, right: 15 }}
        >
          Додати
        </Button>
        {matches ? (
          <>
            {additions && additions.length ? (
                <>
                  {additions.map((addition) => (
                    <MobileAdditionItem key={addition.id} addition={addition} />
                  ))}
                </>
              ) : (
                <div className={classes.decorNotFound}>
 					        <h2 className={classes.title}>У Вас поки що немає асортименту оформлень</h2>
 					        <h3 className={classes.subtitle}>Створіть базу декоративних єлементів, які Ви використовуєте для створення букету  це допоможе зручно створювати букети у розділі товари</h3>
 					          <Button
 					          	onClick={() => router.push('/assortment/addition/create')}
 					          >
 						      Додати оформлення
 					      </Button>
				      </div>
              )}
          </>
        ) : (
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow style={{whiteSpace: 'nowrap'}}>
                  <TableCell>Фото</TableCell>
                  <TableCell>Назва</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell>Тип</TableCell>
                  <TableCell>Ціна</TableCell>
                  <TableCell>Замовлень</TableCell>
                  <TableCell>В наявності</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

                {additions && additions.length ? (
                  <>
                      <TableBody>
                        {additions.map((addition) => (
                          <AdditionItem key={addition.id} addition={addition} />
                        ))}
                      </TableBody>
                  </>
                ) : (
					        <div className={classes.additionNotFound}>
					        	<h2 className={classes.title}>
                      У Вас поки що немає асортименту доповнень
					        	</h2>
					        	<h3 className={classes.subtitle}>
                      Створіть базу доповнень до вашого букету: листівки, іграшки, цукерки та інші
                      До кожного букету можно буде додати 3 доповнення
					        	</h3>
					        	<Button onClick={() => router.push('/assortment/addition/create')}>
					        	  Додати доповнення
					        	</Button>
				          </div>
                )}
  
            </Table>
          </TableContainer>
        )}
      </div>
    );
  };
  

export default Addition;