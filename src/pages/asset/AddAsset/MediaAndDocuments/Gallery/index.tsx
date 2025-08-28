

import { motion } from 'framer-motion';
import FormGenerator from '@/components/UseForm/FormGenerator';
import formConfig from './formConfig';
import { Image, Video, FileText, Camera, Sparkles } from 'lucide-react';

// Animation variants
const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  initial: { opacity: 0, y: 30, scale: 0.9 },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.6
    }
  }
};

const headerVariants = {
  initial: { opacity: 0, x: -30 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  }
};

const Index = () => {
  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Enhanced Header */}
      

      {/* Enhanced Form Grid with Cards */}
      <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Upload Card */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-300"
          whileHover={{ y: -4 }}
        >
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center gap-3 text-gray-800">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="p-2 bg-blue-100 rounded-lg"
              >
                <Image className="w-5 h-5 text-blue-600" />
              </motion.div>
              <h3 className="text-lg font-semibold">Property Images</h3>
            </div>
            <p className="text-gray-600 text-sm mt-1">Upload high-quality images of your property</p>
          </div>
          <div className="p-6">
            {FormGenerator(formConfig().filter(field => 
              field.name === 'media.imageURL' || field.name === 'media.gallery'
            ))}
          </div>
        </motion.div>

        {/* Video & Links Card */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-300"
          whileHover={{ y: -4 }}
        >
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center gap-3 text-gray-800">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="p-2 bg-purple-100 rounded-lg"
              >
                <Video className="w-5 h-5 text-purple-600" />
              </motion.div>
              <h3 className="text-lg font-semibold">Video & Presentations</h3>
            </div>
            <p className="text-gray-600 text-sm mt-1">Add video tours and pitch deck links</p>
          </div>
          <div className="p-6 space-y-6">
            {FormGenerator(formConfig().filter(field => 
              field.name === 'media.videoURL' || field.name === 'media.pitchDeckURL'
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Tips Card */}

    </motion.div>
  );
};
export default Index;
