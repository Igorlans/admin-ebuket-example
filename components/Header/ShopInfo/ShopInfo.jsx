import classes from './shopInfo.module.scss';
import Image from "next/image";
import {signOut, useSession} from "next-auth/react";
import { motion } from "framer-motion";
import { useMediaQuery } from '@mui/material';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { useRef, useState } from 'react';
import Switch from '@/components/UI/Switch/Switch';
import Button from '@/components/UI/Button/Button';
import { CiWallet } from 'react-icons/ci';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { BsBellFill } from 'react-icons/bs';
import BalanceWindow from './balance/Balance';
import { useOnClickOutside } from '@/hooks/useClickOutside';

const ShopInfo = ({imgUrl = '/assets/icons/shop_placeholder.svg', starsNum, bouquetNum}) => {

	const {data: session} = useSession()
	const name = session?.user?.store?.shop_name;
	const isSuperUser = !!session?.user?.SuperUser?.id;
	const signInHandler = async () => {
		await signOut()
	}
	const matches = useMediaQuery('(max-width: 991px)');
	const [open, setOpen] = useState(false)
	const [showBalance, setShowBalance] = useState(false);
	const [takeHelp, setTakeHelp] = useState(false);
	const [isAvailable, setIsAvailable] = useState(false);
	const ref = useRef(null);

    useOnClickOutside(ref, () => setShowBalance(false));
	useOnClickOutside(ref, () => setTakeHelp(false));
	


	return (
		
		<div className={classes.wrapper}>
			<div className={classes.shopInfo}>
				<div className={classes.image} onClick={signInHandler}>
					<img src={imgUrl} alt={'shop_image'} width={48} height={48} />
				</div>
				<div className={classes.content}>
					<div className={classes.title}>{(isSuperUser ? 'SUPERUSER' : name) || 'Noname'}</div>
					{!isSuperUser
						?
						<>
							<div className={classes.info}>
								<div className={classes.stars}>
									<Image src={'/assets/icons/star.svg'} alt={'star'} width={18} height={18} />
									{`${starsNum}/5`}
								</div>
								<div className={classes.bouqets}>
									<Image src={'/assets/icons/flower.svg'} alt={'flower'} width={18} height={18} />
									<div className={classes.bouqets_text}>
										<span>Букетів: </span>
										{bouquetNum}
									</div>
								</div>
							</div>
						</>
						: null
					}

				</div>
				<div>
					{
						matches ? (
						<div style={{color: "#000", opacity: '0.5'}} className={classes.btnOpenCollapse} onClick={()=> setOpen(!open)}>
							{
								open ? <MdExpandLess size="1.8rem"/> :  <MdExpandMore size="1.8rem" onClick={()=> setOpen(open)}/>
							} 
						</div>
						): (null)
					}
				</div>
			</div>
				{!isSuperUser
					?
					<>
						{matches ? (
							open ? (
								<div className={classes.collapse}>
									<BalanceWindow />
								</div>
							) : (null)
						) : (
							<div className={classes.shopControl}>
								<div className={classes.switchBox}>
									<p>Магазин працює</p>
									<Switch value={isAvailable} onChange={(e) => { setIsAvailable(!isAvailable)}}/>
								</div>
								<div className={classes.info}>
									<div onClick={()=> {setTakeHelp(!takeHelp)}}>
										<AiFillQuestionCircle size="1.8rem" style={{opacity: takeHelp ? 1 : "0.5"}}/>
									</div>
									<div className={classes.bellBox}>
										<div className={classes.chip}>1</div>
										<BsBellFill size="1.8rem"/>
									</div>
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
								<div className={classes.balance}>
									<Button className={classes.balanceBtn} onClick={()=> setShowBalance(!showBalance)}>
										<CiWallet/>
										1000грн
										{
											showBalance ? (
												<MdExpandLess size={'1.6em'} />
											):(<MdExpandMore size={'1.6em'} />)
										}

									</Button>
								</div>
								{
									showBalance ? (
										<motion.div
											className={classes.balanceWindow}
											initial={{ y: "-10%" }}
											animate={{ y: showBalance ? "0%" : "-50%" }}
											transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
											ref={ref}
											onClick={(event) => event.stopPropagation()}
										>
											<BalanceWindow/>
										</motion.div>
									):(null)
								}
							</div>
						)
						}
					</>
					: null
				}		
		</div>
	);
};

export default ShopInfo;