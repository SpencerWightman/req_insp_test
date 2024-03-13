import { connectToPg } from '../pg.js';
import app from '../app.js';
import express from 'express';

export const fetchRequestsTable = async (request, response) => {
  app.use(express.static('build'));
  const binPath = request.params.binpath
  console.log(binPath, ' FETCH REQUEST TABLE')

  const pg = connectToPg()
  await pg.connect()
  console.log('### Postgres CONNECTED FETCH REQUESTS TABLE');

  let binId;
  await pg.query('SELECT id FROM bin WHERE bin_path = $1', [binPath])
    .then(result => binId = result.rows[0].id)

  await pg.query('SELECT * FROM requests WHERE bin_id = $1', [binId])
    .then((result) => {
      pg.end()
      console.log(result.rows)
      response.send({ requestData: result.rows, path: binPath })
    })
}
