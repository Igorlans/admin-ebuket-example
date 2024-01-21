import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@/components/UI/Button/Button"
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import ControlledTextarea from '@/components/UI/TextArea/ControlledTextArea';
import { RxCross2 } from 'react-icons/rx';
import toast from 'react-hot-toast';
import { apiRequest } from '@/utils/apiRequest';
import { useRouter } from 'next/navigation';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CommentModal = ({order, openComment, setOpenComment, setComment}) => {
const [value, setValue] = useState(order?.comment || '')
const router = useRouter()

const handleSaveComment = async () => {
    try {
        await toast.promise(
            apiRequest(
                '/api/orders/updateComment',
                {id: order.id, comment: value},
                'PUT'
            ),
            {
                loading: 'Створення коментаря...',
                success: (data) => {
                    setOpenComment(false)
                    setComment(data.comment)
                    setValue('')
                    router.replace('/orders')
                    return `Коментар створений`
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
      <Modal
        open={openComment}
        onClose={()=> setOpenComment(false)}
      >
        <Box sx={style}>
            <RxCross2 size="1.6rem" onClick={()=>setOpenComment(false)} style={{position: 'absolute', top: '20px', right: '20px', opacity: '0.5', cursor: 'pointer'}}/>
            <div style={{marginBottom: "10px"}}>Комментар</div>
            <ControlledTextarea value={value} onChange={(e) => setValue(e.target.value)} maxLength={50} />
            <Button onClick={handleSaveComment} variant="contained" text="Готово" style={{margin: '0px auto', marginTop: "20px"}}></Button>
        </Box>
      </Modal>
    </div>
  );
}

export default CommentModal;