

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
        className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100"
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg"
            whileHover={{ scale: 1.05, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Camera className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Media Gallery</h2>
            <p className="text-gray-600 mt-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
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
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
            <div className="flex items-center gap-3 text-white">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Image className="w-6 h-6" />
              </motion.div>
              <h3 className="text-lg font-semibold">Property Images</h3>
            </div>
            <p className="text-blue-100 text-sm mt-1">Upload high-quality images of your property</p>
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
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4">
            <div className="flex items-center gap-3 text-white">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Video className="w-6 h-6" />
              </motion.div>
              <h3 className="text-lg font-semibold">Video & Presentations</h3>
            </div>
            <p className="text-purple-100 text-sm mt-1">Add video tours and pitch deck links</p>
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
        className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200"
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
            <h4 className="text-lg font-semibold text-amber-900 mb-2">Media Upload Tips</h4>
            <ul className="text-amber-800 space-y-1 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-amber-600 rounded-full"></span>
                Upload high-resolution images (minimum 1920x1080 for main image)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-amber-600 rounded-full"></span>
                Video links should be from YouTube or Vimeo for best compatibility
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-amber-600 rounded-full"></span>
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
