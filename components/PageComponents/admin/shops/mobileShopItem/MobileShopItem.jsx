import { Button, Menu, MenuItem } from "@mui/material";
import {useState} from "react";
import classes from "./mobileShopItem.module.scss"
import { BsThreeDotsVertical } from 'react-icons/bs';
import dayjs from "dayjs";
import toast from "react-hot-toast";
import {apiRequest} from "@/utils/apiRequest";
import {useRouter} from "next/navigation";
import Status from "@/components/UI/Admin/Status/Status";


const MobileShopItem = ({bouquet}) => {
    const router = useRouter()
// Menu
// ===========()
    const [anchorEl, setAnchorEl] = useState(null);
    const [status, setStatus] = useState(bouquet.status_moderation)
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
        router.push(`/admin/bouquets/${bouquet.id}`)
    }

    const handleModerate = async (status) => {
            try {
                await toast.promise(
                    apiRequest('/api/bouquets/moderate', {id: bouquet.id, status_moderation: status}, 'PUT'),
                    {
                        loading: 'Оновлення...',
                        success: (bouquet) => {
                            setStatus(bouquet.status_moderation);
                            setAnchorEl(null);
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
        <div className={classes.box} onClick={handleEdit}>
            <div className={classes.topRow} >
                <div>
                    {bouquet?.images_hash?.images?.[0]?.url &&
                    <img src={bouquet?.images_hash?.images?.[0]?.url} alt="" />                  
                    }
                </div>
                <div>
                    {bouquet.name_buket}
                </div>

                <div onClick={(event) => event.stopPropagation()}>
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
                <Status variant={status} />
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
                <div className={classes.ordersValue}>{bouquet.price}</div>
                {/* тут має бути кількість продаж */}
            </div>
        </div>
    )
}

export default MobileShopItem;
