import TableRow from '@mui/material/TableRow';
import { TableCell } from '@mui/material';
import {useState} from 'react';
import classes from "./bouquetItem.module.scss"
import dayjs from 'dayjs';
import toast from "react-hot-toast";
import {apiRequest} from "@/utils/apiRequest";
import {useRouter} from "next/navigation";
import { FcCheckmark } from 'react-icons/fc';
import { AiOutlineClose } from 'react-icons/ai';
import Status from '@/components/UI/Admin/Status/Status';




const BouquetItem = ({bouquet}) => {
    const router = useRouter()
    const [status, setStatus] = useState(bouquet.status_moderation);

    const handleCheckFlower = () => {
      router.push(`/admin/bouquets/${bouquet.id}`)
  }

  const handleModerate = async (status) => {
    try {
      await toast.promise(
          apiRequest('/api/bouquets/moderate', {id: bouquet.id, status_moderation: status}, 'PUT'),
          {
            loading: 'Оновлення...',
            success: (bouquet) => {
              setStatus(bouquet.status_moderation)
              return `Статус оновлено`
            },
            error: (err) => err.message
          }
      );
    } catch (e) {
      console.log(e)
    }
  }

    return (
        <>
            <TableRow key={bouquet.id} onClick={handleCheckFlower}>
              <TableCell component="th" scope="row">
                <div style={{width: '75px', height: '75px', margin: '0px auto', borderRadius: '5px', overflow: 'hidden'}}>
                    {bouquet?.images_hash?.images?.[0]?.url &&
                      <img style={{width: '100%', height: '100%', objectFit: 'cover'}} src={bouquet?.images_hash?.images?.[0]?.url} alt="" />                  
                    }
                </div>
              </TableCell>
              <TableCell>
                <div className={classes.name_buket}>
                  <p>{bouquet.name_buket}</p>
                  <a href="https://ebuket.vercel.app/ua/product/2" target="_blank">Дивитися на сайті</a>
                </div>
              </TableCell>
              <TableCell>
                <Status variant={status} />
              </TableCell>
              <TableCell >{dayjs(bouquet.createdAt).format("DD.MM.YYYY")}</TableCell>
              <TableCell >
                {(() => {
                    switch (bouquet.category_buket) {
                        case "mono":
                            return "Моно букети";
                        case "avtorsky":
                            return "Авторські букети";
                        case "inBasket":
                            return "Букети в кошику";
                        case "inBox":
                            return "Букети в коробці";
                }})()}
              </TableCell>
              <TableCell>
                    {bouquet.price}грн
              </TableCell>
              <TableCell>
                <div onClick={(event) => event.stopPropagation()}>
                  <FcCheckmark
                    style={{ cursor: 'pointer', marginRight: '10px' }}
                    size="1.2rem"
                    onClick={() => handleModerate('ALLOWED') }
                  />
                  <AiOutlineClose
                    style={{ cursor: 'pointer' }}
                    size="1.2rem"
                    onClick={() => handleModerate('REJECTED')}
                  />
                </div>
              </TableCell>
            </TableRow>
        </>
    );
};

export default BouquetItem;

