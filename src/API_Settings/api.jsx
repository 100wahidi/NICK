import { getToken, removeToken } from "../components/session/Token";

const API_BASE_URL = "https://ragapi-groq-5f55.up.railway.app";

/**
 * Universal Core API Client
 * - Injects 'Authorization: Bearer <token>' automatically if a token exists.
 * - Handles JSON, Form URL-Encoded, and Multipart (File) payloads.
 * - Supports Binary Blobs for direct PDF downloads.
 */
export async function apiRequest({
  endpoint,
  method = "GET",
  data = null,
  contentType = "application/json",
  isBlob = false,
  requiresAuth = true,
}) {
  try {
    const headers = {};

    // 1. Automatically attach JWT Bearer Token for protected endpoints
    if (requiresAuth) {
      const token = getToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const config = {
      method,
      headers,
    };

    // 2. Format Body based on Content-Type
    if (data) {
      if (contentType === "multipart/form-data") {
        // Browser sets boundary automatically for FormData
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (value instanceof File || value instanceof Blob) {
            formData.append(key, value);
          } else if (Array.isArray(value)) {
            value.forEach((item) => formData.append(key, item));
          } else if (typeof value === "object" && value !== null) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        });
        config.body = formData;
      } else if (contentType === "application/x-www-form-urlencoded") {
        headers["Content-Type"] = contentType;
        const params = new URLSearchParams();
        Object.entries(data).forEach(([key, value]) => {
          params.append(key, value);
        });
        config.body = params.toString();
      } else if (contentType === "text/plain") {
        headers["Content-Type"] = "text/plain";
        config.body = typeof data === "string" ? data : String(data);
      } else {
        // Default application/json
        headers["Content-Type"] = "application/json";
        config.body = JSON.stringify(data);
      }
    }

    // 3. Dispatch Request
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    // 4. Handle 401 Unauthorized (Expired / Invalid Token)
    if (response.status === 401 && requiresAuth) {
      removeToken();
      window.location.href = "/login";
      throw new Error("Session expired. Please log in again.");
    }

    // 5. Stream Raw Binary Blob (PDF rendering/download)
    if (isBlob) {
      if (!response.ok) {
        throw new Error(`Failed to download binary file (Status: ${response.status}) ❌`);
      }
      return await response.blob();
    }

    // 6. Parse JSON Response
    let result;
    try {
      result = await response.json();
    } catch {
      result = null;
    }

    if (!response.ok) {
      const errorMsg =
        typeof result?.detail === "string"
          ? result.detail
          : result?.detail?.[0]?.msg || `HTTP Error ${response.status} ❌`;
      throw new Error(errorMsg);
    }

    return result;
  } catch (error) {
    console.error(`API Error [${method} ${endpoint}]:`, error);
    throw error;
  }
}

// ==========================================
// 1. AUTHENTICATION MODULE
// ==========================================
export const authAPI = {
  // Public: Login via OAuth2 form data
  login: (credentials) =>
    apiRequest({
      endpoint: "/auth/login",
      method: "POST",
      data: credentials,
      contentType: "application/x-www-form-urlencoded",
      requiresAuth: false,
    }),

  // Public: User registration
  signIn: (userData) =>
    apiRequest({
      endpoint: "/auth/sign_in",
      method: "POST",
      data: userData,
      contentType: "application/json",
      requiresAuth: false,
    }),

  // Protected: Fetch current user profile
  getMe: () =>
    apiRequest({
      endpoint: "/auth/me",
      method: "GET",
      requiresAuth: true,
    }),
};

// ==========================================
// 2. EXTRACTION & INGESTION MODULE
// ==========================================
export const extractionAPI = {
  // Protected: Upload PDF and extract experiences/projects with LLM
  processCv: (file, autoPersist = true) =>
    apiRequest({
      endpoint: `/extraction/process-cv?auto_persist=${autoPersist}`,
      method: "POST",
      data: { file },
      contentType: "multipart/form-data",
      requiresAuth: true,
    }),

  // Protected: Insert manual records from structured form
  insertManual: (payload) =>
    apiRequest({
      endpoint: "/extraction/insert-manual",
      method: "POST",
      data: payload,
      contentType: "application/json",
      requiresAuth: true,
    }),
};

// ==========================================
// 3. UPLOADING MODULE
// ==========================================
export const uploadAPI = {
  // Protected: Register a new project record
  addProject: (payload) =>
    apiRequest({
      endpoint: "/uploading/add_project",
      method: "POST",
      data: payload,
      contentType: "application/json",
      requiresAuth: true,
    }),

  // Protected: Register a new experience record
  addExperience: (payload) =>
    apiRequest({
      endpoint: "/uploading/add_experience",
      method: "POST",
      data: payload,
      contentType: "application/json",
      requiresAuth: true,
    }),
};

// ==========================================
// 4. RETRIEVAL (SEMANTIC SEARCH) MODULE
// ==========================================
export const retrievalAPI = {
  // Protected: Extract job offer and retrieve relevant context
  extractOffer: (jobText) =>
    apiRequest({
      endpoint: "/extraction/offer_extraction",
      method: "POST",
      data: { "offer": jobText },
      contentType: "application/json",
      requiresAuth: true,
    }),

  // Protected: Retrieve matching experiences metadata
  retrieveExperiences: (payload) =>
    apiRequest({
      endpoint: "/rag/retrieval/experiences",
      method: "POST",
      data: payload,
      contentType: "application/json",
      requiresAuth: true,
    }),

  // Protected: Retrieve matching projects metadata
  retrieveProjects: (payload) =>
    apiRequest({
      endpoint: "/rag/retrieval/projects",
      method: "POST",
      data: payload,
      contentType: "application/json",
      requiresAuth: true,
    }),
};

// ==========================================
// 5. GENERATION & LATEX MODULE
// ==========================================
export const generationAPI = {
  // Protected: Generate tailored CV content from the selected matched data
  getCv: (payload) =>
    apiRequest({
      endpoint: "/generation/get_cv",
      method: "POST",
      data: payload,
      contentType: "application/json",
      isBlob: true,
      requiresAuth: true,
    }),

  // Protected: Populate LaTeX template
  renderLatexSource: (payload) =>
    apiRequest({
      endpoint: "/generation/render-latex",
      method: "POST",
      data: payload,
      contentType: "application/json",
      requiresAuth: true,
    }),

  // Protected: Compile raw LaTeX to PDF and return binary blob
  downloadCompiledPdf: (latexSource) =>
    apiRequest({
      endpoint: "/generation/compile-pdf",
      method: "POST",
      data: { latex: latexSource },
      contentType: "application/json",
      isBlob: true,
      requiresAuth: true,
    }),
};