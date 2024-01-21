import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useState } from 'react';
import classes from './reviewItem.module.scss';
import  dayjs  from 'dayjs';
import { useMemo } from 'react';
import Rate from '@/components/UI/Rate/Rate';
import Status from '@/components/UI/Admin/Status/Status';
import { FcCheckmark } from 'react-icons/fc';
import { AiOutlineClose } from 'react-icons/ai';
import toast from "react-hot-toast";
import {apiRequest} from "@/utils/apiRequest";


const ReviewItem = ({review}) => {
  const [status, setStatus] = useState(review?.status_moderation);
  const borderColor = useMemo(()=> {
        switch(review.stars) {
            case 5:return "#9DCA39"
            case 4:return "#9DCA39"
            case 3:return "#FADC3C"
            case 2:return "#F75454"
            case 1:return "#F75454"
            case 0:return "#F75454"
        }
    }, [])
    // const borderColor = () => {
    //   switch(review.stars){
    //     case 5:return "#9DCA39"
    //     case 4:return "#9DCA39"
    //     case 3:return "#FADC3C"
    //     case 2:return "#F75454"
    //     case 1:return "#F75454"
    //     case 0:return "#F75454"
    //   }
    // }

    const handleModerate = async (status) => {
        try {
            await toast.promise(
                apiRequest('/api/moderateReview', {id: review.id, status_moderation: status}, 'PUT'),
                {
                    loading: 'Оновлення...',
                    success: (bouquet) => {
                        setStatus(bouquet.status_moderation)
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
        <div className={classes.tableCell} style={{border: `1px solid ${borderColor}`}}>
            <div className={classes.tableCollumn} style={{marginLeft: '0px'}}>
                {review?.image?.url &&
                  <div style={{width: '75px', height: '75px', margin: '0px auto', borderRadius: '5px', overflow: 'hidden'}}>

                      <img style={{width: '100%', height: '100%', objectFit: 'cover'}} src={review?.image?.url} alt="" />
                  </div>
                }
            </div>
            <div>
              <Status variant={status} />
            </div>
            <div>
               <div className={classes.reviewInfo}>
                    <div className={classes.reviewStars}>
                        <Rate starsNum={review.stars} />
                    </div>
                   <div>
                       {review?.describe}
                   </div>

               </div>
            </div>
            <div className={classes.tableCollumn}>{review?.Order?.name}</div>
            <div className={classes.tableCollumn}>{dayjs(review?.created_at).format("DD.MM.YYYY")}</div>
            {/* <TableCell>{review.compliment}</TableCell> */}
            <div className={classes.tableCollumn}>{review?.describe}</div>
            <div className={classes.tableCollumn} style={{marginRight: '0px'}}>
              <div>
                <FcCheckmark
                  style={{ cursor: 'pointer', marginRight: '10px' }}
                  size="1.2rem"
                  onClick={() => handleModerate('ALLOWED')}
                />
                <AiOutlineClose
                  style={{ cursor: 'pointer' }}
                  size="1.2rem"
                  onClick={() => handleModerate('REJECTED')}
                />
              </div>
            </div>
        </div>
    );
};

export default ReviewItem;