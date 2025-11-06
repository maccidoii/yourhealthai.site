
import React, { useState, useCallback } from 'react';
import { analyzeSymptoms } from '../services/geminiService';
import { GeminiResponse, FileData } from '../types';
import { ResultsDisplay } from './ResultsDisplay';
import { UploadIcon } from './icons/UploadIcon';
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon';
import { XCircleIcon } from './icons/XCircleIcon';

const fileToBase64 = (file: File): Promise<FileData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64Data = result.split(',')[1];
      resolve({ mimeType: file.type, data: base64Data });
    };
    reader.onerror = error => reject(error);
  });
};

export const SymptomChecker: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GeminiResponse | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() && !file) {
      setError('Please describe your symptoms or upload an image.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      let fileData: FileData | undefined = undefined;
      if (file) {
        fileData = await fileToBase64(file);
      }
      const response = await analyzeSymptoms(prompt, fileData);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, file]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-700 mb-4">Symptom Checker</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="symptoms" className="block text-sm font-medium text-slate-600 mb-1">
            Describe your symptoms in detail:
          </label>
          <textarea
            id="symptoms"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., I have a persistent dry cough, a slight fever, and feel very tired..."
            rows={5}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            disabled={isLoading}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="file-upload" className="block text-sm font-medium text-slate-600 mb-1">
            Upload an image (e.g., a rash, swelling) (optional)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <UploadIcon className="mx-auto h-12 w-12 text-slate-400" />
              <div className="flex text-sm text-slate-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" disabled={isLoading} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          {file && (
            <div className="mt-2 flex items-center justify-between bg-slate-100 p-2 rounded-lg">
              <span className="text-sm text-slate-700 truncate">{file.name}</span>
              <button type="button" onClick={() => setFile(null)} disabled={isLoading}>
                <XCircleIcon className="h-5 w-5 text-red-500 hover:text-red-700" />
              </button>
            </div>
          )}
        </div>

        <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            <>
              <PaperAirplaneIcon className="h-5 w-5" />
              Analyze Symptoms
            </>
          )}
        </button>
      </form>

      {error && <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">{error}</div>}
      
      <div className="mt-6">
        {result && <ResultsDisplay result={result} />}
      </div>
    </div>
  );
};
