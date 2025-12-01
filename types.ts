export interface PRDInputs {
  featureName: string;
  pmName: string;
  productContext: string;
  problemStatement: string;
  targetUsers?: string;
  objectives?: string;
  constraints?: string;
  successMetrics?: string;
  requirements?: string;
  additionalNotes?: string;
}

export enum AppState {
  HOME = 'HOME',
  FORM = 'FORM',
  GENERATING = 'GENERATING',
  PREVIEW = 'PREVIEW',
}

// Declare html2pdf for TypeScript since we are loading it via CDN
declare global {
  interface Window {
    html2pdf: () => {
      from: (element: HTMLElement) => {
        save: () => void;
        set: (opt: any) => any;
      };
    };
  }
}