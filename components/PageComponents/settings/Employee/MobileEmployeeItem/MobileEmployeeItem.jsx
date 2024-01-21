import Switch from "@/components/UI/Switch/Switch";
import { Button, Menu, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import classes from "./mobileEmployeeItem.module.scss"
import { BsThreeDotsVertical } from 'react-icons/bs';
import {useRouter} from "next/navigation";
import {apiRequest} from "@/utils/apiRequest";
import toast from "react-hot-toast";


const MobileEmployeeItem = ({employee}) => {

// Menu
// ===========
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const router = useRouter()
    const handleOpenMenu = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
    };
    const handleEdit = (event) => {
        event.stopPropagation();
        router.push(`/settings/employee/${employee.id}`)
    };

    const handleDelete = async (event) => {
        event.stopPropagation();
        setAnchorEl(null);
        try {
            await toast.promise(
                apiRequest(`/api/employee?id=${employee?.Employee?.id}`, {}, 'DELETE'),
                {
                    loading: 'Видалення працівника...',
                    success: (data) => `Працівника "${employee.name}" видалено`,
                    error: (err) => err.message
                }
            );
            router.push('/settings/employee')
        } catch (e) {
            console.log(e)
        }
        router.replace(`/settings/employee`)
    };

    return (
        <div className={classes.box}>
            <div className={classes.topRow}> 
                <div>{employee?.name || 'Не вказано'}</div>
                <div style={{justifySelf: 'center'}}>{employee?.Employee?.role}</div>
                <div style={{justifySelf: 'end'}}>
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
            <div className={classes.bottomRow}>
              {/* <div>{employee.phone}</div> */}
              <div>{employee.email}</div>
            </div>
        </div>
    )
}

export default MobileEmployeeItem;
