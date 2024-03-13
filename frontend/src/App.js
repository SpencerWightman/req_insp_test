import { useState, useEffect } from 'react'
import { socket } from './socket'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import requestService from './services/requests'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Main } from './components/Main'

const App = () => {
  const [pgRequests, setPgRequests] = useState([])
  const [homePage, setHomePage] = useState(null)
  const [bin, setBin] = useState(null)

  useEffect(() => {
    const currentPath = window.location.pathname
    const currentBinPath = currentPath.split("/")[1]
    if (currentBinPath && currentBinPath.length === 15) {
      fetchPgData(currentBinPath)
    }
  }, [])

  // should implement socket.disconnect() / reconnect
  useEffect(() => {
    socket.on('newRequest', (newRequest) => {
      let zz = {...pgRequests}
      if (zz.requestData) {
        zz.requestData.push(newRequest.requestData[0])
        setPgRequests(zz)
      }
    });
    return () => {
      socket.removeAllListeners()
    }
  }, [pgRequests]);

  const fetchPgData = async (currentBinPath) => {
    const pData = await requestService.fetchPgData(currentBinPath)
    setBin(currentBinPath)
    setPgRequests(pData)
  }

  const handleRequestClick = async (mongoId) => {
    const currentPath = window.location.pathname
    const currentBinPath = currentPath.split("/")[1]
    const mData = await requestService.fetchMongoData(currentBinPath, mongoId)
    setHomePage(mData[0])
  }

  const newBin = async () => {
    let binObj = await requestService.createBin()
    fetchPgData(binObj.path)
    setHomePage(null)
    return binObj.path
  }

  return (
    <>
      <BrowserRouter>
        <Header bin={bin} newBin={newBin} pRequests={pgRequests} handleRequestClick={handleRequestClick} />
        <Routes>
            <Route path="/:bin" element={
              <>
                <div id="container">
                  <Sidebar pRequests={pgRequests} handleRequestClick={handleRequestClick} />
                  <Main homePage={homePage} />
                </div>
              </>
            } />
            <Route path="/" element={
              <>
                <div id="container">
                  <Sidebar pRequests={pgRequests} handleRequestClick={handleRequestClick} />
                  <Main homePage={homePage} />
                </div>
              </>
            } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
