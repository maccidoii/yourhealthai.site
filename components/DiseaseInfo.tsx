
import React, { useState } from 'react';
import { Disease } from '../types';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';

interface DiseaseInfoProps {
  diseases: Disease[];
}

const AccordionItem: React.FC<{ disease: Disease; isOpen: boolean; onClick: () => void }> = ({ disease, isOpen, onClick }) => {
  return (
    <div className="border-b border-slate-200">
      <h2>
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium text-left text-slate-700 hover:bg-slate-100 transition-colors"
          onClick={onClick}
          aria-expanded={isOpen}
        >
          <span>{disease.name}</span>
          <ChevronDownIcon
            className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </h2>
      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden`}>
        <div className="p-5 border-t-0 border-slate-200 bg-white">
            <div className="space-y-4 text-sm text-slate-600">
                <p>{disease.overview}</p>
                <div>
                    <h4 className="font-semibold text-slate-700">Common Symptoms:</h4>
                    <ul className="list-disc list-inside pl-2">
                        {disease.symptoms.map((symptom, i) => <li key={i}>{symptom}</li>)}
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold text-slate-700">Treatment:</h4>
                    <p>{disease.treatment}</p>
                </div>
                 <div>
                    <h4 className="font-semibold text-slate-700">Prevention:</h4>
                    <p>{disease.prevention}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};


export const DiseaseInfo: React.FC<DiseaseInfoProps> = ({ diseases }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
      <div className="flex items-center gap-2 mb-4">
        <BookOpenIcon className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-slate-700">Common Conditions Library</h2>
      </div>
      <p className="text-slate-500 text-sm mb-4">
        Browse information on common diseases. This content is for informational purposes only.
      </p>
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        {diseases.map((disease, index) => (
          <AccordionItem
            key={index}
            disease={disease}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
};
