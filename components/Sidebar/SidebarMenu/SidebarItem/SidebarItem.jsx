import classes from './sidebarItem.module.scss';
import {MdExpandMore} from 'react-icons/md';
import Image from "next/image";
import {useCallback, useMemo, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {AnimatePresence, motion} from "framer-motion";

const SidebarItem = ({item}) => {
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const pathname = router.pathname;


	const activeLiStyle = useCallback((li) => {
		return {background: pathname === li.href ? '#30365b' : null}
	}, [pathname])
	const activeHeaderStyle = useMemo(() => {
		return {background: pathname === item.href ? '#3e4675' : null}
	}, [pathname])


	const clickHandler = () => {
		if (item.href) {
			router.push(item.href)
		} else {
			setOpen(!open)
		}
	}
	return (
		<li className={classes.sidebar_item}>
			<div className={classes.sidebar_header} onClick={clickHandler} style={activeHeaderStyle}>
				<div className={classes.text}>
					{item.iconSrc
						? <Image src={item.iconSrc} alt={item.title} width={20} height={20} />
						: null
					}
					{item.title}
				</div>
				{item?.options
					?
					<motion.span
						style={{width: 25, height: 25}}
						initial={'closed'}
						animate={open ? 'collapsed' : 'closed'}
						exit="collapsed"
						variants={{
							closed: {transform: 'rotate(0deg)'},
							collapsed: {transform: 'rotate(-180deg)'}
						}}
						transition={{duration: 0.2}}
					>
						<MdExpandMore size={'1.6em'} />
					</motion.span>
					: null
				}
			</div>


					{item?.options &&
						(open &&
							<AnimatePresence
								initial={true}
							>
								<motion.ul
									initial="collapsed"
									animate="open"
									exit="collapsed"
									variants={{
										open: {height: 'auto'},
										collapsed: {height: 0}
									}}
									transition={{duration: 0.2}}
									className={classes.sidebar_items}
								>
									{item?.options.map((li, index) =>
										<li style={activeLiStyle(li)} key={index} className={classes.li}><Link href={li?.href}>{li?.title}</Link></li>
									)}
								</motion.ul>
							</AnimatePresence>

						)
					}
		</li>
	);
};

export default SidebarItem;