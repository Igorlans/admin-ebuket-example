import React from 'react';
import classes from './modal.module.scss';
import Backdrop from "./Backdrop/Backdrop.jsx";
import {AnimatePresence, motion} from "framer-motion";
import {IoIosClose} from 'react-icons/io'

const dropIn = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.1,
            type: 'spring',
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.1,
            type: 'spring',
        }

    }
}
const Modal = ({title, children, isVisible, handleClose, style}) => {

    return (
        <AnimatePresence
            initial={false}
            mode={'wait'}
        >
            {isVisible && (
                <Backdrop>
                    <motion.div
                        style={style}
                        onClick={e => e.stopPropagation()}
                        className={classes.modal}
                        variants={dropIn}
                        initial={'hidden'}
                        animate={'visible'}
                        exit={'exit'}
                    >
                        <div className={classes.header}>
                            <div className={classes.header_text}>{title}</div>
                            <IoIosClose style={{cursor: "pointer", color: '#9C9CAA'}} onClick={handleClose} size={'2em'}/>
                        </div>
                        {children}
                    </motion.div>
                </Backdrop>
            )}
        </AnimatePresence>
    );
};

export default Modal;