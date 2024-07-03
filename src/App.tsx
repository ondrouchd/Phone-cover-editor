import React, { useState } from 'react';
import 'react-resizable/css/styles.css';
import PhoneCoverWithCutout from './components/PhoneCoverWithCutout';
import PhoneTemplate from './components/PhoneTemplate';

const App: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleTemplateChange = (newValue: string) => {
    setSelectedTemplate(newValue);
  };

  return (
    <div className="flex flex-col items-center">
      <PhoneTemplate onValueChange={handleTemplateChange}/>

      {selectedTemplate && (
        <div className="editor relative max-h-[70vh]">
          <PhoneCoverWithCutout phoneTemplate={selectedTemplate} />
        </div>
      )}
    </div>
  );
}

export default App;
