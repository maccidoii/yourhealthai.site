
import React from 'react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full m-4 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-slate-800">About & Contact</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="text-slate-600 space-y-4">
          <p>
            This AI Health Assistant is designed to be a helpful research tool, providing information based on user-provided symptoms and trusted medical sources.
          </p>
          
          <div>
            <h3 className="font-semibold text-slate-700">Contact Information</h3>
            <p><strong>Name:</strong> Muhammad Aliyu Maccido</p>
            <p><strong>Email:</strong> <a href="mailto:maliyumaccido@gmail.com" className="text-blue-600 hover:underline">maliyumaccido@gmail.com</a></p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-700">Support, Feedback & Contributions</h3>
            <p>
              Your feedback is invaluable for improving this tool. If you have suggestions, want to report an issue, or are interested in contributing, please reach out via the email above.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-700">Donations</h3>
            <p>
              If you find this tool useful, please consider supporting its development and maintenance through a donation. Contact for more details.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
