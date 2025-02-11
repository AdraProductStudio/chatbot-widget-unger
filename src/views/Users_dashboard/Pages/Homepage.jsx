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
          token === "0291e9d80f089e4e9c2e6625355341267de6705d6bb1fd8e32195cc6ba617267" ?
            <iframe
              src="https://adraproductstudio.github.io/chatbot-widget-tiffany/"
              sandbox="allow-scripts allow-same-origin"
              className='chatbot-iframe'
            ></iframe>
            :
            token === "21e57bcb84db66db631014e70adfe6c432022a9e4f4e5991c1b467a9133d4886" ?
              <iframe
                src="https://adraproductstudio.github.io/chatbot-widget-eastonroofing/"
                sandbox="allow-scripts allow-same-origin"
                className='chatbot-iframe'
              ></iframe>
              :
              token === "c81ef2ab35675840b62641dfcdd856bcabf635cdc7758c73616091b764397bbe" ?
                <iframe
                  src="https://adraproductstudio.github.io/chatbot-widget-mr/"
                  sandbox="allow-scripts allow-same-origin"
                  className='chatbot-iframe'
                ></iframe>
                :
                token === "c81ef2ab35675840b62641dfcdd856bcabf635cdc7758c73616091b764397bbe" ?
                  <iframe
                    src="https://adraproductstudio.github.io/chatbot-widget-mr_h/"
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