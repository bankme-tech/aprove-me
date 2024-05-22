import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0Yjc1MzRlMi02NzUxLTRkNGUtYjIwNy03NWJlZDllYTQ2NTIiLCJlbWFpbCI6InRlc3RlQGdhaWwuY29tIiwiaWF0IjoxNzE2NDE4NzYzLCJleHAiOjE3MTY0MjIzNjN9.jXYfbooG3cEJX9t-GEtjdMXT0PvVv74KZx99eP6QsnY'
  }
});