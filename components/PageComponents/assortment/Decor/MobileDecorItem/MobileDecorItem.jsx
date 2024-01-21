import Switch from "@/components/UI/Switch/Switch";
import { Button, Menu, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import classes from "./mobileDecorItem.module.scss"
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { FcCheckmark } from 'react-icons/fc';
import { AiOutlineClose } from 'react-icons/ai';
import Comment from '../DecorItem/comment/Comment';

const MobileDecorItem = ({decor}) => {
    const [isEditPrice, setIsEditPrice] = useState(false);
    const [newPrice, setNewPrice] = useState();
    const [isAvailable, setIsAvailable] = useState(false);
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
// Comment
// ===========
    const [comment, setComment] = useState(decor.comment || '');
    const [newComment, setNewComment] = useState();
    const [isEditingComment, setIsEditingComment] = useState(false);
    const handleSaveComment = () => {
        decor.comment = newComment;
        setComment(newComment);
        setIsEditingComment(false);
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
    const handleSavePrice = () => {
        decor.price = newPrice;
        setIsEditPrice(newPrice);
        setIsEditPrice(false);
    };

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
                {/* {`${decor.decor.title_ua} ${decor.variety || ''}`} */}
                {decor.title}
                <div>
                    <Switch value={isAvailable} onChange={()=> setIsAvailable(!isAvailable)}/></div>
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
                            <MenuItem onClick={handleCloseMenu}>Змінити</MenuItem>
                            <MenuItem onClick={handleCloseMenu}>Видалити</MenuItem>
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
                                {decor.price}грн
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
