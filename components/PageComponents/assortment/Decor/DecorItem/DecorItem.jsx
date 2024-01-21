import TableRow from '@mui/material/TableRow';
import { Button, TextField, TableCell } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { BiCommentDetail, BiCommentX } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { AiOutlineClose } from 'react-icons/ai';
import {useCallback, useState} from 'react';
import { FcCheckmark } from 'react-icons/fc';
import Comment from './comment/Comment';
import toast from "react-hot-toast";
import {apiRequest} from "@/utils/apiRequest";
import debounce from "lodash.debounce";
import ControlledSwitch from "@/components/UI/Switch/ControlledSwitch";
import {useRouter} from "next/navigation";




const DecorItem = ({decor}) => {
    const router = useRouter();

    const [isAvailable, setIsAvailable] = useState(decor.prefer_stock || false);
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState(decor.comment || '');
    const [isEditingComment, setIsEditingComment] = useState(false);
    const [newComment, setNewComment] = useState(decor.comment || '');
    const [isEditPrice, setIsEditPrice] = useState(false);
    const [newPrice, setNewPrice] = useState(decor.price || '');
    const [price, setPrice] = useState(decor.price || '');
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const handleOpenMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
      setAnchorEl(null);
    };

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

    console.log(decor);
    const handleEdit = () => {
        router.push(`/assortment/decor/${decor.id}`)
    }
    
    return (
        <>
            <TableRow
              key={decor.title_ua}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {/* {`${decor.decor.title_ua} ${decor.variety || ''}`} */}
              {decor.title}
              </TableCell>
              <TableCell >{decor.characteristic}</TableCell>
              <TableCell>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', position: 'relative'}}>
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
                            type="number"
                            sx={{width: '50px'}}
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
              </TableCell>
              <TableCell>Кіл. букетів</TableCell>
              <TableCell component="th" scope="row">
                  <ControlledSwitch value={isAvailable} onChange={handleSwitchChange}/>
              </TableCell>
              <TableCell>
                  {open ? (
                    <BiCommentX
                      onClick={() => setOpen(false)}
                      style={{ cursor: "pointer", opacity: "0.5"  }}
                      size="1.5rem"
                    />
                  ) : (
                    <BiCommentDetail
                      onClick={() => setOpen(true)}
                      style={{ cursor: "pointer", opacity: "0.5" }}
                      size="1.5rem"
                    />
                  )}
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
            {open ? (
                <TableCell colSpan={10} style={{ backgroundColor: "#F9F9FF", }}>
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
     
                </TableCell>
              ):(null)
            }
        </>
    );
};

export default DecorItem;

