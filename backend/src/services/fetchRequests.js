import { Request } from '../models/request.js';

export const fetchRequests = async (request, response) => {
  const mongoId = request.params.mongo_id
  // supposed to search by key?
  let singleRequest = await Request.find({key:`${mongoId}`}).exec();
  console.log('### Mongo QUERIED 123');
  console.log(mongoId)
  console.log(singleRequest)
  response.send(singleRequest)
}
