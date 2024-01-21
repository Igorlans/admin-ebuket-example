import classes from './sidebar.module.scss';
import Image from "next/image";
import SidebarMenu from "@/components/Sidebar/SidebarMenu/SidebarMenu";
import { Drawer, useMediaQuery } from '@mui/material';
import { CgClose } from 'react-icons/cg';
import { useSession } from 'next-auth/react';
import ShopInfo from '../Header/ShopInfo/ShopInfo';

const Sidebar = ({open, setOpen}) => {

	const matches = useMediaQuery('(max-width: 991px)');
	const matches400 = useMediaQuery('(max-width: 400px)');
	const {data: session} = useSession()
	return (
		<>
			{matches ? (	
					<Drawer
						anchor={"left"}
						open={open}
						onClose={()=> setOpen(false)}
						PaperProps={{
							style: {width: matches400 ? '85%' : '75%'}
						}}
			  		>
						<div className={classes.mobileSidebar}>
							<div className={classes.top}>
								<Image src={'/assets/icons/logo.svg'} alt={'main_logo'} width={145} height={40} />
								<CgClose size="1.6rem" onClick={()=> setOpen(false)}/>
							</div>
							<div style={{backgroundColor: '#fff' }}>
								<ShopInfo imgUrl={session?.user?.store?.image?.url || '/assets/icons/shop_placeholder.svg'} bouquetNum={50} starsNum={4.3} name={session?.user?.store?.shop_name}/>
							</div>
							<SidebarMenu />
						</div>
			  		</Drawer>
				):(
					<aside className={classes.sidebar}>
						<div className={classes.logo}>
							<Image src={'/assets/icons/logo.svg'} alt={'main_logo'} width={145} height={40} />
						</div>
						<SidebarMenu />
					</aside>	
				)
			}
		</>
	);
};

export default Sidebar;