import { motion, AnimatePresence } from 'framer-motion';

function Scale(props) {
    return (
        <AnimatePresence>
            <motion.div layout key={props.key} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }} exit={{ opacity: 0, scale: 0, transition: { duration: 0.5 } }}>
                {props.children}
            </motion.div>
        </AnimatePresence>
    )
}

export default Scale;