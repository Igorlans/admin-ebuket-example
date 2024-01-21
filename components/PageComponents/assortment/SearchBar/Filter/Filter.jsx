import { Chip, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import classes from "./filter.module.scss"
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { useOnClickOutside } from "@/hooks/useClickOutside";



const Filter = ({FilterItems, selectedTags, setSelectedTags, openFilter, setOpenFilter, openCategory, setOpenCategory}) => {

  
    // const filteredItems = FilterItems.filter((item) => {
    //     // filter based on search query
    //     if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
    //       return false;
    //     }
    //     // filter based on selected subcategories
    //     if (selectedTags.length > 0) {
    //       const selectedCategoryIds = selectedTags.map((tag) => tag.id);
    //       if (!selectedCategoryIds.includes(item.id)) {
    //         return false;
    //       }
    //     }
    //     return true;
    // });


    const [selectedSubcategory, setSelectedSubcategory] = useState(null)
    
    const handleCategoryClick = (index) => {
        if (openCategory === index) {
            setOpenCategory(null);
        } else {
            setOpenCategory(index);
        }
    }
    
    const handleSubcategoryClick = (e, subcategoryId, subcategoryTitle) => {
        // додали логіку для оновлення стану обраних тегів
        const selectedCategory = FilterItems.find(category => category.options.some(option => option.id === subcategoryId))
        setSelectedTags(prevTags => {
          const updatedTags = prevTags.filter(tag => tag.id !== selectedCategory.id)
          return [...updatedTags, {id: selectedCategory.id, criterion: selectedCategory.title, value: subcategoryTitle}]
        })
        setSelectedSubcategory({ id: subcategoryId, title: subcategoryTitle });
    }

    const handleTagClick = (categoryId) => {
        // додали логіку для видалення вибраного тегу
        setSelectedTags(prevTags => prevTags.filter(tag => tag.id !== categoryId))
        setSelectedSubcategory(null);
    }
    
    return ( 
        <div className={classes.wrapper}>
            <div className={classes.filter}>
                <div className={classes.box} onClick={() => setOpenFilter(!openFilter)}>
                    <div>Фільтр</div>
                    {openFilter ? <MdExpandLess size="1.3rem"/> : <MdExpandMore size="1.3rem"/>}
                </div>
                {openFilter && (
                    <div className={classes.categories}>
                        {FilterItems.map((item, index) => (
                            <>
                                <div className={classes.category} key={item.id} onClick={() => handleCategoryClick(index)}>
                                        {item.title}
                                        {openCategory === index ? (
                                            <MdExpandLess size="1.3rem"/>
                                        ) : (
                                            <MdExpandMore size="1.3rem"/>
                                        )}
                                </div>
                                {openCategory === index && (
                                    <div className={classes.subcategories}>
                                        {item.options.map((option) => (
                                            <div className={classes.subcategory} mainCategory={openCategory} key={option.id} onClick={(e) => handleSubcategoryClick(e, option.id, option.title)}>
                                                {option.title}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                )}
            </div>
            <div className={classes.tags}>
                    {selectedTags?.map(tag => (
                        <div className={classes.selected} key={tag.id}>
                            <div>
                                {tag.title}
                            </div>
                            <CgClose size="2rem" onClick={() => handleTagClick(tag.id)} style={{cursor: 'pointer', opacity: '0.7'}}/>
                        </div>
                    ))}
                </div>
        </div>
    );
}


export default Filter;