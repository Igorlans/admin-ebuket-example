import React, { useState } from 'react';
import Button from "@/components/UI/Button/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconButton, TextField } from '@mui/material';
import classes from "./occasions.module.scss"
import { AiOutlineDelete } from 'react-icons/ai';
import OccasionItem from './occasionItem/OccasionItem';
import translit from 'translitit-cyrillic-ukrainian-to-latin'
import { useRouter } from 'next/router';
import toast from "react-hot-toast";
import {apiRequest} from "@/utils/apiRequest";
const initialRow = { title_ua: '', title_ru: ''};

const Occasions = ({allOcasions}) => {


  const occasions = [
    {
      id: 1,
      title_ua: "/page1",
      title_ru: "День взяття Берліну",
      title_eng: "Тайтл 1",
    },
    {
      id: 2,
      title_ua: "/page2",
      title_ru: "Путін сдох",
      title_eng: "Тайтл 2",
    },
    {
      id: 3,
      title_ua: "/page3",
      title_ru: "Горить жопа",
      title_eng: "Тайтл 3",
    },
    {
      id: 4,
      title_ua: "/page4",
      title_ru: "الكلبة اللعينة",
      title_eng: "Тайтл 3",
    }
  ];
      
  const [rows, setRows] = useState(occasions);
  const [newRow, setNewRow] = useState(initialRow);
  const [showForm, setShowForm] = useState(false);

  const router = useRouter()

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRow((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddRow = async () => {
    console.log({
      name: newRow.title_ua,
      name_ru: newRow.title_ru,
      name_eng: translit(newRow.title_ua),
    })
    try {
      await toast.promise(
          apiRequest('/api/occasions/', {
            name: newRow.title_ua,
            name_ru: newRow.title_ru,
            name_eng: translit(newRow.title_ua),
          }),
          {
            loading: 'Додавання...',
            success: (bouquet) => {
              setShowForm(false)
              router.replace(router.asPath)
              return `Привід додано`
            },
            error: (err) => err.message
          }
      );
    } catch (e) {
      console.log(e)
    }
  };
  const handleDeleteRow = async (e, index) => {
    console.log(index)
    try {
      await toast.promise(
          apiRequest(`/api/occasions/?id=${index}`, {
            id: index
          }, 'DELETE'),
          {
            loading: 'Видалення...',
            success: (bouquet) => {
              setShowForm(false)
              router.replace(router.asPath)
              return `Привід видалено`
            },
            error: (err) => err.message
          }
      );
    } catch (e) {
      console.log(e)
    }
  };
  
  

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={{ whiteSpace: 'nowrap' }}>
              <TableCell>Українською</TableCell>
              <TableCell>Російською</TableCell>
              <TableCell>Англійською</TableCell>
              <TableCell>Керувати</TableCell>
              {/* <TableCell></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {allOcasions.map((occasion, key) => (
              <OccasionItem key={key} occasion={occasion} handleDeleteRow={handleDeleteRow}/>
            ))}
            {showForm && (
              <TableRow>
                <TableCell>
                  <TextField
                    size="small"
                    name="title_ua"
                    placeholder='Українською'
                    value={newRow.title_ua}
                    onChange={handleInputChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    name="title_ru"
                    placeholder='Російською'
                    value={newRow.title_ru}
                    onChange={handleInputChange}
                  />
                </TableCell>
                <TableCell>
                 <div>-</div>
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
              Додати новий привід
          </Button>
        </div>
      )}
    </div>
  );
};

export default Occasions;
