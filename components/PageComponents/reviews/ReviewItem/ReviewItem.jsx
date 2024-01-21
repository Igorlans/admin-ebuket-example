import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useState } from 'react';
import classes from './reviewItem.module.scss';
import  dayjs  from 'dayjs';
import { useMemo } from 'react';
import Rate from '@/components/UI/Rate/Rate';


const ReviewItem = ({review}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const handleOpenMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
      setAnchorEl(null);
    };
    console.log(review);
    const borderColor = useMemo(()=> {
        switch(review.stars){
            case 5:return "#9DCA39"
            case 4:return "#9DCA39"
            case 3:return "#FADC3C"
            case 2:return "#F75454"
            case 1:return "#F75454"
            case 0:return "#F75454"
            // default: return "#F75454"
        }
    }, [])
    console.log(review.stars)
    
    return (
        <div className={classes.tableCell} style={{border: `1px solid ${borderColor}`}}>
            <div className={classes.tableCollumn} style={{marginLeft: '0px'}}>
              <div style={{width: '75px', height: '75px', margin: '0px auto', borderRadius: '5px', overflow: 'hidden'}}>
                {review?.image?.url &&
                  <img style={{width: '100%', height: '100%', objectFit: 'cover'}} src={review?.image?.url} alt="" />                  
                }
              </div>
            </div>
            <div>
               <div className={classes.reviewInfo}>
                    <div className={classes.reviewText}>
                        {review.describe}
                    </div>
                    <div className={classes.reviewId}>
                        Замовлення № 
                        <p>{review.id}</p>
                    </div>
                    <div className={classes.reviewStars}>
                        <Rate starsNum={review.stars} />
                    </div>
               </div>
            </div>
            <div className={classes.tableCollumn}>{review.Order.name}</div>
            <div className={classes.tableCollumn}>{dayjs(review.created_at).format("DD.MM.YYYY")}</div>
            {/* <TableCell>{review.compliment}</TableCell> */}
            <div className={classes.tableCollumn}>norm</div>
            <div className={classes.tableCollumn} style={{marginRight: '0px'}}>
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
        </div>
    );
};

export default ReviewItem;