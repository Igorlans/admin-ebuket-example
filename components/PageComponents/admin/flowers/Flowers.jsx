import React, { useState } from 'react';
import Button from "@/components/UI/Button/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconButton, TextField } from '@mui/material';
import classes from "./flowers.module.scss"
import { AiOutlineDelete } from 'react-icons/ai';
import FlowerItem from './FlowerItem/FlowerItem';
import translit from 'translitit-cyrillic-ukrainian-to-latin'
import { useRouter } from 'next/router';
import toast from "react-hot-toast";
import {apiRequest} from "@/utils/apiRequest";

const initialRow = { title_ua: '', title_ru: '', title_eng: ''};

const Flowers = ({flowersData}) => {


  const flowers = [
    {
      id: 1,
      title_ua: "/page1",
      title_ru: "Заголовок 1",
      title_eng: "Тайтл 1",
    },
    {
      id: 2,
      title_ua: "/page2",
      title_ru: "Заголовок 2",
      title_eng: "Тайтл 2",
    },
    {
      id: 3,
      title_ua: "/page3",
      title_ru: "Заголовок 3",
      title_eng: "Тайтл 3",
    }
  ];
      
  const [rows, setRows] = useState(flowers);
  const [newRow, setNewRow] = useState(initialRow);
  const [showForm, setShowForm] = useState(false);

  const router = useRouter()

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRow((prev) => ({ ...prev, [name]: value }));
  };

  // const handleAddRow = () => {
  //   setRows((prev) => [...prev, newRow]);
  //   setNewRow(initialRow);
  //   setShowForm(false);
  // };

  const handleAddRow = async () => {
    console.log({
      title_ua: newRow.title_ua,
      title_ru: newRow.title_ru,
      title_eng: translit(newRow.title_ua),
    })
    try {
      await toast.promise(
          apiRequest('/api/flowers/', {
            title_ua: newRow.title_ua,
            title_ru: newRow.title_ru,
            title_eng: translit(newRow.title_ua),
          }),
          {
            loading: 'Додавання...',
            success: (bouquet) => {
              setShowForm(false)
              router.replace(router.asPath)
              return `Квітку додано`
            },
            error: (err) => err.message
          }
      );
    } catch (e) {
      console.log(e)
    }
  };

  const handleDeleteRow = async (index) => {
    console.log(index)
    try {
      await toast.promise(
          apiRequest(`/api/flowers/`, {deletePos: true, id: index}, 'PUT'),
          {
            loading: 'Видалення...',
            success: (bouquet) => {
              router.replace(router.asPath)
              return `Квітку видалено`
            },
            error: (err) => err.message
          }
      );
    } catch (e) {
      console.log(e)
    }
  };
  // const handleDeleteRow = (index) => {
  //   setRows((prevRows) => {
  //     const newRows = [...prevRows];
  //     newRows.splice(index, 1);
  //     return newRows;
  //   });
  // };
  
  

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={{ whiteSpace: 'nowrap' }}>
              <TableCell>Українською</TableCell>
              <TableCell>Російською</TableCell>
              <TableCell>Транслітом</TableCell>
              <TableCell>Керувати</TableCell>
              {/* <TableCell></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {flowersData.map((flower, key) => (
              <FlowerItem key={key} handleDeleteRow={handleDeleteRow} flower={flower} status/>
            ))}
            {showForm && (
              <TableRow>
                <TableCell>
                  <TextField
                    size="small"
                    name="title_ua"
                    placeholder='Укр.'
                    value={newRow.title_ua}
                    onChange={handleInputChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    name="title_ru"
                    placeholder='Рос.'
                    value={newRow.title_ru}
                    onChange={handleInputChange}
                  />
                </TableCell>
                <TableCell>
                  <div className={classes.buttons}>
                    <Button variant="contained" color="primary" onClick={handleAddRow}>
                      Додати
                    </Button>
                    <Button style={{ marginLeft: '10px' }} onClick={() => setShowForm(false)} variant="outlined">
                      Скасувати
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {!showForm && (
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop:"40px"}}>
            <Button onClick={() => setShowForm(true)} variant="contained" color="primary">
                Додати нову квітку
            </Button>
        </div>
      )}
    </div>
  );
};

export default Flowers;
