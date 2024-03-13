import pkg from 'pg';
const { Client } = pkg;

export const connectToPg = () => {
  const client = new Client({
    host: 'localhost',
    database: 'requestInspect',
    port: 5432,
  })

  return client
}
