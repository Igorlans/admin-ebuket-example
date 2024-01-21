import { TableCell, TableRow } from "@mui/material";
import { useRouter } from "next/navigation";
import classes from "./seoitem.module.scss"

const SeoItem = ({page}) => {

    const router = useRouter();

    return ( 
        <TableRow className={classes.box} >
            <TableCell>Посилання</TableCell>
            <TableCell>h1</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
        </TableRow>
     );
}
 
export default SeoItem;