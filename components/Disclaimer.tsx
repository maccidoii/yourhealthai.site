
import React from 'react';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';

export const Disclaimer: React.FC = () => {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-800 p-4 rounded-md my-6 flex items-start gap-4" role="alert">
      <ExclamationTriangleIcon className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
      <div>
        <p className="font-bold">Important Medical Disclaimer</p>
        <p>This tool is for informational purposes only and does not provide medical advice. It is not a substitute for professional medical diagnosis, treatment, or advice. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>
      </div>
    </div>
  );
};
