import Button from "@/components/UI/Button/Button";
import { useState } from "react";
import classes from "./balance.module.scss"
import ModalTransactions from "./ModalTransactions/ModalTransactions";


const BalanceWindow = () => {
	const [open, setOpen] = useState(false);

    return ( 
        <div className={classes.balanceWindow}>
			<div className={classes.top}>
                Баланс магазину: 1000 грн
			</div>
            <div className={classes.descr}>
                <p>На списанні: 100грн</p>
                Буде списано після завершеня замовлення або 
                у випадку відміни замовлення поверно на баланс
			</div>
            <div className={classes.btns}>
                <Button variant="contained">
                    Поповнити
                </Button>
                <Button variant="outlined" onClick={()=>{setOpen(!open)}}>
                    Історія
                </Button>
            </div>
            
            <ModalTransactions open={open} setOpen={setOpen}/>
		</div>
     );
}
 
export default BalanceWindow;