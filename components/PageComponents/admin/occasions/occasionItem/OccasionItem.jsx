import { TableCell, TableRow } from "@mui/material";
import { useRouter } from "next/navigation";
import { IconButton } from '@mui/material';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import classes from "./occasionItem.module.scss"

const OccasionItem = ({occasion, handleDeleteRow}) => {

    const router = useRouter();

    return ( 
        <TableRow className={classes.box} >
            <TableCell>{occasion.name}</TableCell>
            <TableCell>{occasion.name_ru}</TableCell>
            <TableCell>{occasion.name_eng}</TableCell>
            <TableCell style={{display: 'flex', alignItems: 'center'}}>
                  <IconButton>
                    <AiOutlineEdit />
                  </IconButton>
                  <IconButton onClick={(e) => handleDeleteRow(e, occasion.id)}>
                    <AiOutlineDelete  />
                  </IconButton>
            </TableCell>
        </TableRow>
     );
}
 
export default OccasionItem;