import React from 'react'
import { useSelector } from 'react-redux'

const Homepage = () => {
  const { token } = useSelector((state) => state.commonState)

  return (
    <>
      {token !== "67b8d721e99b87f05d0e7653119ca3a1a0f657a708e05c6b0e6f33a937fd6a93" ?
        <iframe
          src="https://adraproductstudio.github.io/chatbot-widget-unger/"
          sandbox="allow-scripts allow-same-origin"
          className='chatbot-iframe'
        >
        </iframe>
        :
        token === "d74c985dedcbf9df6834b77e4ad3cb320bb78c241585f725bdb337a9e69ec7d3" ?
          <iframe
            src="https://adraproductstudio.github.io/chatbot-widget-toyota/"
            sandbox="allow-scripts allow-same-origin"
            className='chatbot-iframe'
          ></iframe>
          :

          <iframe
            src="https://adraproductstudio.github.io/chatbot-widget-rowley/"
            sandbox="allow-scripts allow-same-origin"
            className='chatbot-iframe'
          ></iframe>
      }
    </>


  )
}

export default Homepage