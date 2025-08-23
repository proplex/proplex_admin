

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
      <motion.div
        variants={headerVariants}
        className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg"
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="p-3 bg-gray-100 rounded-xl shadow-sm"
            whileHover={{ scale: 1.05, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Camera className="w-6 h-6 text-gray-700" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Media Gallery</h2>
            <p className="text-gray-600 mt-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gray-500" />
              Upload images, videos, and showcase your asset
            </p>
          </div>
        </div>
      </motion.div>

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
      <motion.div
        variants={cardVariants}
        className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg"
      >
        <div className="flex items-start gap-4">
          <motion.div
            className="p-2 bg-amber-100 rounded-lg"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FileText className="w-5 h-5 text-amber-600" />
          </motion.div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Media Upload Tips</h4>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                Upload high-resolution images (minimum 1920x1080 for main image)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                Video links should be from YouTube or Vimeo for best compatibility
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                Gallery images will be displayed in the order they are uploaded
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
export default Index;
