import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0Yjc1MzRlMi02NzUxLTRkNGUtYjIwNy03NWJlZDllYTQ2NTIiLCJlbWFpbCI6InRlc3RlQGdhaWwuY29tIiwiaWF0IjoxNzE2NDIyNDIwLCJleHAiOjE3MTY0MjYwMjB9.BgfDg2OK1SNafb4HIma4JQ2n36Xt4e9I2W5DBOVl_lo'
  }
});