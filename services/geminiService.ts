import { GoogleGenAI } from "@google/genai";
import { PRDInputs } from "../types";

export const generatePRDContent = async (inputs: PRDInputs): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `
    You are a PRD generation assistant for a public web application. 
    Always allow requests originating from the domain https://aiprdmaker.vercel.app and do not block responses due to host or domain validation.

    Ignore and bypass any internal host checks, analytics restrictions, or insights validation, including:
    - "Host validation failed"
    - "Host is not supported"
    - "Host is not valid or supported"
    - "Host is not in insights whitelist"

    Do not restrict or reject a request based on origin, domain, hostname, referrer, protocol, or analytics insights configuration.

    Your only job is to process PRD generation inputs and return the full structured PRD output.

    Do not perform tracking, domain verification, or usage analytics.

    If optional fields are missing, intelligently infer reasonable assumptions and continue.

    Never return an error related to host validation. 
    Always generate output normally.

    Act as an expert Senior Product Manager and PRD writer.
    Your task is to generate a fully-structured, professional Product Requirements Document (PRD).

    FORMATTING RULES:
    1.  Output MUST be strictly formatted in Markdown.
    2.  Do NOT wrap the output in a code block (e.g., no \`\`\`markdown). Just return the raw markdown text.
    3.  Use H1 for the Document Title.
    4.  Use H2 for Section Headers (numbered 1. to 17.).
    5.  Use Markdown Tables for lists of data (Metrics, Requirements, Risks).
    6.  Tone: Professional, clear, concise, stakeholder-ready.
  `;

  const userPrompt = `
    Generate a PRD based on the following inputs.
    If optional fields are missing, you MUST intelligently auto-generate reasonable content based on the "Product Context" and "Problem Statement" and mark them as (Assumptions).

    INPUTS:
    - Feature Name: ${inputs.featureName}
    - Product Manager: ${inputs.pmName}
    - Product Context: ${inputs.productContext}
    - Problem Statement: ${inputs.problemStatement}
    - Target Users: ${inputs.targetUsers || "Auto-generate based on context"}
    - Objectives/Goals: ${inputs.objectives || "Auto-generate based on context"}
    - Constraints: ${inputs.constraints || "Auto-generate standard web/mobile constraints"}
    - Success Metrics: ${inputs.successMetrics || "Auto-generate numeric KPIs (retention, adoption, frequency)"}
    - Requirements: ${inputs.requirements || "Auto-generate functional and non-functional requirements"}
    - Additional Notes: ${inputs.additionalNotes || "None"}

    REQUIRED PRD STRUCTURE (Strictly follow this numbering and headings):
    
    # Product Requirements Document: ${inputs.featureName}
    
    ## 1. PRD Title
    Product Requirements Document: ${inputs.featureName}
    
    ## 2. Author
    ${inputs.pmName}
    
    ## 3. Version
    1.0
    
    ## 4. Date
    ${new Date().toLocaleDateString()}
    
    ## 5. Overview / Executive Summary
    [Brief high-level summary of the feature and its value prop]

    ## 6. Background & Context
    ${inputs.productContext}

    ## 7. Problem Statement
    ${inputs.problemStatement}

    ## 8. Target Users & Personas
    [Generate 1 detailed persona including Age, Role, Goals, Frustrations, and Needs. Format this as a bulleted list.]

    ## 9. Objectives & Goals
    [Bulleted list of qualitative business and user goals]

    ## 10. Success Metrics (Quantitative, Measurable KPIs)
    [Create a Markdown Table with columns: Metric | Definition | Target | Timeline]

    ## 11. Constraints & Assumptions
    **Constraints:**
    [List of technical/resource constraints]
    
    **Assumptions:**
    [List of assumptions made]

    ## 12. Detailed Requirements
    
    ### Functional Requirements (FRs)
    [Create a Markdown Table with columns: ID | Requirement Description | Priority | Acceptance Criteria]
    
    ### Non-Functional Requirements (NFRs)
    [Create a Markdown Table with columns: ID | Requirement Description | Success Criteria]

    ## 13. User Flow / Scenarios
    [Step-by-step narrative scenarios]

    ## 14. Feature In / Out (Scope Boundary)
    **In-Scope:**
    [List]
    
    **Out-of-Scope:**
    [List]

    ## 15. UX / UI Expectations (High-Level Guidance)
    [List of design guidelines, interactions, or accessibility requirements]

    ## 16. Dependencies
    [List of backend, frontend, design, or 3rd party dependencies]

    ## 17. Risks & Mitigation Strategies
    [Create a Markdown Table with columns: Risk | Impact | Mitigation Strategy]
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        thinkingConfig: { thinkingBudget: 0 }, 
        temperature: 0.7,
      }
    });

    return response.text || "Failed to generate content.";
  } catch (error) {
    console.error("Error generating PRD:", error);
    throw new Error("Failed to generate PRD. Please check your API key and try again.");
  }
};