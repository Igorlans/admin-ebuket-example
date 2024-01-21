import React, { useState } from 'react';
import Button from "@/components/UI/Button/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconButton } from '@mui/material';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import toast from "react-hot-toast";
import {apiRequest} from "@/utils/apiRequest";
import { useRouter } from 'next/router';
import dayjs from "dayjs";
import {dateFormat} from "@/config";

const SeoTable = ({allSeosData}) => {   
  const router = useRouter()
  const [newRow, setNewRow] = useState();

  const handleDeleteRow = async (index) => {
    
    try {
      setNewRow({...newRow, event: 'DELETE'})
      await toast.promise(
          apiRequest(`/api/seo/?id=${index}`, {}, 'DELETE'),
          {
            loading: 'Видалення...',
            success: (bouquet) => {
              setNewRow(initialRow)
              router.replace(router.asPath)
              return `Налаштування видалено`
            },
            error: (err) => err.message
          }
      );
    } catch (e) {
      console.log(e)
    }
  };
  
  const handleOpenModal = (id) => {
    router.push(`/admin/seo/${id}`)
  }

  const handleItemCreate = () => {
    router.push(`/admin/seo/create`)
  }

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={{ whiteSpace: 'nowrap' }}>
              <TableCell>Посилання</TableCell>
              <TableCell>h1</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Tекст з низу сторінки</TableCell>
              <TableCell>Дата зміни</TableCell>
              <TableCell>Керувати</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              allSeosData.length == 0 ? <div>Немає SEO налаштувань</div>   :

              allSeosData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.url}</TableCell>
                <TableCell>{row.heading}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{
                  row.pageText.length > 500 ? row.pageText.slice(0, 500) + '...' : row.pageText
                }</TableCell>
                {/* <TableCell>{row.pageText}</TableCell> */}
                <TableCell>{dayjs(Number(row.lastChange)).format(dateFormat)}</TableCell>
                <TableCell>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                  <IconButton onClick={() => handleOpenModal(row.id)}>
                    <AiOutlineEdit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteRow(row.id)}>
                    <AiOutlineDelete />
                  </IconButton>

                  </div>
                </TableCell>
              </TableRow>
            ))}
          
          </TableBody>
        </Table>
      </TableContainer>
    
      <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop:"40px"}}>
          <Button onClick={() => handleItemCreate() } variant="contained" color="primary">
              Додати новий рядок
          </Button>
      </div>
    </div>
  );
};


export default SeoTable;
