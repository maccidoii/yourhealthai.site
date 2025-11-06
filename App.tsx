
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SymptomChecker } from './components/SymptomChecker';
import { DiseaseInfo } from './components/DiseaseInfo';
import { Disclaimer } from './components/Disclaimer';
import { AboutModal } from './components/AboutModal';
import { commonDiseases } from './constants';

const Adsense: React.FC = () => {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error:", e);
    }
  }, []);

  return (
    <div className="my-8 flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4219231992412496"
        data-ad-slot="4416776702"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

const App: React.FC = () => {
  const [isAboutModalOpen, setAboutModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Header onAboutClick={() => setAboutModalOpen(true)} />
      
      <main className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-slate-700 mb-2">
          AI Health Diagnosis Assistant
        </h1>
        <p className="text-center text-slate-500 mb-8 max-w-2xl mx-auto">
          Enter your symptoms, upload an image if necessary, and our AI will provide potential insights and information from trusted sources.
        </p>

        <Disclaimer />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SymptomChecker />
          </div>
          <div className="lg:col-span-1">
            <DiseaseInfo diseases={commonDiseases} />
          </div>
        </div>
      </main>

      <div className="container mx-auto px-4 md:px-8">
        <Adsense />
      </div>

      <footer className="text-center p-6 text-slate-500 border-t border-slate-200 mt-12">
        <a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer" className="inline-block my-4">
          <img src="https://www.gstatic.com/aem/v4/portal/logo/gemini_wordmark_logo_2x_dark_color_for_light_background.png" alt="Powered by Google Gemini" className="h-6" />
        </a>
        <p>&copy; {new Date().getFullYear()} yourhealthai.site. All rights reserved.</p>
        <p className="text-sm">This tool does not provide medical advice. Always consult a professional.</p>
        <button onClick={() => setAboutModalOpen(true)} className="text-blue-600 hover:underline mt-2">
          Support & Contact
        </button>
      </footer>
      
      <AboutModal isOpen={isAboutModalOpen} onClose={() => setAboutModalOpen(false)} />
    </div>
  );
};

export default App;
