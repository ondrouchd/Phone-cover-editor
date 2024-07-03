import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

interface PhoneCoverWithCutoutProps {
  phoneTemplate: string;
}

const PhoneCoverWithCutout: React.FC<PhoneCoverWithCutoutProps> = ({ phoneTemplate }) => {
  const [image, setImage] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 200, height: 200 });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <div {...getRootProps()} className="w-full max-w-lg p-6 border-2 border-dashed rounded-lg cursor-pointer focus:outline-none mb-4">
        <input {...getInputProps()} />
        <p>Drag 'n' drop an image here, or click to select an image</p>
      </div>
      <div className="relative bg-white border-2 border-gray-300">
        {/* Camera cutout */}
        <div className="absolute top-7 left-8 w-24 h-12 bg-gray-50 border border-dotted border-gray-300 z-10 pointer-events-none" />
        {/* Phone template */}
        <img src={phoneTemplate} alt="phone template" className="w-[348px] h-[701px]" />
        {/* Draggable and Resizable Image */}
        {image && (
          <Draggable bounds="parent">
            <ResizableBox
              width={imageDimensions.width}
              height={imageDimensions.height}
              onResize={(e, { size }) => setImageDimensions({ width: size.width, height: size.height })}
              minConstraints={[50, 50]}
              maxConstraints={[300, 300]}
              className="absolute top-0 left-0"
            >
              <img
                src={image}
                alt="Uploaded"
                className="absolute top-0 left-0 w-full h-full"
                style={{ pointerEvents: 'none' }}
              />
            </ResizableBox>
          </Draggable>
        )}
      </div>
    </div>
  );
};

// const [image, setImage] = useState<string | null>(null);
// const [imageDimensions, setImageDimensions] = useState({ width: 100, height: 100 });
// const [rotation, setRotation] = useState(0);
// const [scale, setScale] = useState(1);

// const increaseScale = () => setScale(scale + 0.1);
// const decreaseScale = () => setScale(scale - 0.1);

{/* <Dropzone onDrop={onDrop} accept={["image/*"]} noClick noKeyboard>
            {({ getRootProps, getInputProps, open }) => (
              <div {...getRootProps()} className="dropzone border-2 border-dashed rounded p-4 items-center justify-center cursor-pointer">
                <input {...getInputProps()} />
                {image ? (
                  <>
                    <Draggable bounds="parent">
                      <ResizableBox
                        width={imageDimensions.width * scale}
                        height={imageDimensions.height * scale}
                      >
                        <img
                          src={image}
                          alt="Uploaded"
                          style={{
                            width: '100%',
                            height: '100%',
                            transform: `rotate(${rotation}deg)`,
                          }}
                        />
                      </ResizableBox>
                    </Draggable>
                    <div className="controls top-2 left-2 bg-white bg-opacity-80 p-2 rounded flex flex-col items-center">
                      <button onClick={increaseScale} className="mb-2 p-1 bg-blue-500 text-white rounded">Zoom In</button>
                      <button onClick={decreaseScale} className="mb-2 p-1 bg-blue-500 text-white rounded">Zoom Out</button>
                      <label className="mb-2">Rotate: </label>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={rotation}
                        onChange={(e) => setRotation(parseInt(e.target.value))}
                        className="w-full"
                      />
                      <button onClick={open} className="p-2 bg-blue-500 text-white rounded">Upload Image</button>
                    </div>
                  </>
                ) : (
                  <button onClick={open} className="p-2 bg-blue-500 text-white rounded">Upload Image</button>
                )}
              </div>
            )}
          </Dropzone> */}
          
export default PhoneCoverWithCutout