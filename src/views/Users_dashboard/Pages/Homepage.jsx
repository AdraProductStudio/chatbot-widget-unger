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
                token === "de5661de447c95026d3733498c25a232591195485c2d5a2df78efe9e86292351" ?
                  <iframe
                    src="https://adraproductstudio.github.io/chatbot-widget-mr_h/"
                    sandbox="allow-scripts allow-same-origin"
                    className='chatbot-iframe'
                  ></iframe>
                  :
                  token === "e0d5f95de4567129a7bf7436d6011efc9714e6cd8610595ff5e0f40f59195a36" ?
                    <iframe
                      src="https://adraproductstudio.github.io/chatbot-widget-ronthesewerrat/"
                      sandbox="allow-scripts allow-same-origin"
                      className='chatbot-iframe'
                    ></iframe>
                    :
                    token === "b0bf241a612d80d014603d8dec42b5836ce5ba3c4c246d498ba16830c814e4da" ?
                      <iframe
                        src="https://adraproductstudio.github.io/chatbot-widget-eastern_national/"
                        sandbox="allow-scripts allow-same-origin"
                        className='chatbot-iframe'
                      ></iframe>
                      :
                      token === "e5ff0c2d1e17b16a8bd0da20d8e0ee594392cd22eb6ab5ee4ccfdd895d4aa6e6" ?
                        <iframe
                          src="https://adraproductstudio.github.io/chatbot-widget-onboard-march4/"
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