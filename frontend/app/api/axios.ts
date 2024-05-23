import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0Yjc1MzRlMi02NzUxLTRkNGUtYjIwNy03NWJlZDllYTQ2NTIiLCJlbWFpbCI6InRlc3RlQGdhaWwuY29tIiwiaWF0IjoxNzE2NDg5NTY3LCJleHAiOjE3MTY0OTMxNjd9.9mW_x5lO6EjjUGDMJikEtIqAY_DxPSKMuZEbhWcBIDk'
  }
});