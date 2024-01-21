import Button from "@/components/UI/Button/Button";
import AdditionItem from "./Additionitem/AdditionItem";
import classes from "./bouquetPage.module.scss"
import DecorItem from "./DecorItem/DecorItem";
import FlowerItem from "./FlowerItem/FlowerItem";
import toast from "react-hot-toast";
import {apiRequest} from "@/utils/apiRequest";
import {useRouter} from "next/navigation";

const BouquetPage = ({bouquet}) => {
    const router = useRouter()
    const handleModerate = async (status) => {
        try {
            await toast.promise(
                apiRequest('/api/bouquets/moderate', {id: bouquet.id, status_moderation: status}, 'PUT'),
                {
                    loading: 'Оновлення...',
                    success: (bouquet) => {
                        router.push('/admin/bouquets')
                        return `Статус оновлено`
                    },
                    error: (err) => err.message
                }
            );
        } catch (e) {
            console.log(e)
        }
    }

    return ( 
        <div className={classes.page}>
            <div className={classes.statusButtons}  style={{ position: 'absolute', top: 15, right: 15 }}>
                <Button text="Підтвердити" onClick={()=> handleModerate('ALLOWED')} />
                <Button text="Відхилити" onClick={()=> handleModerate('REJECTED')} style={{background: "red"}} />
            </div>
            <div className={classes.sides}>
                <div className={classes.infoSide}>
                <div className={classes.item}>
                    <div className={classes.title}>
                        Назва букету
                    </div>
                    <div className={classes.descr}>
                        {bouquet.name_buket}
                    </div>
                </div>
                <div className={classes.item}>
                    <div className={classes.title}>
                        Розмір букету
                    </div>
                    <div className={classes.descr}>
                        {`${bouquet.size_width} x ${bouquet.size_height}`}
                    </div>
                </div>
                <div className={classes.item}>
                    <div className={classes.title}>
                        Час на зборку букету
                    </div>
                    <div className={classes.descr}>
                        {bouquet.time_build} хв
                    </div>
                </div>
                <div className={classes.item}>
                    <div className={classes.title}>
                        Привід
                    </div>
                    <div className={classes.descr}>
                        {bouquet?.occasions?.map(occas =>
                            <span key={occas.id}>{occas?.Occasion?.name}</span>
                        )}
                    </div>
                </div>
                </div>

                <div className={classes.photoSide}>
                    <div className={classes.photosContainer}>
                        <div className={classes.mainPhoto}><img src={bouquet.images_hash.images[0].url} alt="" /></div>
                        <div className={classes.extraPhotos}>
                            <div>
                                <img src={bouquet.images_hash.images[1].url} alt="" />
                            </div>
                            <div>
                                <img src={bouquet.images_hash.images[2].url} alt="" />
                            </div>
                            <div>
                                <img src={bouquet.images_hash.images[3].url} alt="" />
                            </div>
                            <div>
                                <img src={bouquet.images_hash.images[4].url} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.flowers}>
                <div className={classes.title}>Квіти</div>
                {bouquet.buket_flower?.map(flower =>
					<FlowerItem key={flower.id} flower={flower} />
				)}
            </div>
            <div className={classes.additions}>
                <div className={classes.title}>Доповнення</div>
                {bouquet.buket_addition?.map(addition =>
					<AdditionItem key={addition.id} addition={addition} />
				)}
            </div>
            <div className={classes.additions}>
                <div className={classes.title}>Оформлення</div>
                {bouquet.buket_decors?.map(decor =>
					<DecorItem key={decor.id} decor={decor} />
				)}
            </div>
            <div className={classes.buketPrice}>
				<span>Сума букету</span>
					<div>
						{bouquet.price + ' грн'}
					</div>
				</div>
        </div>
     );
}
 
export default BouquetPage;