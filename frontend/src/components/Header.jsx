import { Button } from './Button'
import { useNavigate } from 'react-router-dom'
import { useRef } from "react";

export const Header = ({ bin, newBin }) => {
  const navigate = useNavigate();
  const messageRef = useRef();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        messageRef.current.className = ""
        setTimeout(() => {
          messageRef.current.className = "invisible"
        }, 2500)
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
      });
  };

  return (
    <div id="header-container">
      <div id="header">
        <a href="/">
          <img
            id="logo"
            src="assets/request_inspect_logo.png"
            alt="request inspect logo" />
        </a>
        <Button handleClick={async () => {
          const binPath = await newBin()
          navigate(`${binPath}`)
        }} text='New Inspector' />
      </div>
        <p ref={messageRef} id="message" className="fading-element invisible">copied!</p>
        {bin ? (
          <p 
          onClick={() => copyToClipboard(`www.http://localhost:3001/webhook/${bin}`)}
            id="url-container">
              {"Webhook URL: http://localhost:3001/webhook/" + bin}
          </p>
        ) : (
          <p id="filler">Webhook URL will appear here upon bin creation</p>  
        )}
    </div>
  )
}
