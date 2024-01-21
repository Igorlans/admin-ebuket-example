import React from 'react';
import classes from './backdrop.module.scss';
import {motion} from "framer-motion";
const dropIn = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.1,
        }
    },
    exit: {
        opacity: 0
    }
}
const Backdrop = ({children, onClick}) => {
    return (
        <motion.div
            className={classes.backdrop}
            onClick={onClick}
            variants={dropIn}
            initial={'hidden'}
            animate={'visible'}
            exit={'exit'}
        >
            {children}
        </motion.div>
    );
};

export default Backdrop;