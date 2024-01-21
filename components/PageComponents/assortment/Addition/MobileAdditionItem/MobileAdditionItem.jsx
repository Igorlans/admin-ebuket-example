
import {useCallback, useState} from "react";
import classes from "./mobileAdditionItem.module.scss"
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import Switch from "@/components/UI/Switch/Switch";
import { Button, Menu, MenuItem } from "@mui/material";
import { BsCart2, BsThreeDotsVertical } from "react-icons/bs";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";
import {apiRequest} from "@/utils/apiRequest";
import ControlledSwitch from "@/components/UI/Switch/ControlledSwitch";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import SupabaseFileService from "@/services/SupabaseFileService";


const MobileAdditionItem = ({addition}) => {
    const router = useRouter();
    const [isAvailable, setIsAvailable] = useState(addition.prefer_stock || false);
    const [open, setOpen] = useState(false);
    const handleClick = (e) => {
        e.stopPropagation()
        setOpen(!open);
    };

// Menu
// ===========
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
        event.stopPropagation()
    };
    const handleCloseMenu = (e) => {
        setAnchorEl(null);
        e.stopPropagation()
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

    return (
        <>
            <div className={classes.box} onClick={handleClick}>
                {open ? <MdExpandLess size="1.7rem"/> :  <MdExpandMore size="1.7rem"/>} 
                <div style={{width: '53px', height: '53px', borderRadius: '5px', margin: '0px auto', overflow: 'hidden'}}>
                  {addition?.image?.url &&
                    <img style={{width: '100%', height: '100%', objectFit: 'cover'}} src={addition?.image?.url} alt="" />                  
                  }
                </div>
                <div>
                    {addition.name}
                </div>
                <div onClick={(e)=> {e.stopPropagation()}}>
                    <ControlledSwitch onClick={(e) => e.stopPropagation()} value={isAvailable} onChange={handleSwitchChange}/>
                </div>   
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
            </div>
            {open && (
                <div className={classes.collapse}>
                    <div>
                        {addition.type_addition}
                    </div>
                    <div >
                        {addition.status_moderation}
                    </div>
                    <div style={{display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'center'}}>
                        <BsCart2/> 
                        {addition.price}
                    </div>
                    <div>
                        {addition.price} грн
                    </div>
                </div>
            )}
        </>
    )
}

export default MobileAdditionItem;
