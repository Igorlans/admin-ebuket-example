import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { toCTR, sumKeyData, toINCOME, sumKeyArrayData, sumINCOME } from '@/utils/formatingAnalytic';


const AnalyticsTable = ({data}) => {

  const totalClicks = sumKeyArrayData(data, 'clicks')
  const totalViews = sumKeyArrayData(data, 'views')
  const totalOrders = sumKeyArrayData(data, 'orders')
  const totalIncome = sumINCOME(data)

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Назва</TableCell>
            <TableCell align="right">Кліків</TableCell>
            <TableCell align="right">Перегляди</TableCell>
            <TableCell align="right">Замовлення</TableCell>
            <TableCell align="right">CTR</TableCell>
            <TableCell align="right">Дохід</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow style={{backgroundColor: '#F3F9E7'}}>
            <TableCell><b>Всього</b></TableCell>
            <TableCell align="right"><b>{totalClicks}</b></TableCell>
            <TableCell align="right"><b>{totalViews}</b></TableCell>
            <TableCell align="right"><b>{totalOrders}</b></TableCell>
            <TableCell align="right">{toCTR(totalOrders, totalViews)}</TableCell>
            <TableCell align="right"><b>{totalIncome} грн</b></TableCell>
          </TableRow>
          {data.map((row) => (
            <TableRow
              key={row.name_buket}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.name_buket}</TableCell>
              <TableCell align="right">{ sumKeyData(row.Analytic, 'clicks') }</TableCell>
              <TableCell align="right">{ sumKeyData(row.Analytic, 'views')  }</TableCell>
              <TableCell align="right">{ sumKeyData(row.Analytic, 'orders') }</TableCell>
              <TableCell align="right">{ toCTR(
                                            sumKeyData(row.Analytic, 'orders'), 
                                            sumKeyData(row.Analytic, 'views')
                                            )}
              </TableCell>
              <TableCell align="right">{ toINCOME(sumKeyData(row.Analytic, 'orders'), row.price) } грн</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AnalyticsTable;
