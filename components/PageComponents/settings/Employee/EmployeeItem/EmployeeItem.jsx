import TableRow from '@mui/material/TableRow';
import { Button, TextField, TableCell } from '@mui/material';
import Switch from '@/components/UI/Switch/Switch';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import { FcCheckmark } from 'react-icons/fc';
import classes from "./employeeItem.module.scss"
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {apiRequest} from "@/utils/apiRequest";




const EmployeeItem = ({employee}) => {
    console.log('EMPLOYEE', employee)
    const router = useRouter()
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const handleOpenMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
      setAnchorEl(null);
    };

    const handleEdit = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
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

    const {data: session} = useSession()
    console.log('SESSION', session)
  
    return (
        <>
            <TableRow key={employee.id}>
              <TableCell component="th" scope="row">{employee?.name || 'Не вказано'}</TableCell>
              <TableCell>{employee?.Employee?.role}</TableCell>
              <TableCell>{employee?.phone || 'Не вказано'}</TableCell>
              <TableCell>{employee?.email}</TableCell>
              <TableCell>
                  <div className={classes.btnMoreInfo}>
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
                          {session?.user?.userId !== employee?.id
                              ? <MenuItem onClick={handleDelete}>Видалити</MenuItem>
                              : null
                          }
                      </Menu>
                  </div>
              </TableCell>
            </TableRow>
        </>
    );
};

export default EmployeeItem;

