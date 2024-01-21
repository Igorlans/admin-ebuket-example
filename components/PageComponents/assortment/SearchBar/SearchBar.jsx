import { Chip, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import classes from "./searchBar.module.scss"
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import Filter from "./Filter/Filter";
import { useOnClickOutside } from "@/hooks/useClickOutside";

const SearchBar = ({FilterItems, selectedTags, setSelectedTags }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
    const ref = useRef(null);
    useOnClickOutside(ref, () => setOpenFilter(false));
    useOnClickOutside(ref, () => setOpenFilter(false));

    return (
      <div className={classes.box} ref={ref}>
        <Filter FilterItems={FilterItems} selectedTags={selectedTags} setSelectedTags={setSelectedTags} openFilter={openFilter} setOpenFilter={setOpenFilter} openCategory={openCategory} setOpenCategory={setOpenCategory}/>
        <div className={classes.input}>
          <TextField 
            size="small" 
            label="Пошук" 
            variant="outlined" 
            // onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className={classes.searchBtn}>
            <BsSearch size="1.3rem" />
          </div>
        </div>
      </div>
    );
  };
  
export default SearchBar;
  
  