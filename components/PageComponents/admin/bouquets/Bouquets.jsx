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


  
const Bouquets = ({bouquets}) => {
  
	const router = useRouter();
    const matches = useMediaQuery('(max-width: 991px)');
    
    return (
      <div className={classes.bouquets}>
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
				        	<h2 className={classes.title}>Немає асортименту букетів</h2>
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
				  <TableCell>Керувати</TableCell>
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
                      Немає асортименту букетів
                    </h2>
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