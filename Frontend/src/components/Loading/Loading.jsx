// loading.jsx
import { motion } from 'framer-motion';
import './loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="lds-circle">
        <motion.div className="circle" animate={{ rotateY: [0, 1800, 3600] }} transition={{ ease: 'easeInOut', duration: 2.4, loop: Infinity }}>
          {/* You can also use variants for more complex animations */}
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;
