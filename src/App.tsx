import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const phoneTemplates: { [key: string]: string } = {
  iPhone: '/images/iphone-8.png',
  Samsung: '/images/samsung-template.png',
  Huawei: '/images/huawei-template.png',
};

const App: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 100, height: 100 });
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTemplate(phoneTemplates[e.target.value]);
  };

  const increaseScale = () => setScale(scale + 0.1);
  const decreaseScale = () => setScale(scale - 0.1);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold my-4">Phone Cover Editor</h1>
      <div className="mb-4">
        <label className="mr-2">Select Phone Template: </label>
        <select onChange={handleTemplateChange} className="border p-2 rounded">
          <option value="">--Select--</option>
          {Object.keys(phoneTemplates).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>

      {selectedTemplate && (
        <div className="editor relative max-h-[70vh]">
          <img src={selectedTemplate} alt="Phone Template" className="phone-template w-[752px] h-[752px]" />
          <Dropzone onDrop={onDrop} accept={["image/*"]} noClick noKeyboard>
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
          </Dropzone>
        </div>
      )}
    </div>
  );
}

export default App;
