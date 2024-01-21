import colors from '@/utils/colors.json';
import { Button, Menu, MenuItem, TextField } from "@mui/material";
import {useCallback, useState} from "react";
import classes from "./mobileFlowersItem.module.scss"
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { FcCheckmark } from 'react-icons/fc';
import { AiOutlineClose } from 'react-icons/ai';
import Comment from '../FlowersItem/comment/Comment';
import debounce from "lodash.debounce";
import toast from "react-hot-toast";
import {apiRequest} from "@/utils/apiRequest";
import ControlledSwitch from "@/components/UI/Switch/ControlledSwitch";
import {useRouter} from "next/navigation";

const MobileFlowersItem = ({flower}) => {
    const router = useRouter();

    const [isEditPrice, setIsEditPrice] = useState(false);
    const [newPrice, setNewPrice] = useState(flower.price || '');
    const [price, setPrice] = useState(flower.price || '');
    const [isAvailable, setIsAvailable] = useState(flower.prefer_stock || false);
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
// Comment
// ===========
    const [comment, setComment] = useState(flower.comment || '');
    const [newComment, setNewComment] = useState(flower.comment || '');
    const [isEditingComment, setIsEditingComment] = useState(false);

// Menu
// ===========
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

// ChangePrice
// ===========
//
    const handleSaveComment = async () => {
        try {
            await toast.promise(
                apiRequest(
                    '/api/assortment/flowers/updateComment',
                    {id: flower.id, comment: newComment},
                    'PUT'
                ),
                {
                    loading: 'Оновлення...',
                    success: (flower) => {
                        console.log('new flower', flower)
                        setComment(flower.comment);
                        setIsEditingComment(false);
                        setNewComment('');
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
                    '/api/assortment/flowers/updatePrice',
                    {id: flower.id, price: Number(newPrice)},
                    'PUT'
                ),
                {
                    loading: 'Оновлення...',
                    success: (flower) => {
                        console.log('new flower', flower)
                        setPrice(flower.price)
                        setNewPrice(flower.price)
                        setIsEditPrice(false);
                        return `Квітка оновлена`
                    },
                    error: (err) => err.message
                }
            );
        } catch (e) {
            console.log(e)
        }
    };
    const handleEditFlower = () => {
        router.push(`/assortment/flowers/${flower.id}`)
    }

    const handleDeleteFlower = async () => {
        try {
            await toast.promise(
                apiRequest('/api/assortment/flowers?id='+flower.id, {}, 'DELETE'),
                {
                    loading: 'Видалення...',
                    success: (flower) => {
                        router.replace('/assortment/flowers')
                        return `Квітка видалена`
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
                    apiRequest('/api/assortment/flowers/updateStock', {id: flower.id, prefer_stock: !isAvailable}, 'PUT'),
                    {
                        loading: 'Оновлення...',
                        success: (flower) => {
                            setIsAvailable(!isAvailable)
                            return `Квітка оновлена`
                        },
                        error: (err) => err.message
                    }
                );
            } catch (e) {
                console.log(e)
            }
        }, 500)
        , [isAvailable]);


    return (
        <>
                <div style={{
                    padding: 15, 
                    backgroundColor: '#f6f6fa',
                    borderBottom: '1px solid #D7D7E5',}}>
                    <div className={classes.collapseTop} style={{marginBottom: '10px', gap: '10px'}}>
                        <div style={{
                            height: 30,
                            width: 50,
                            borderRadius: 5,
                            background: colors[flower.color],
                        }}></div>
                        <div>{flower.variety}</div>
                        <div><ControlledSwitch value={isAvailable} onChange={handleSwitchChange}/></div>
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
                                <MenuItem onClick={handleEditFlower}>Змінити</MenuItem>
                                <MenuItem onClick={handleDeleteFlower}>Видалити</MenuItem>
                            </Menu>
                        </div>
                    </div>
                    <div className={classes.collapseMiddle} style={{marginBottom: '10px'}}>
                        <div>{flower.height}</div>
                        <div>{flower.country}</div>
                        <div>10</div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', position: 'relative'}}>
                            <CiEdit
                              size="1.2rem"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                setNewPrice(flower.price);
                                setIsEditPrice(true);
                              }}
                            />
                            {isEditPrice ? (
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', }}>
                                  <TextField 
                                    sx={{width: '40px'}}
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
                            flower={flower} 
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
        </>
    )
}

export default MobileFlowersItem;
