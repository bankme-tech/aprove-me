
export const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement >, setData: any ) => {
  const { name, value } = event.target;
  setData((prevUserData: any) => ({
    ...prevUserData,
    [name]: value,
  }));
};