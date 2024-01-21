import { useMemo } from "react";
import RateItem from "./RateItem";

const Rate = ({starsNum}) => {
    
    const color = useMemo(()=> {
        switch(starsNum){
            case 5:return "#9DCA39"
            case 4:return "#9DCA39"
            case 3:return "#FADC3C"
            case 2:return "#F75454"
            case 1:return "#F75454"
            case 0:return "#F75454"
        }
    }, [starsNum])


    return (
        <div style={{display: 'flex', gap: 3}}>
            {[...Array(starsNum)].map(star =>
                <RateItem color={color} />  
            )}
        </div>  
        
    );
}
 
export default Rate;