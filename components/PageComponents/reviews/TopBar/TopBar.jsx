import Image from "next/image";
import Filter from "../../assortment/SearchBar/Filter/Filter";
import classes from "./topBar.module.scss"

const TopBar = ({FilterItems}) => {
    return ( 
        <div className={classes.wrapper}>
            <Filter FilterItems={FilterItems}/>
            <div className={classes.storeStatistic}>
                <div className={classes.main}>
                    97% позитивних  відгуків
                </div>
                <div className={classes.extra}>
                    <div className={classes.rate}>
                        <Image src="./assets/icons/icon_cup.svg" width="33" height="33"/>
                        <div>
                            <p>5+</p>
                            <p>Рейтинг</p>
                        </div>
                    </div>
                    <div className={classes.reviews}>
                        <Image src="./assets/icons/icon_reviewsGreen.svg" width="33" height="33"/>
                        <div>
                            <p>150</p>
                            <p>відгуків</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default TopBar;