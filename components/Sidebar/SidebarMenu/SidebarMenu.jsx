
import classes from './sidebarMenu.module.scss';
import SidebarItem from "@/components/Sidebar/SidebarMenu/SidebarItem/SidebarItem";
import {useSession} from "next-auth/react";
import {managerRoles} from "@/config";

const superUserItems = [
	{id: 1, title: 'Приводи', iconSrc: '/assets/icons/settings.svg', href: '/admin/occasions'},
	{id: 2, title: 'Відгуки', iconSrc: '/assets/icons/reviews.svg', href: '/admin/reviews'},
	{id: 3, title: 'Квіти', iconSrc: '/assets/icons/bouquets.svg', href: '/admin/flowers'},
	{id: 4, title: 'Букети', iconSrc: '/assets/icons/bouquets.svg', href: '/admin/bouquets'},
	{id: 5, title: 'SEO', iconSrc: '/assets/icons/settings.svg', href: '/admin/seo'},
	{id: 6, title: 'Магазини', iconSrc: '/assets/icons/settings.svg', href: '/admin/shops'},	
]

const items = [
	{id: 1, title: 'Замовлення', iconSrc: '/assets/icons/cart.svg', href: '/orders'},
	{id: 3, title: 'Асортимент', iconSrc: '/assets/icons/assortment.svg', options: [
			{id: 31, title: 'Квіти', href: '/assortment/flowers'},
			{id: 32, title: 'Оформлення', href: '/assortment/decor'},
			{id: 33, title: 'Доповнення', href: '/assortment/addition'},
		]},
	{id: 4, title: 'Букети', iconSrc: '/assets/icons/bouquets.svg', href: '/bouquets'},
	{id: 5, title: 'Відгуки', iconSrc: '/assets/icons/reviews.svg', href: '/reviews'},
	{id: 5, title: 'Аналітика', iconSrc: '/assets/icons/analytics.svg', href: '/analytics?sort=week'},
	{id: 2, title: 'Налаштування', iconSrc: '/assets/icons/settings.svg', options: [
			{id: 21, title: 'Компанія', href: '/settings/company'},
			{id: 22, title: 'Оплата', href: '/settings/payments'},
			{id: 23, title: 'Доставки', href: '/settings/shipping'},
			{id: 24, title: 'Працівники', href: '/settings/employee'},
			{id: 25, title: 'Графік роботи', href: '/settings/schedule'},
		]},
]

const managerItems = [
	{id: 1, title: 'Замовлення', iconSrc: '/assets/icons/cart.svg', href: '/orders'},
	{id: 3, title: 'Асортимент', iconSrc: '/assets/icons/assortment.svg', options: [
			{id: 31, title: 'Квіти', href: '/assortment/flowers'},
			{id: 32, title: 'Оформлення', href: '/assortment/decor'},
			{id: 33, title: 'Доповнення', href: '/assortment/addition'},
		]},
	{id: 4, title: 'Букети', iconSrc: '/assets/icons/bouquets.svg', href: '/bouquets'},
	{id: 5, title: 'Відгуки', iconSrc: '/assets/icons/reviews.svg', href: '/reviews'},
	{id: 5, title: 'Аналітика', iconSrc: '/assets/icons/analytics.svg', href: '/analytics?sort=week'},
]
const SidebarMenu = () => {
	const {data: session} = useSession();
	const isSuperUser = !!session?.user?.SuperUser?.id;
	const role = session?.user?.role;
	console.log("ROLE", role)

	const menuItems = isSuperUser ? superUserItems : (role !== 'OWNER' ? managerItems : items);

	return (
		<ul className={classes.sidebarMenu}>
			{menuItems?.map((item, index) =>
				<SidebarItem key={index} item={item} />
			)}
		</ul>
	);
};

export default SidebarMenu;