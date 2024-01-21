
import { useState } from "react";
import classes from "./mobileReviewItem.module.scss"
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { Button, Menu, MenuItem } from "@mui/material";
import { BsCart2, BsThreeDotsVertical } from "react-icons/bs";
import Rate from "@/components/UI/Rate/Rate";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import {apiRequest} from "@/utils/apiRequest";
import Status from "@/components/UI/Admin/Status/Status";


const MobileReviewItem = ({review}) => {

    const [status, setStatus] = useState(review?.status_moderation);
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

    const handleModerate = async (status) => {
        try {
            await toast.promise(
                apiRequest('/api/moderateReview', {id: review.id, status_moderation: status}, 'PUT'),
                {
                    loading: 'Оновлення...',
                    success: (review) => {
                        setStatus(review.status_moderation)
                        setAnchorEl(null)
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
            <div className={classes.tableCell} onClick={handleClick}>
                <div className={classes.tableCollumn}>
                    {open ? <MdExpandLess size="1.7rem"/> :  <MdExpandMore size="1.7rem"/>} 
                </div>
                <div className={classes.tableCollumn}>
                    {review?.image?.url &&
                     <img style={{width: '100%', height: '100%', objectFit: 'cover', maxWidth: '75px', margin: "0px auto",borderRadius: '10px'}} src={review?.image?.url} alt="" />
                    }
                </div>
                <div className={classes.reviewInfo}>
                    <div className={classes.reviewDate}>
                        {dayjs(review.created_at).format("DD.MM.YYYY")}
                    </div>
                    <Status variant={status} />
                    <div className={classes.reviewStars}>
                        <Rate starsNum={review.stars} />
                    </div>
               </div>
                <div className={classes.tableCollumn} onClick={(e) => e.stopPropagation()}  style={{marginRight: '0px', display: 'flex', justifyContent:' flex-end'}}>
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
                      <MenuItem onClick={() => handleModerate('ALLOWED')}>Дозволити</MenuItem>
                      <MenuItem onClick={() => handleModerate('REJECTED')}>Відхилити</MenuItem>
                    </Menu>
                </div>    
            </div>
            {open && (
                <div className={classes.collapse}>
                    <div>
                        {review?.Order?.name}
                    </div>
                    <div>
                        <div>norm</div>
                        <div>{review?.describe}</div>
                    </div>
                    
                </div>
            )}
        </>
    )
}

export default MobileReviewItem;
