import * as React from 'react';
import classes from "./modalSeoCreate.module.scss"
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import Button from '@/components/UI/Button/Button';
import { RxCross2 } from 'react-icons/rx';


const ModalSeoCreate = ({newRow, open, setNewRow, initialRow, setOpen, handleInputChange, handleAddRow}) => {

  const handleCloseModal = () => {
    setOpen(false)
    setNewRow(initialRow)
  }
  return (
      <Modal open={open} >
        <div className={classes.box}>
           <div className={classes.close}>
            <RxCross2 onClick={()=> handleCloseModal()} size="1.6rem"/>
           </div>
            <div className={classes.left}>
                <TextField
                fullWidth
                  size="small"
                  name="url"
                  placeholder='Введіть url'
                  value={newRow?.url}
                  onChange={handleInputChange}
                />
                <TextField
                fullWidth
                  size="small"
                  name="heading"
                  placeholder='Введіть H1'
                  value={newRow?.heading}
                  onChange={handleInputChange}
                />
                <TextField
                fullWidth
                  size="small"
                  name="title"
                  placeholder='Введіть Title'
                  value={newRow?.title}
                  onChange={handleInputChange}
                />
                <Button onClick={() => handleAddRow()} variant="contained" color="primary" >
                    {newRow?.event === 'POST' ? 'Додати' : 'Оновити'}
                </Button>
            </div>
            <div>
                <TextField
                fullWidth
                  size="small"
                  name="description"
                  placeholder='Введіть текст description'
                  value={newRow?.description}
                  onChange={handleInputChange}
                  multiline
                minRows={4}
                style={{marginBottom:"30px"}}
                />
                 <TextField
                fullWidth
                  size="small"
                  name="pageText"
                  placeholder='Введіть Текст з низу сторінки'
                  value={newRow?.pageText}
                  onChange={handleInputChange}
                  multiline
                minRows={7}
                />
            </div>

            
        </div>
      </Modal>
  );
}

export default ModalSeoCreate;