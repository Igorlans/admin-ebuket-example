
import { TableCell, TableRow, TableBody, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import FlowersItem from "../FlowersItem/FlowersItem";
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import classes from "./groupedFlowers.module.scss"
import MobileFlowersItem from "../MobileFlowerItem/MobileFlowersItem";

const GroupedFlowers = ({group}) => {
    const matches = useMediaQuery('(max-width: 991px)')
    const [open, setOpen] = useState(false); // Початкове значення false
    const handleOpenFlowersGroup = () => {
      setOpen(!open);
    };
  
    useEffect(() => {
      setOpen(false); // При зміні групи, закриваємо колапс
    }, [group]);
    

    return ( 
            <>
                <TableRow onClick={()=> handleOpenFlowersGroup()} className={classes.row}>
                    <TableCell className={classes.expandIcon} style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        {
					      open ? <MdExpandLess size="1.8rem"/> :  <MdExpandMore size="1.8rem"/> 
					    } 
                         {group[0].flower.title_ua}
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <>
                    {
                        open ? 
                            <>
                                {group.map((flower) => (
                                    matches ? (
                                        <MobileFlowersItem key={flower.id} flower={flower} />
                                    ):(<FlowersItem key={flower.id} flower={flower}/>)
                                    
                                ))}
                            </>
                        : null
                    }
                </>
               
            </>
     );
}
 
export default GroupedFlowers;