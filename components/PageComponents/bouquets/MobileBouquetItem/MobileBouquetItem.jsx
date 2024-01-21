import { Button, Menu, MenuItem } from "@mui/material";
import {useCallback, useState} from "react";
import classes from "./mobileBouquetItem.module.scss"
import { BsCart2, BsThreeDotsVertical } from 'react-icons/bs';
import dayjs from "dayjs";
import ControlledSwitch from "@/components/UI/Switch/ControlledSwitch";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";
import {apiRequest} from "@/utils/apiRequest";
import {useRouter} from "next/navigation";
import Status from "@/components/UI/Admin/Status/Status";


const MobileBouquetItem = ({bouquet}) => {
    const router = useRouter()
    const [isAvailable, setIsAvailable] = useState(bouquet.prefer_stock || false);

// Menu
// ===========()
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

    const handleEdit = () => {
        router.push(`/bouquets/${bouquet.id}`)
    }

    const handleSwitchChange = useCallback(
        debounce(async () => {
            try {
                await toast.promise(
                    apiRequest('/api/bouquets/updateStock', {id: bouquet.id, prefer_stock: !isAvailable}, 'PUT'),
                    {
                        loading: 'Оновлення...',
                        success: () => {
                            setIsAvailable(!isAvailable)
                            return `Букет оновлено`
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
        <div className={classes.box} >
            <div className={classes.topRow}> 
                <div>
                    {bouquet?.images_hash?.images?.[0]?.url &&
                    <img src={bouquet?.images_hash?.images?.[0]?.url} alt="" />                  
                    }
                </div>
                <div>
                    {bouquet.name_buket}
                </div>
                <div>
                    <ControlledSwitch value={isAvailable} onChange={handleSwitchChange}/>
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
                        <MenuItem onClick={handleCloseMenu}>Видалити</MenuItem>
                    </Menu>
                </div>
            </div>
            <div className={classes.middleRow}>
                <div className={classes.createdAt}>{dayjs(bouquet.createdAt).format("DD.MM.YYYY")}</div>
                <div><a href="https://ebuket.vercel.app/ua/product/2" target="_blank">Дивитися на сайті</a></div>
                <div className={classes.price}>
                    <div style={{ display: 'flex',justifyContent: 'flex-end', gap: '10px', alignItems: 'right', position: 'relative', marginRight: '0px'}}>
                      <div>
                        {bouquet.price}грн
                      </div>
                    </div> 
                </div>
            </div>
            <div className={classes.bottomRow}>
                <Status variant={bouquet.status_moderation} />
                <div>
                    {/* {bouquet.category_buket} */}
                    {(() => {
                            switch (bouquet.category_buket) {
                                case "mono":
                                    return "Моно букети";
                                case "avtorsky":
                                    return "Авторські букети";
                                case "inBasket":
                                    return "Букети в кошику";
                                case "inBox":
                                    return "Букети в коробці";
                            }
                    })()}
                </div>
                <div className={classes.ordersValue}><BsCart2/>5</div>
                {/* тут має бути кількість продаж */}
            </div>
            {/* <div style={{
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
            </div> */}
        </div>
    )
}

export default MobileBouquetItem;
