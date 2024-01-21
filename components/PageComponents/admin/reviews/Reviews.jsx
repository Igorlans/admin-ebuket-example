// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
import MobileReviewItem from './MobileReviewItem/MobileReviewItem';
import ReviewItem from './ReviewItem/ReviewItem';
import { useMediaQuery } from '@mui/material';
import classes from './reviews.module.scss'


const FilterItems = [
  {id: 1, title: 'Оцінка', options: [
      {id: 1, title: '5'},
      {id: 2, title: '4'},
      {id: 1, title: '3'},
      {id: 2, title: '2'},
      {id: 2, title: '1'},
      {id: 2, title: '0'},
  ]},
]


const Reviews = ({reviews}) => {
  
    // const router = useRouter();
    
    const matches = useMediaQuery('(max-width: 991px)');

    return (
      <div className={classes.reviews}>
        {matches ? (
          <>
            {reviews && reviews.length ? (
                <>
                    {reviews.map((review) => (
                      <MobileReviewItem key={review.id} review={review} />
                    ))}
                </>
              ) : (
                <div className={classes.ReviewsNotFound}>
						      <h2 className={classes.title}>
						        Поки немає відгуків
						      </h2>
				        </div>
              )}
          </>
        ) : (
          <div>
            {/* <TopBar FilterItems={FilterItems}/> */}
            <div aria-label="simple table">
              <div sx={{marginBottom: '20px'}}>
                <div style={{whiteSpace: 'nowrap'}} className={classes.tableHead}>
                  <div style={{width: '75px'}}>Фото</div>
                  <div>Статус</div>
                  <div>Відгук</div>
                  <div>Автор</div>
                  <div>Дата</div>
                  <div>Комплімент</div>
                  <div>Керувати</div>
                </div>
              </div>
                {reviews && reviews.length ? (
                    <>
                        {reviews.map((review) => (
                            <ReviewItem key={review.id} review={review} describe={review.describe}/>
                        ))}
                    </>
                ) : (
					          <div className={classes.ReviewsNotFound}>
					          	<h2 className={classes.title}>
					          	  Поки немає відгуків
					          	</h2>
				            </div>
                  )}
                </div>
            </div>
          )}
      </div>
    );
};

export default Reviews;