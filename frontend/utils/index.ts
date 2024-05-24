import Cookies from "js-cookie";

export const fetchHeaders = () => {
  const token = Cookies.get("user_token");
  const header = {
    Authorization: `Bearer ${token}`,
  };
  return header;
};
