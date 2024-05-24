import axios from 'axios'


export const api = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0Yjc1MzRlMi02NzUxLTRkNGUtYjIwNy03NWJlZDllYTQ2NTIiLCJlbWFpbCI6InRlc3RlQGdhaWwuY29tIiwiaWF0IjoxNzE2NTA4OTE4LCJleHAiOjE3MTY1MTI1MTh9.jlSmbkUF_DoRQ6bfNiYe1zTUnqiwMtDrOpvtqxTjSUA`
  }
});