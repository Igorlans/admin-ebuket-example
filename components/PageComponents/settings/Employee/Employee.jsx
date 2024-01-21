import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from "@/components/UI/Button/Button"
import { useMediaQuery } from "@mui/material"
import classes from "./employee.module.scss"
import {useRouter} from "next/navigation";
import EmployeeItem from "./EmployeeItem/EmployeeItem"
import MobileEmployeeItem from "./MobileEmployeeItem/MobileEmployeeItem"



const Employee = ({employees}) => {
    console.log(employees)
    const router = useRouter();
    const matches = useMediaQuery('(max-width: 991px)');

    return (
        <div className={classes.employee}>
          <Button
            onClick={() => router.push('employee/create')}
            style={{ position: 'absolute', top: 15, right: 15 }}
          >
            Додати працівника
          </Button>
          {matches ? (
            <>
              {employees && employees.length ? (
                <>
                  {employees.map((employee) => (
                    <MobileEmployeeItem key={employee.id} employee={employee} />
                  ))}
              </>
                ) : (
                  <div className={classes.employeeNotFound}>
                    <h2 className={classes.title}>
                      Додайте працівника
                      для зручного управліня філіалами 
                    </h2>
                    <Button onClick={() => router.push('employee/create')}>
                      Додати працівника
                    </Button>
                  </div>
                )}
            </>
          ) : (
            <>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow style={{whiteSpace: 'nowrap'}}>
                      <TableCell>Ім'я</TableCell>
                      <TableCell>Посада</TableCell>
                      <TableCell>Телефон</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                    {employees && employees.length ? (
                      <>
                          <TableBody>
                            {employees.map((employee) => (
                              <EmployeeItem key={employees.id} employee={employee} />
                            ))}
                          </TableBody>
                      </>
                    ) : (
                      <div className={classes.employeeNotFound}>
                        <h2 className={classes.title}>
                          Додайте працівника для зручного управліня філіалами 
                        </h2>
                        <Button onClick={() => router.push('employee/create')}>
                          Додати працівника
                        </Button>
                      </div>
                    )}
                </Table>
              </TableContainer>
            </>
        )}
      </div>
    )
}

export default Employee;