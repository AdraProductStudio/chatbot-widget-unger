import React from 'react'
import { useSelector } from 'react-redux'

const Homepage = () => {
  const { token } = useSelector((state) => state.commonState)

  return (
    <>
      {token === "fe11543f71807a4b5d6302e118ac9c5ba7067cf15bd8da27bc2f2ce093318e14" ?
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