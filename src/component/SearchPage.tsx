'use client';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { config } from '@/config/config';

type PixabayImage = {
  id: number;
  webformatURL: string;
  tags: string;
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState<PixabayImage[]>([]);

  

  const handleSearch = async () => {
    try {
      console.log(config.API_KEY);
      const res = await axios.get('https://pixabay.com/api/', {
        params: {
          key: config.API_KEY,
          q: query,
          image_type: 'photo',
        },
      });
      setImages(res.data.hits);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const buttonVariants = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.15, y: -4, transition: { type: 'spring', stiffness: 400, damping: 10 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-200 via-pink-100 to-blue-200">
      {/* Header Section */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className="bg-gradient-to-r from-purple-400 to-pink-400 text-white py-12 rounded-b-3xl shadow-lg"
      >
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-5xl font-bold font-comic tracking-wide text-center drop-shadow-md">
            Cartoon Image Quest
          </h1>
          <p className="mt-3 text-xl font-comic text-center opacity-90">Find super fun pictures with a single click!</p>
        </div>
      </motion.div>

      {/* Search Bar */}
      <div className="max-w-5xl mx-auto px-6 -mt-8">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
          className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-2xl border-4 border-purple-300"
        >
          <input
            type="text"
            placeholder="Search for cool stuff (e.g., batman, superman, joker)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            className="flex-1 px-4 py-3 text-lg font-comic text-gray-700 bg-transparent border-none focus:outline-none focus:ring-4 focus:ring-transparent rounded-lg transition"
          />
          <motion.button
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onClick={handleSearch}
            className="flex items-center gap-2 px-10 py-3 bg-transparent text-green-600 border-2 border-green-600 rounded-full font-comic text-lg font-bold hover:bg-green-100 transition-colors shadow-md   "
          >
            <Search size={18} className="" />
            <p className=""> Go!</p>
          </motion.button>
        </motion.div>
      </div>

      {/* Image Grid */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {images.length === 0 && query === '' ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16"
            >
              <p className="text-2xl font-comic text-purple-700 font-bold">Ready for an adventure?</p>
              <p className="text-lg font-comic text-gray-600 mt-2">Search for something fun like &quot;unicorns&quot; or &quot;rainbows&quot;!</p>

            </motion.div>
          ) : images.length === 0 && query !== '' ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16"
            >
              <p className="text-2xl font-comic text-red-500 font-bold">Oops! No pics for "{query}"</p>
              <p className="text-lg font-comic text-gray-600 mt-2">Try something else, like "balloons" or "puppies"!</p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
            >
              {images.map((img) => (
                <Link href={`/edit/${encodeURIComponent(img.webformatURL)}`} key={img.id}>
                  <motion.div
                    variants={itemVariants}
                    className="relative overflow-hidden rounded-2xl shadow-lg border-4 border-yellow-300 bg-white transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    <img src={img.webformatURL} alt={img.tags} className="w-full h-56 object-cover" />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-black/40 bg-opacity-30 flex flex-col justify-between p-3"
                    >
                      <div></div> 
                      <div className="flex flex-col items-start gap-2">
                        <p className="text-white font-comic text-sm font-bold drop-shadow"> {img.tags.length > 30 ? img.tags.slice(0, 30) + '...' : img.tags}</p>
                        <Link href={`/edit/${encodeURIComponent(img.webformatURL)}`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-purple-700 font-comic font-bold text-sm px-4 py-2 rounded-full border-2 border-purple-700 bg-white hover:bg-purple-700 hover:text-white transition-colors duration-300"

                          >
                            Add Caption
                          </motion.button>
                        </Link>
                      </div>
                    </motion.div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
