import { Request } from '../models/request.js';
import { connectToPg } from '../pg.js';
import { generateKey } from '../utils/generateKey.js'

export const registerRequest = async (request, response, binPath, method) => {
  console.log('### MONGO CONNECTED -- ACCEPT REQUEST');
  console.log(binPath)
  const stringRequestHeader = JSON.stringify(request.headers);
  const stringRequestBody = JSON.stringify(request.body);
  const newKey = generateKey(15);
  // console.log(`#### Request Body: ${stringRequestBody}`)
  const req = new Request({
    key: newKey,
    header: stringRequestHeader,
    body: stringRequestBody,
  });

  const savedRequest = await req.save()
  console.log('### SAVED REQUEST TO MONGO', binPath)

  const pg = connectToPg()
  await pg.connect()
  console.log('### Postgres CONNECTED');

  let binId;
  await pg.query('SELECT id FROM bin WHERE bin_path = $1', [binPath])
    .then(result => {
      console.log(result.rows)
      binId = result.rows[0].id
    })

  console.log("binId", binId)
  // mongoId: used to get specific request from Mongo DB (because Mongo's id is garbage format)
  const mongoId = newKey;
  // mongoPath: used in unique, public request URL (can't be the same as mongoId b/c security ~~)
  const mongoPath = generateKey(15);
  const httpMethod = method;
  const httpPath = `/webhook/${binPath}/${mongoPath}`

  await pg.query('INSERT INTO requests (bin_id, mongo_id, mongo_path, http_method, http_path)' +
    'VALUES ($1, $2, $3, $4, $5)', [binId, mongoId, mongoPath, httpMethod, httpPath])

  let latestRequestTable = {};
  await pg.query('SELECT * FROM requests WHERE bin_id = $1 ORDER BY RECIEVED_AT DESC ' +
    'LIMIT 1', [binId])
    .then((result) => {
      pg.end()
      console.log(`$$$$$$$$ ${JSON.stringify(result.rows)}`)
      latestRequestTable['requestData'] = result.rows;
      latestRequestTable['path'] = binPath;
    })

  request.io.sockets.emit('newRequest', latestRequestTable);
  response.status(201).send('### SOMETHING FOR TERMINAL l.79###')
}
