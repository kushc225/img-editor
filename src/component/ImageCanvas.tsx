'use client';
import React, { useEffect, useRef } from 'react';
import { Canvas, Rect, Circle, Triangle, Polygon, Textbox, FabricImage } from 'fabric';
import { motion } from 'framer-motion';
import {
  Type,
  Square,
  Circle as CircleIcon,
  Triangle as TriangleIcon,
  Shapes,
  Download,
  FileJson,
} from 'lucide-react';

interface ImageCanvasProps {
  imgUrl: string;
}

const ImageCanvas: React.FC<ImageCanvasProps> = ({ imgUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    console.log('Initializing Fabric.js canvas');
    const fabricCanvas = new Canvas(canvasRef.current, {
      width: 1020,
      height: 500,
      backgroundColor: '#f3f3f3',
      selection: true,
      preserveObjectStacking: true,
    });

    fabricCanvasRef.current = fabricCanvas;

    console.log('Loading image from URL:', imgUrl);
    FabricImage.fromURL(imgUrl, { crossOrigin: 'anonymous' }).then((img) => {
      img.set({
        left: 100,
        top: 100,
        scaleX: 0.5,
        scaleY: 0.5,
      });
      fabricCanvas.add(img);
      fabricCanvas.requestRenderAll();
    });

    return () => {
      console.log('Disposing Fabric.js canvas');
      fabricCanvas.dispose();
    };
  }, [imgUrl]);

  const addText = () => {
    console.log('Adding text to canvas');

    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const text = new Textbox('Edit me', {
      left: 100,
      top: 100,
      fontSize: 24,
      fill: '#000',
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    console.log('Text added and set as active object');

    canvas.requestRenderAll();
  };

  const addRectangle = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    console.log('Adding rectangle to canvas');

    const rect = new Rect({
      left: 150,
      top: 150,
      width: 100,
      height: 60,
      fill: 'lightblue',
    });

    canvas.add(rect);
    console.log('Rectangle added to canvas');

    canvas.requestRenderAll();
  };

  const addCircle = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    console.log('Adding circle to canvas');

    const circle = new Circle({
      left: 200,
      top: 200,
      radius: 50,
      fill: 'lightgreen',
    });

    canvas.add(circle);
    console.log('Circle added to canvas');

    canvas.requestRenderAll();
  };

  const addTriangle = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    console.log('Adding triangle to canvas');

    const triangle = new Triangle({
      left: 250,
      top: 250,
      width: 100,
      height: 100,
      fill: 'lightcoral',
    });

    canvas.add(triangle);
    console.log('Triangle added to canvas');

    canvas.requestRenderAll();
  };

  const addPolygon = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    console.log('Adding polygon to canvas');


    const polygon = new Polygon(
      [
        { x: 0, y: 0 },
        { x: 100, y: 0 },
        { x: 100, y: 100 },
        { x: 0, y: 100 },
      ],
      {
        left: 300,
        top: 300,
        fill: 'lightyellow',
      }
    );

    canvas.add(polygon);
    console.log('Polygon added to canvas');

    canvas.requestRenderAll();
  };

  const exportAsSVG = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    console.log('Exporting canvas as SVG');

    let svg = canvas.toSVG();
    svg = svg.replace(/&(?!(amp;|lt;|gt;|quot;|apos;))/g, '&');

    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'canvas-export.svg';
    link.click();
    URL.revokeObjectURL(url);
    console.log('SVG exported and downloaded');


  };

  const exportAsJSON = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    console.log('Exporting canvas as JSON');

    const json = canvas.toJSON();
    const jsonStr = JSON.stringify(json, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'canvas-export.json';
    link.click();
    URL.revokeObjectURL(url);
    console.log('JSON exported and downloaded');


  };

  const buttonVariants = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.15, y: -4, transition: { type: 'spring', stiffness: 400, damping: 10 } },
    tap: { scale: 0.95 },
  };

  const canvasVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 120, damping: 20 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-100 to-blue-200 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 120, delay: 0.2 }}
          className="text-5xl font-bold font-comic text-purple-700 text-center mb-8 drop-shadow-md"
        >
          Create Your Masterpiece!
        </motion.h1>

        {/* Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.4 }}
          className="flex flex-wrap gap-3 mb-8 bg-white p-4 rounded-2xl shadow-lg border-4 border-yellow-300 justify-center"
        >
          <motion.button
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onClick={addText}
            className="flex items-center gap-2 px-4 py-2 bg-transparent text-blue-600 border-2 border-blue-600 rounded-full font-comic text-lg font-bold hover:bg-blue-100 transition-colors"
          >
            <Type size={20} />
            Add Text
          </motion.button>
          <motion.button
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onClick={addRectangle}
            className="flex items-center gap-2 px-4 py-2 bg-transparent text-red-600 border-2 border-red-600 rounded-full font-comic text-lg font-bold hover:bg-red-100 transition-colors"
          >
            <Square size={20} />
            Add Rectangle
          </motion.button>
          <motion.button
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onClick={addCircle}
            className="flex items-center gap-2 px-4 py-2 bg-transparent text-green-600 border-2 border-green-600 rounded-full font-comic text-lg font-bold hover:bg-green-100 transition-colors"
          >
            <CircleIcon size={20} />
            Add Circle
          </motion.button>
          <motion.button
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onClick={addTriangle}
            className="flex items-center gap-2 px-4 py-2 bg-transparent text-yellow-600 border-2 border-yellow-600 rounded-full font-comic text-lg font-bold hover:bg-yellow-100 transition-colors"
          >
            <TriangleIcon size={20} />
            Add Triangle
          </motion.button>
          <motion.button
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onClick={addPolygon}
            className="flex items-center gap-2 px-4 py-2 bg-transparent text-purple-600 border-2 border-purple-600 rounded-full font-comic text-lg font-bold hover:bg-purple-100 transition-colors"
          >
            <Shapes size={20} />
            Add Polygon
          </motion.button>
          <motion.button
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onClick={exportAsSVG}
            className="flex items-center gap-2 px-4 py-2 bg-transparent text-indigo-600 border-2 border-indigo-600 rounded-full font-comic text-lg font-bold hover:bg-indigo-100 transition-colors"
          >
            <Download size={20} />
            Export SVG
          </motion.button>
          <motion.button
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onClick={exportAsJSON}
            className="flex items-center gap-2 px-4 py-2 bg-transparent text-teal-600 border-2 border-teal-600 rounded-full font-comic text-lg font-bold hover:bg-teal-100 transition-colors"
          >
            <FileJson size={20} />
            Export JSON
          </motion.button>
        </motion.div>

        {/* Canvas */}
        <motion.div
          variants={canvasVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center rounded-2xl shadow-xl border-4 border-purple-300 overflow-hidden"
        >
          <canvas
            ref={canvasRef}
            width={900}
            height={500}
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ImageCanvas;