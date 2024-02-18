import axios from 'axios';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MmY5NDFiMy1kM2ZmLTQ5N2YtYTViZC00MmFjN2JjZTczOTYiLCJpYXQiOjE3MDgyMDk0MTEsImV4cCI6MTcwODI2OTQxMX0.pQEDsqrAaa5MwBqXvkAHgbj3j_3EJPqheHietrvM8O8';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});
