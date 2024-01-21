import * as React from 'react';
import classes from "./modalTransactions.module.scss"
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import { useRef } from 'react';
import { RxCross2 } from 'react-icons/rx';

const transactions = [
    {
      id: 1,
      date: "15.22.23 16:07",
      value: "+750",
      name: "Комісія за замовлення №955567",
    },
    {
      id: 1,
      date: "12.22.23 22:14",
      value: "+250",
      name: "Комісія за замовлення №155567",
    },
    {
      id: 1,
      date: "29.22.23 16:38",
      value: "+550",
      name: "Комісія за замовлення №155567",
    },
    {
      id: 1,
      date: "11.22.23 11:35",
      value: "+150",
      name: "Комісія за замовлення №455567",
    },
    {
      id: 1,
      date: "16.22.23 10:30",
      value: "+850",
      name: "Комісія за замовлення №255567",
    },
    {
      id: 1,
      date: "18.22.23 5:20",
      value: "+450",
      name: "Комісія за замовлення №755567",
    },
    {
      id: 1,
      date: "15.22.23 16:07",
      value: "+750",
      name: "Комісія за замовлення №955567",
    },
    {
      id: 1,
      date: "12.22.23 22:14",
      value: "+250",
      name: "Комісія за замовлення №155567",
    },
    {
      id: 1,
      date: "29.22.23 16:38",
      value: "+550",
      name: "Комісія за замовлення №155567",
    },
    {
      id: 1,
      date: "11.22.23 11:35",
      value: "+150",
      name: "Комісія за замовлення №455567",
    },
    {
      id: 1,
      date: "16.22.23 10:30",
      value: "+850",
      name: "Комісія за замовлення №255567",
    },
    {
      id: 1,
      date: "18.22.23 5:20",
      value: "+450",
      name: "Комісія за замовлення №755567",
    },
]

const ModalTransactions = ({open, setOpen}) => {

  return (
    <div>
      <Modal open={open}>
        <div className={classes.box}>
            <div className={classes.top}>
              <p>Історія транзакцій</p>
              <div onClick={()=> setOpen(!open)}>
                <RxCross2 size="2rem"/>
              </div>
            </div>
            {
              transactions.map((transaction)=> 
                <div className={classes.item}>
                    <div className={classes.date}>
                      {transaction.date}
                    </div>
                    <div className={classes.value}>
                      {transaction.value}
                    </div>
                    <div className={classes.name}>
                      {transaction.name}
                    </div>
                </div>
              )
            }
        </div>
      </Modal>
    </div>
  );
}

export default ModalTransactions;