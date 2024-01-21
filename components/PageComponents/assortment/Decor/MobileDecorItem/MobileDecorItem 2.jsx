import { Button, Menu, MenuItem, TextField } from "@mui/material";
import {useCallback, useState} from "react";
import classes from "./mobileDecorItem.module.scss"
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { FcCheckmark } from 'react-icons/fc';
import { AiOutlineClose } from 'react-icons/ai';
import Comment from '../DecorItem/comment/Comment';
import toast from "react-hot-toast";
import {apiRequest} from "@/utils/apiRequest";
import ControlledSwitch from "@/components/UI/Switch/ControlledSwitch";
import debounce from "lodash.debounce";
import {useRouter} from "next/navigation";

const MobileDecorItem = ({decor}) => {
    const router = useRouter();
    const [isAvailable, setIsAvailable] = useState(decor.prefer_stock || false);
    const [comment, setComment] = useState(decor.comment || '');
    const [isEditingComment, setIsEditingComment] = useState(false);
    const [newComment, setNewComment] = useState(decor.comment || '');
    const [isEditPrice, setIsEditPrice] = useState(false);
    const [newPrice, setNewPrice] = useState(decor.price || '');
    const [price, setPrice] = useState(decor.price || '');
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };

// Menu
// ===========
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const handleOpenMenu = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

// ChangePrice
// ===========
    const handleSaveComment = async () => {
        try {
            await toast.promise(
                apiRequest(
                    '/api/assortment/decor/updateComment',
                    {id: decor.id, comment: newComment},
                    'PUT'
                ),
                {
                    loading: 'Оновлення...',
                    success: (decor) => {
                        console.log('new decor', decor)
                        setComment(decor.comment);
                        setIsEditingComment(false);
                        setNewComment(decor.comment);
                        return `Квітка оновлена`
                    },
                    error: (err) => err.message
                }
            );
        } catch (e) {
            console.log(e)
        }
    };
    const handleSavePrice = async () => {
        try {
            await toast.promise(
                apiRequest(
                    '/api/assortment/decor/updatePrice',
                    {id: decor.id, price: Number(newPrice)},
                    'PUT'
                ),
                {
                    loading: 'Оновлення...',
                    success: (decor) => {
                        console.log('new flower', decor)
                        setPrice(decor.price)
                        setNewPrice(decor.price)
                        setIsEditPrice(false);
                        return `Оформлення оновлено`
                    },
                    error: (err) => err.message
                }
            );
        } catch (e) {
            console.log(e)
        }
    };

    const handleDelete = async () => {
        try {
            await toast.promise(
                apiRequest('/api/assortment/decor?id='+decor.id, {}, 'DELETE'),
                {
                    loading: 'Видалення...',
                    success: (flower) => {
                        router.replace('/assortment/decor')
                        return `Оформлення видалено`
                    },
                    error: (err) => err.message
                }
            );
        } catch (e) {
            console.log(e)
        }
    }

    const handleSwitchChange = useCallback(
        debounce(async () => {
            try {
                await toast.promise(
                    apiRequest('/api/assortment/decor/updateStock', {id: decor.id, prefer_stock: !isAvailable}, 'PUT'),
                    {
                        loading: 'Оновлення...',
                        success: (decor) => {
                            setIsAvailable(!isAvailable)
                            return `Оформлення оновлено`
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
        router.push(`/assortment/decor/${decor.id}`)
    }


    return (
        <>
            <div 
                className={classes.title} 
                style={{
                    borderBottom: '1px solid #D7D7E5',
                }}
                onClick={handleClick}
                >
                {
                    open ? <MdExpandLess size="1.7rem"/> :  <MdExpandMore size="1.7rem"/>
                } 
                {decor.title}
                <div>
                    <ControlledSwitch
                        value={isAvailable}
                        onClick={(e) => e.stopPropagation()}
                        onChange={handleSwitchChange}
                    />
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
                <div style={{
                    padding: 15, 
                    backgroundColor: '#f6f6fa',
                    borderBottom: '1px solid #D7D7E5',}}>
                    <div className={classes.collapseMiddle} style={{marginBottom: '10px'}}>
                        <div className={classes.paramIcon}><img src="/assets/icons/icon_height.svg"/>{decor.characteristic}</div>
                        <div className={classes.paramIcon}><img src="/assets/icons/icon_flower.svg"/>30</div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', position: 'relative', marginRight: '0px'}}>
                            <CiEdit
                              size="1.2rem"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                setNewPrice(decor.price);
                                setIsEditPrice(true);
                              }}
                            />
                            {isEditPrice ? (
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', }}>
                                  <TextField 
                                    sx={{width: '50px'}}
                                    type="number"
                                    color="primary" 
                                    size="small"
                                    variant="standard"
                                    value={newPrice} 
                                    onChange={(event) => setNewPrice(event.target.value)}
                                  />
                                  <FcCheckmark
                                    onClick={handleSavePrice}
                                    style={{ cursor: 'pointer', marginRight: '10px' }}
                                    size="1.2rem"
                                  />
                                  <AiOutlineClose
                                    onClick={() => setIsEditPrice(false)}
                                    style={{ cursor: 'pointer'}}
                                    size="1.2rem"
                                  />
                                </div>
                            ) : (
                              <div>
                                {price}грн
                              </div>
                            )}
                        </div> 
                    </div>
                    <div className={classes.collapseComment}>
                        <Comment 
                            decor={decor} 
                            handleSaveComment={handleSaveComment} 
                            comment={comment}
                            setComment={setComment}
                            newComment={newComment}
                            setNewComment={setNewComment}
                            isEditingComment={isEditingComment} 
                            setIsEditingComment={setIsEditingComment} 
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default MobileDecorItem;
