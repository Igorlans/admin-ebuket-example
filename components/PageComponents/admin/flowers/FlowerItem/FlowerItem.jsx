import { AiOutlineClose, AiOutlineDelete } from 'react-icons/ai';
import { IconButton, TableCell, TableRow } from '@mui/material';


const FlowerItem = ({ flower, handleDeleteRow }) => {

  return (
        <TableRow>
          <TableCell>{flower.title_ua}</TableCell>
          <TableCell>{flower.title_ru}</TableCell>
          <TableCell>{flower.title_eng}</TableCell>
          <TableCell style={{display: 'flex', alignItems: 'center'}}>
            <IconButton onClick={() => handleDeleteRow(flower.id)}>
              <AiOutlineDelete />
            </IconButton>
          </TableCell>
        </TableRow>
  );
};

export default FlowerItem;
