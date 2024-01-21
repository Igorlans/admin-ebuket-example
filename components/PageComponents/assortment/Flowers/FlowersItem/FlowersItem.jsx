import colors from '@/utils/colors.json';
import TableRow from '@mui/material/TableRow';
import {Button, TextField, TableCell} from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { BiCommentDetail, BiCommentX } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { AiOutlineClose } from 'react-icons/ai';
import {useCallback, useState} from 'react';
import { FcCheckmark } from 'react-icons/fc';
import Comment from './comment/Comment';
import ControlledSwitch from "@/components/UI/Switch/ControlledSwitch";
import debounce from 'lodash.debounce'
import toast from "react-hot-toast";
import {apiRequest} from "@/utils/apiRequest";
import {useRouter} from "next/navigation";


const FlowersItem = ({flower}) => {
    const router = useRouter()

    const [isAvailable, setIsAvailable] = useState(flower.prefer_stock || false);
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState(flower.comment || '');
    const [isEditingComment, setIsEditingComment] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [isEditPrice, setIsEditPrice] = useState(false);
    const [newPrice, setNewPrice] = useState('');
    const [price, setPrice] = useState(flower.price);

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

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
    const handleEditFlower = () => {
        router.push(`/assortment/flowers/${flower.id}`)
    }

    const handleOpenMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };

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


    const handleCloseMenu = () => {
      setAnchorEl(null);
    };

    const handleCommentInputChange = (event) => {
      setComment(event.target.value);
    };
  
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
  
    console.log(flower);
    
    return (
        <>
            <TableRow
              key={flower.title_ua}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {/* {`${flower.flower.title_ua} ${flower.variety || ''}`} */}
              </TableCell>
              <TableCell >{flower.variety}</TableCell>
              <TableCell >{flower.country}</TableCell>
              <TableCell>
                <div 
                    style={{
                        height: 30,
                        width: 50,
                        borderRadius: 5,
                        background: colors[flower.color],
                        border: '1px #000 solid'
                    }}>
                </div>
            </TableCell>
            <TableCell>{flower.height} см</TableCell>
            <TableCell>10</TableCell>
            <TableCell>
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
            </TableCell>
            <TableCell component="th" scope="row">
                <ControlledSwitch value={isAvailable} onChange={handleSwitchChange} />
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
                      <MenuItem onClick={handleEditFlower}>Змінити</MenuItem>
                      <MenuItem onClick={handleDeleteFlower}>Видалити</MenuItem>
                    </Menu>
                </div>
            </TableCell>
            </TableRow>
            {open ? (
                <TableCell colSpan={10} style={{ backgroundColor: "#F9F9FF"}}>
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
     
                </TableCell>
              ):(null)
            }
        </>
    );
};

export default FlowersItem;

