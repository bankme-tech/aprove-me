import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MmY5NDFiMy1kM2ZmLTQ5N2YtYTViZC00MmFjN2JjZTczOTYiLCJpYXQiOjE3MDgxMjczNzQsImV4cCI6MTcwODEzMzM3NH0.RmyzAYPbrqDtUKq8pkPR-D5bzYtvH2-l7deqoyd9pXA',
  },
});
