import React, { useState, useEffect } from 'react';

// You'll need to replace this with the actual path to your PNG image
// For multiple images, you'd have an array of image URLs
const myPngImageUrl = '/egg.jpg'; 

interface ImageInstance {
  id: string;
  x: number; // percentage from left (0-100)
  y: number; // percentage from top (0-100)
  size: number; // in pixels (e.g., 20-60px)
  rotation: number; // degrees (0-360)
  opacity: number; // 0-1
  imageUrl: string; // If you want to use different images
}

interface RandomTilingBackgroundPNGProps {
  /**
   * The content to be rendered on top of the random background.
   */
  children: React.ReactNode;
  /**
   * Optional: URL for the PNG image to be tiled.
   * Defaults to a predefined image if not provided.
   */
  imageUrl?: string; 
  /**
   * Optional: Number of images to display.
   * Defaults to 30 if not provided.
   */
  numImages?: number;
  /**
   * Optional: Minimum size of the tiled images in pixels.
   * Defaults to 20px.
   */
  minSize?: number;
  /**
   * Optional: Maximum size of the tiled images in pixels.
   * Defaults to 60px.
   */
  maxSize?: number;
  /**
   * Optional: Minimum opacity of the tiled images (0-1).
   * Defaults to 0.3.
   */
  minOpacity?: number;
  /**
   * Optional: Maximum opacity of the tiled images (0-1).
   * Defaults to 0.7.
   */
  maxOpacity?: number;
  /**
   * Optional: Height of the background container.
   * Defaults to 500px if not provided.
   */
  height?: string;
  /**
   * Optional: Additional Tailwind CSS classes for the main container.
   */
  className?: string;
}

const RandomTilingBackgroundPNG: React.FC<RandomTilingBackgroundPNGProps> = ({
  children,
  imageUrl = myPngImageUrl, // Use prop if provided, else default
  numImages = 10,
  minSize = 100,
  maxSize = 200,
  minOpacity = 0.1,
  maxOpacity = 0.3,
  height = '500px',
  className = ''
}) => {
  const [images, setImages] = useState<ImageInstance[]>([]);

  useEffect(() => {
    const generatedImages: ImageInstance[] = [];
    for (let i = 0; i < numImages; i++) {
      generatedImages.push({
        id: `image-${i}`,
        x: Math.random() * 100, 
        y: Math.random() * 100, 
        size: Math.random() * (maxSize - minSize) + minSize, 
        rotation: Math.random() * 360, 
        opacity: Math.random() * (maxOpacity - minOpacity) + minOpacity,
        imageUrl: myPngImageUrl, // Use the same image for all, or pick from an array
      });
    }
    setImages(generatedImages);
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-100"> {/* Parent container */}
      {images.map((image) => (
        <img
          key={image.id}
          src={image.imageUrl}
          alt="background icon"
          className="absolute object-contain" // object-contain to ensure image isn't cropped
          style={{
            left: `${image.x}%`,
            top: `${image.y}%`,
            width: `${image.size}px`,
            height: `${image.size}px`,
            transform: `translate(-50%, -50%) rotate(${image.rotation}deg)`, // Center and rotate
            opacity: image.opacity,
            pointerEvents: 'none', // Prevents images from interfering with mouse events on content
          }}
        />
      ))}
      {children}
    </div>
  );
};

export default RandomTilingBackgroundPNG;