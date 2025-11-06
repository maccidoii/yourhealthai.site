import React from 'react';
import { GeminiResponse, Diagnosis, HealthRecommendations } from '../types';
import { HeartIcon } from './icons/HeartIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { InformationCircleIcon } from './icons/InformationCircleIcon';

interface ResultsDisplayProps {
  result: GeminiResponse;
}

const DiagnosisCard: React.FC<{ diagnosis: Diagnosis }> = ({ diagnosis }) => {
  const score = parseInt(diagnosis.confidenceScore, 10);

  const getScoreColor = (value: number) => {
    if (value > 70) return 'bg-green-500';
    if (value > 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-slate-800">{diagnosis.condition}</h3>
          <span className="text-sm font-semibold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full">
            {diagnosis.confidenceScore} Confidence
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5 mb-4">
          <div className={`${getScoreColor(score)} h-2.5 rounded-full`} style={{ width: `${score}%` }}></div>
        </div>
        <p className="text-slate-600 text-sm mb-4">{diagnosis.description}</p>
        
        <div className="space-y-3 text-sm">
          <div>
            <h4 className="font-semibold text-slate-700">Treatment & Medication</h4>
            <p className="text-slate-600">{diagnosis.treatment}</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-700">Prevention</h4>
            <p className="text-slate-600">{diagnosis.prevention}</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-700 mb-1">Sources</h4>
            <ul className="list-disc list-inside space-y-1">
              {diagnosis.sources.map((source, index) => (
                <li key={index}>
                  <a href={source} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                    {source}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecommendationsDisplay: React.FC<{ recommendations: HealthRecommendations }> = ({ recommendations }) => {
  return (
    <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl my-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">General Health Recommendations</h2>
      <p className="text-sm text-slate-600 mb-6">
        Based on the symptoms provided, here are some general wellness suggestions. This is not medical advice and should not replace consultation with a healthcare professional.
      </p>
      
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
            <HeartIcon className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-lg">Lifestyle Adjustments</h3>
            <ul className="list-disc list-inside text-slate-600 mt-1 space-y-1">
              {recommendations.lifestyle.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="bg-sky-100 p-2 rounded-full flex-shrink-0">
            <ShieldCheckIcon className="h-6 w-6 text-sky-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-lg">Preventive Care</h3>
            <ul className="list-disc list-inside text-slate-600 mt-1 space-y-1">
              {recommendations.preventiveCare.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div>
        </div>

        <div className="bg-amber-100 border border-amber-200 p-4 rounded-lg flex items-start gap-4">
           <div className="bg-amber-200 p-2 rounded-full flex-shrink-0">
             <InformationCircleIcon className="h-6 w-6 text-amber-700" />
           </div>
          <div>
            <h3 className="font-semibold text-amber-800 text-lg">When to Consult a Professional</h3>
            <p className="text-amber-700 mt-1">{recommendations.whenToSeeDoctor}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md" role="alert">
        <p className="font-bold">Disclaimer</p>
        <p>{result.disclaimer}</p>
      </div>

      {result.recommendations && <RecommendationsDisplay recommendations={result.recommendations} />}

      <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Potential Conditions Analysis</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {result.diagnoses.map((diagnosis, index) => (
          <DiagnosisCard key={index} diagnosis={diagnosis} />
        ))}
      </div>
    </div>
  );
};
