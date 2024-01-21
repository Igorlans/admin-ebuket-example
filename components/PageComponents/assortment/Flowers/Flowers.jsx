import classes from './flowers.module.scss';
import FlowersItem from "@/components/PageComponents/assortment/Flowers/FlowersItem/FlowersItem";
import Button from "@/components/UI/Button/Button";
import {useRouter} from "next/navigation";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useMediaQuery } from '@mui/material';
import MobileFlowersItem from './MobileFlowerItem/MobileFlowersItem';
import SearchBar from '../SearchBar/SearchBar';
import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import GroupedFlowers from './GroupedFlowers/GroupedFlowers';
import FlowerItem from '../../admin/flowers/FlowerItem/FlowerItem';



const FilterItems = [
  {id: 1, title: 'Наявність', options: [
    {id: 1, title: 'Так'},
    {id: 2, title: 'Ні'},
  ]},
  {id: 2, title: 'Країна', options: [
    {id: 31, title: 'Україна'},
    {id: 32, title: 'Польша'},
    {id: 33, title: 'Угорщина'},
  ]},
  {id: 3, title: 'Кіл замовлень', options: [
    {id: 23, title: 'Доставки'},
    {id: 24, title: 'Працівники'},
    {id: 25, title: 'Графік роботи'},
  ]},
]

const Flowers = ({ flowers }) => {

    const router = useRouter();
    const matches = useMediaQuery('(max-width: 991px)')
    const [selectedTags, setSelectedTags] = useState([])
    console.log("SELECTED TAGS", selectedTags)

    const filteredFlowers = flowers.filter((flower) =>
		  ((selectedTags.filter(obj => obj.value === "Наявність")[0]?.value == "Так") ? flower.prefer_stock == true : flower.prefer_stock==false)
      // (flower.prefer_stock.includes(selectedTags.title.toLowerCase())) &&
		  // (flower?.email?.toLowerCase().includes(selectedTags.title.toLowerCase()))
	  );

    useEffect(() => {
      console.log(filteredFlowers)
    },[selectedTags])


    // const filteredItems = FilterItems.filter((item) => {
    //   // filter based on search query
    //   if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
    //     return false;
    //   }
    //   // filter based on selected subcategories
    //   if (selectedTags.length > 0) {
    //     const selectedCategoryIds = selectedTags.map((tag) => tag.id);
    //     if (!selectedCategoryIds.includes(item.id)) {
    //       return false;
    //     }
    //   }
    //   return true;
    // });

    // const filteredFlowers = flowers.filter(flower => 
    //   selectedTags.every(tag => flower.prefer_stock.includes(true))
    // );

    const groupedFlowers = useMemo(()=> {
      const groupedFlowers = {};
        flowers.forEach((flower) => {
          const titleUa = flower.flower.title_ua;
          if (groupedFlowers[titleUa]) {
            groupedFlowers[titleUa].push(flower);
          } else {
            groupedFlowers[titleUa] = [flower];
          }
        });

        const groupedFlowersArray = Object.values(groupedFlowers);
        console.log(groupedFlowersArray)
        return groupedFlowersArray
    },[flowers])
    
    return (
      <div className={classes.flowers}>
        <Button
          onClick={() => router.push('flowers/create')}
          style={{ position: 'absolute', top: 15, right: 15 }}
        >
          Додати квіти
        </Button>
        {matches ? (
          <>
            {groupedFlowers && groupedFlowers.length ? (
                  <>
                    {groupedFlowers.map((group) => ( 
                      <>
                        <GroupedFlowers key={group.id} group={group}/>
                      </>
                    ))}
                  </>
                ) : (
                <div className={classes.flowersNotFound}>
                  <h2 className={classes.title}>
                    У Вас поки що немає асортименту квітів
                  </h2>
                  <h3 className={classes.subtitle}>
                    Створіть базу квітів, які продаються у вашому магазині, це допоможе зручно створювати букети та робити зміни в букеті
                  </h3>
                  <Button onClick={() => router.push('flowers/create')}>
                    Додати квіти
                  </Button>
                </div>
              )}
          </>
        ) : (
            <>
              <SearchBar FilterItems={FilterItems} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>
              <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{whiteSpace: 'nowrap'}}>
                  <TableCell>Назва</TableCell>
                  <TableCell>Сорт</TableCell>
                  <TableCell>Країна</TableCell>
                  <TableCell>Колір</TableCell>
                  <TableCell>Висота</TableCell>
                  <TableCell>Кіл. букетів</TableCell>
                  <TableCell>Ціна</TableCell>
                  <TableCell>В наявності</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

                {groupedFlowers && groupedFlowers.length ? (
                  <>
                    <TableBody>
                      {groupedFlowers.map((group) => ( 
                        <>
                          <GroupedFlowers key={group.id} group={group}/>
                        </>
                      ))}
                    </TableBody>
                  </>
                ) : (
                  <div className={classes.flowersNotFound}>
                    <h2 className={classes.title}>
                      У Вас поки що немає асортименту квітів
                    </h2>
                    <h3 className={classes.subtitle}>
                      Створіть базу квітів, які продаються у вашому магазині, це допоможе зручно створювати букети та робити зміни в букеті
                    </h3>
                    <Button onClick={() => router.push('flowers/create')}>
                      Додати квіти
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
  

export default Flowers;