const fetchWithAuthorization = async (url: string, options: RequestInit) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not found in localStorage");
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { ...options, headers });

  return response;
};

export const authenticatedFetch = async (url: string, options: RequestInit) => {
  try {
    const response = await fetchWithAuthorization(url, options);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response;
  } catch (error) {
    console.error("Error during fetch:", error);
    throw error;
  }
};
