import React, { useState } from 'react';

interface PhoneTemplateProps {
    onValueChange: (value: string) => void;
}

const phoneTemplates: { [key: string]: string } = {
  iPhone: "/images/iphone-8.png",
  Samsung: "/images/samsung-template.png",
  Huawei: "/images/huawei-template.png",
};

const PhoneTemplate: React.FC<PhoneTemplateProps> = ({onValueChange}) => {
  
  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onValueChange(phoneTemplates[e.target.value]);
  };
  
  return (
    <>
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
    </>
  );
};

export default PhoneTemplate;
