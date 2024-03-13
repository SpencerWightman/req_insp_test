import axios from 'axios'

const createBin = async () => {
  const binResponse = await axios.post('http://localhost:3001/new_bin')
  const bin = binResponse.data
  console.log(bin)

  const requestResponse = await axios.post(`http://localhost:3001/${bin}`)
  const binner = requestResponse.data.path
  console.log(binner)

  await axios({
    method: 'post',
    url: `http://localhost:3001/webhook/${binner}`,
    data: {
      message: "this is a test request automatically sent when you create a bin"
    }
  });

  console.log(requestResponse.data)
  return requestResponse.data
}

const fetchMongoData = async (bin_path, mongo_id) => {
  const response = await axios.get(`http://localhost:3001/${bin_path}/${mongo_id}`)
  return response.data
}

const fetchPgData = async (binPath) => {
  const response = await axios.post(`http://localhost:3001/${binPath}`)
  return response.data
}

const exportable = { createBin, fetchMongoData, fetchPgData }

export default exportable
