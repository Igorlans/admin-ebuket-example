import TableRow from '@mui/material/TableRow';
import { Button, TextField, TableCell } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {useCallback, useState} from 'react';
import ControlledSwitch from "@/components/UI/Switch/ControlledSwitch";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";
import {apiRequest} from "@/utils/apiRequest";
import {useRouter} from "next/navigation";
import SupabaseFileService from "@/services/SupabaseFileService";
import {useSession} from "next-auth/react";




const AdditionItem = ({addition}) => {
    const router = useRouter();
    const [isAvailable, setIsAvailable] = useState(addition.prefer_stock || false);
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const handleOpenMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
      setAnchorEl(null);
    };

    const handleSwitchChange = useCallback(
        debounce(async () => {
            try {
                await toast.promise(
                    apiRequest('/api/assortment/addition/updateStock', {id: addition.id, prefer_stock: !isAvailable}, 'PUT'),
                    {
                        loading: 'Оновлення...',
                        success: (addition) => {
                            setIsAvailable(!isAvailable)
                            return `Доповнення оновлено`
                        },
                        error: (err) => err.message
                    }
                );
            } catch (e) {
                console.log(e)
            }
        }, 500)
        , [isAvailable]);

    const handleEdit = () => {
        router.push(`/assortment/addition/${addition.id}`)
    }
    const {data: session} = useSession()
    const handleDelete = async () => {
        try {
            await toast.promise(
                apiRequest('/api/assortment/addition?id='+addition.id, {}, 'DELETE'),
                {
                    loading: 'Видалення...',
                    success: (flower) => {
                        router.replace('/assortment/addition')
                        return `Доповнення видалено`
                    },
                    error: (err) => err.message
                }
            );
            await SupabaseFileService.removeFile('shops', `shop-${session?.user?.storeId}/addition/${addition?.image?.name}`)
        } catch (e) {
            console.log(e)
        }
    }


  
    console.log(addition);
    
    return (
        <>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <div style={{width: '75px', height: '75px', margin: '0px auto', borderRadius: '5px', overflow: 'hidden'}}>
                  {addition?.image?.url &&
                    <img style={{width: '100%', height: '100%', objectFit: 'cover'}} src={addition?.image?.url} alt="" />                  
                  }
                </div>
              {/* {`${decor.decor.title_ua} ${decor.variety || ''}`} */}
              </TableCell>
              <TableCell >{addition.name}</TableCell>
              <TableCell >{addition.status_moderation}</TableCell>
            <TableCell>{addition.type_addition}</TableCell>
            <TableCell>10</TableCell>
            <TableCell>
              <div>
                {addition.price}грн
              </div>
            </TableCell>
            <TableCell component="th" scope="row">
                <ControlledSwitch value={isAvailable} onChange={handleSwitchChange} />
            </TableCell>
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
                      <MenuItem onClick={handleDelete}>Видалити</MenuItem>
                    </Menu>
                </div>
            </TableCell>
            </TableRow>
        </>
    );
};

export default AdditionItem;

