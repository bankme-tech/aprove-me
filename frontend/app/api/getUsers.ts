async function fetchData() {
  const response = fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return response;
}

export default async function getUsers() {
  const data = await fetchData();
  return data;
}
