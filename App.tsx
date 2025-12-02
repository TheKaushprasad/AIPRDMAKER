import React, { useState } from 'react';
import Hero from './components/Hero';
import PRDForm from './components/PRDForm';
import PRDPreview from './components/PRDPreview';
import { AppState, PRDInputs } from './types';
import { generatePRDContent } from './services/geminiService';

const SAMPLE_DATA: PRDInputs = {
  featureName: 'One-Click Recipe Shopping',
  pmName: 'Sarah Jenkins',
  productContext: 'A mobile meal planning app with 500k MAU. Users currently save recipes but have to manually write shopping lists.',
  problemStatement: 'Users find it tedious to manually transcribe ingredients from recipes to their preferred grocery delivery apps, leading to drop-off in cooking frequency.',
  targetUsers: 'Busy parents, working professionals who cook 3-4 times a week.',
  objectives: 'Increase user retention by 15%. Generate affiliate revenue from grocery partners.',
  constraints: 'Must integrate with Instacart and Amazon Fresh APIs. Mobile only for MVP.',
  successMetrics: '', // Intentionally left blank to test auto-generation
  requirements: '',
  additionalNotes: ''
};

const App: React.FC = () => {
  const [view, setView] = useState<AppState>(AppState.HOME);
  const [inputs, setInputs] = useState<PRDInputs | undefined>(undefined);
  const [prdContent, setPrdContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = () => {
    setInputs(undefined);
    setView(AppState.FORM);
  };

  const handleSample = () => {
    setInputs(SAMPLE_DATA);
    setView(AppState.FORM);
  };

  const handleFormSubmit = async (data: PRDInputs) => {
    setInputs(data);
    setIsLoading(true);
    try {
      const content = await generatePRDContent(data);
      setPrdContent(content);
      setView(AppState.PREVIEW);
    } catch (error: any) {
      console.error("Full error details:", error);
      // Show the actual error message to the user
      const errorMessage = error?.message || "An unknown error occurred.";
      alert(`Failed to generate PRD:\n${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditInputs = () => {
    setView(AppState.FORM);
  };

  const handleCreateNew = () => {
    setInputs(undefined);
    setPrdContent('');
    setView(AppState.HOME);
  };

  return (
    <div className="min-h-screen">
      {view === AppState.HOME && (
        <Hero onStart={handleStart} onSample={handleSample} />
      )}
      
      {(view === AppState.FORM || view === AppState.GENERATING) && (
        <PRDForm 
          onSubmit={handleFormSubmit} 
          initialData={inputs}
          onBack={() => setView(AppState.HOME)}
          isLoading={isLoading}
        />
      )}

      {view === AppState.PREVIEW && (
        <PRDPreview 
          content={prdContent}
          onEdit={handleEditInputs}
          onNew={handleCreateNew}
        />
      )}
    </div>
  );
};

export default App;