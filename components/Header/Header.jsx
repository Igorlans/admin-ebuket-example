import classes from './header.module.scss';
import ShopInfo from "@/components/Header/ShopInfo/ShopInfo";
import { useMediaQuery } from '@mui/material';
import { RxHamburgerMenu } from 'react-icons/rx';
import { motion } from "framer-motion";
import { BsBellFill } from 'react-icons/bs';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { useRef, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { useOnClickOutside } from '@/hooks/useClickOutside';

const Header = ({session}) => {
	const matches = useMediaQuery('(max-width: 991px)');
	const [open, setOpen] = useState(false);
	const [takeHelp, setTakeHelp] = useState(false);
	const ref = useRef(null);
	const isSuperUser = !!session?.user?.SuperUser?.id;
	useOnClickOutside(ref, () => setTakeHelp(false));


	return (
		<header className={classes.header}>
			{matches ? (
				<div className={classes.mobileHeader}>
					<Sidebar open={open} setOpen={setOpen}/>
					<div 
						className={classes.burger}
						>
						<RxHamburgerMenu size="1.8rem" onClick={()=> {
							setOpen(true)
						}}/>
					</div>
					{
						isSuperUser
							?
							<>
								<div className={classes.info}>
									<AiFillQuestionCircle size="1.8rem" onClick={()=> {setTakeHelp(!takeHelp)}}/>
									<BsBellFill size="1.8rem"/>
								</div>
								{ takeHelp ? (
									<motion.div
										className={classes.takeHelp}
										initial={{ y: "-10%" }}
										animate={{ y: takeHelp ? "0%" : "-50%" }}
										transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
										ref={ref}
										onClick={(event) => event.stopPropagation()}
									>
										<div><img src="assets/icons/icon_viber.svg" alt="icon viber"/><p>Viber</p></div>
										<div><img src="assets/icons/icon_telegram.svg" alt="icon telegram"/><p>Телеграм</p></div>
										<div><img src="assets/icons/icon_email.svg" alt="icon email"/><p>E-mail</p></div>
										<div><img src="assets/icons/icon_question.svg" alt="icon question"/><p>FAQ</p></div>
										<div><img src="assets/icons/icon_youtube.svg" alt="icon youtube"/><p>Інструкція</p></div>
									</motion.div>
								):(null)
								}
							</>
						: null
					}
				</div>
			):(<ShopInfo imgUrl={session?.user?.store?.image?.url || '/assets/icons/shop_placeholder.svg'} bouquetNum={50} starsNum={4.3} name={session?.user?.store?.shop_name}/>)}
			
		</header>
	);
};

export default Header;

