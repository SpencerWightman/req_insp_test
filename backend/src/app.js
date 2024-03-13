import express from 'express';
import cors from 'cors';
import { registerRequest } from './services/registerRequest.js';
import { createBin } from './services/createBin.js';
import { fetchRequestsTable } from './services/fetchRequestsTable.js';
import { fetchRequests } from './services/fetchRequests.js';
import { io } from './server.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

app.use(function(req, _, next){
  req.io = io;
  next();
});

// connect to local mongo
import mongoose from 'mongoose';

mongoose.set('strictQuery', false)
console.log('### CONNECTING TO MONGO...')
mongoose.connect('mongodb://localhost:27017/requests')
  .then(() => {
    console.log('### CONNECTED TO MongoDB')
  })
  .catch((error) => {
    console.log('### ERROR CONNECTING TO MongoDB:', error.message)
  });

// webhook routes
app.get('/webhook/:bin_path', async (request, response) => {
  registerRequest(request, response, request.params.bin_path, "GET")
})

app.post('/webhook/:bin_path', async (request, response) => {
  registerRequest(request, response, request.params.bin_path, "POST")
})

app.put('/webhook/:bin_path', async (request, response) => {
  registerRequest(request, response, request.params.bin_path, "PUT")
})

app.delete('/webhook/:bin_path', async (request, response) => {
  registerRequest(request, response, request.params.bin_path, "DELETE")
})

app.patch('/webhook/:bin_path', async (request, response) => {
  registerRequest(request, response, request.params.bin_path, "PATCH")
})

// bin routes
app.post('/new_bin', async (request, response) => {
  createBin(request, response)
})

app.post('/:binpath', async (request, response) => {
  fetchRequestsTable(request, response)
})

app.get('/:bin_path/:mongo_id', async (request, response) => {
  fetchRequests(request, response)
})

export default app;
