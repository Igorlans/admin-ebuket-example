import TableRow from '@mui/material/TableRow';
import { Button, TableCell } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {useCallback, useState} from 'react';
import classes from "./bouquetItem.module.scss"
import dayjs from 'dayjs';
import ControlledSwitch from "@/components/UI/Switch/ControlledSwitch";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";
import {apiRequest} from "@/utils/apiRequest";
import {useRouter} from "next/navigation";
import Status from "@/components/UI/Admin/Status/Status";




const BouquetItem = ({bouquet}) => {
    const router = useRouter()
    const [isAvailable, setIsAvailable] = useState(bouquet.prefer_stock || false);
    const [isEditPrice, setIsEditPrice] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const handleOpenMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
      setAnchorEl(null);
    };
    const handleEdit = () => {
        router.push(`/bouquets/${bouquet.id}`)
    }

    const handleSwitchChange = useCallback(
        debounce(async () => {
            try {
                await toast.promise(
                    apiRequest('/api/bouquets/updateStock', {id: bouquet.id, prefer_stock: !isAvailable}, 'PUT'),
                    {
                        loading: 'Оновлення...',
                        success: () => {
                            setIsAvailable(!isAvailable)
                            return `Букет оновлено`
                        },
                        error: (err) => err.message
                    }
                );
            } catch (e) {
                console.log(e)
            }
        }, 500)
        , [isAvailable]);
  
    console.log(bouquet);
    
    return (
        <>
            <TableRow
              key={bouquet.title_ua}
            >
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
                  <Status variant={bouquet.status_moderation} />
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
              <TableCell component="th" scope="row">
                  <ControlledSwitch value={isAvailable} onChange={handleSwitchChange}/>
              </TableCell>
              <TableCell >0</TableCell>
              {/* тут має бути кількість продаж */}
              <TableCell>
                  <div>
                      <Button
                        aria-controls={openMenu ? 'basic-menu' : undefined}
                        aria-expanded={openMenu ? 'true' : undefined}
                        onClick={handleOpenMenu}
                      >
                          <BsThreeDotsVertical style={{ cursor: "pointer", opacity: "0.5" }} size="1.5rem"/>
                      </Button>
                      <Menu
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleCloseMenu}
                      >
                        <MenuItem onClick={handleEdit}>Змінити</MenuItem>
                        <MenuItem onClick={handleCloseMenu}>Видалити</MenuItem>
                      </Menu>
                  </div>
              </TableCell>
            </TableRow>
        </>
    );
};

export default BouquetItem;

