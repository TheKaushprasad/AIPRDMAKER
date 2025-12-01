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
    3.  Use H1 for the Title.
    4.  Use H2 for Section Headers.
    5.  Use bolding for key terms.
    6.  Use bullet points for lists.
    7.  Tone: Professional, clear, concise, stakeholder-ready.
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

    REQUIRED PRD STRUCTURE:
    
    # Product Requirements Document: ${inputs.featureName}
    
    **Author:** ${inputs.pmName}
    **Version:** 1.0
    **Date:** ${new Date().toLocaleDateString()}
    
    ## 1. Overview / Executive Summary
    [Brief high-level summary of the feature and its value prop]

    ## 2. Background & Context
    [Elaborate on the context provided]

    ## 3. Target Users / Personas
    [Generate 1 detailed persona including Age, Role, Goals, Frustrations, and Needs. Format this clearly.]

    ## 4. Objectives & Goals
    [Bulleted list of qualitative goals]

    ## 5. Success Metrics (KPIs)
    [Bulleted list of measurable, numeric KPIs. E.g., Retention %, Adoption %, etc.]

    ## 6. Requirements
    ### Functional Requirements
    [Numbered list of features, e.g., FR-001: User shall...]
    
    ### Non-Functional Requirements
    [Numbered list of technical/quality constraints, e.g., NFR-001: Latency shall be < 200ms...]

    ## 7. Constraints & Assumptions
    [Technical, time, or resource constraints]

    ## 8. Out of Scope
    [What is explicitly not included in this version]

    ## 9. Additional Notes
    [Any other relevant details]
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        thinkingConfig: { thinkingBudget: 0 }, // Disable thinking for faster generation on standard text tasks
        temperature: 0.7, // Slight creativity for auto-generating missing fields
      }
    });

    return response.text || "Failed to generate content.";
  } catch (error) {
    console.error("Error generating PRD:", error);
    throw new Error("Failed to generate PRD. Please check your API key and try again.");
  }
};