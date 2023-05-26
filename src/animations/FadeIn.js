import * as React from 'react';
import { motion } from 'framer-motion';

function FadeIn(props) {
    return (
        <motion.div
            initial={{ opacity: -0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 1 } }} >
            {props.children}
        </motion.div>
    );
}

export default FadeIn;