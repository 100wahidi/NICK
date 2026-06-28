const apiUrl = import.meta.env.VITE_API_URL
// ✅ Generic request
export async function apiRequest(endpoint, method = "POST", data = null, token = null) {
  try {
    const config = {
      "method": method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (data) {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(`${apiUrl}${endpoint}`, config);

    let result;
    try {
      result = await response.json();
    } catch {
      result = null;
    }

    if (!response.ok) {
      throw new Error(result?.detail || "API Error ❌");
    }

    return result;

  } catch (error) {
    console.error("API ERROR:", error);
    throw error;
  }
}

// ✅ API abstraction (PRO)
export const userAPI = {
  signIn: (data) => apiRequest("/sign_in", "POST", data),

  login: (data) => apiRequest("/login", "POST", data), // ✅ NEW

  getUsers: () => apiRequest("/users"),
};
