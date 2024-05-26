export const getToken = () => {
  return localStorage.getItem("token");
}

export const removeToken = () => {
  localStorage.removeItem("token");
}

export const validateToken = async (token: string) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${BASE_URL}/payable`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}