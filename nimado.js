// ==UserScript==
// @name         Nimado
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  tweak youtube to watch multiple streamings
// @author       Suzuki Minato
// @include      https://www.youtube.com/watch*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        noe
// ==/UserScript==

(function () {
  'use strict';

  // Your code here...
  const mainHead = document.getElementsByTagName('head')[0];

  const css = {
    noDisplay : 'display: none !important;',
    noMargin  : 'margin : 0    !important;',
    noPadding : 'padding: 0    !important;',
    fullWidth : 'width  : 100% !important;',
    fullHeight: 'height : 100% !important;',
  };
  css.noSpace = css.noMargin + css.noPadding;
  css.fullSize = css.fullWidth + css.fullHeight;

  const init = () => {
    const nimadoCss = `
      .nimado-button {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        width: 22px;
        height: 30px;
        margin-top: 6px;
        padding: 6px;

        font-size: 2.0rem;
        border: 1px solid #eee;
        border-radius: 50%;

        color: #eee;
        background: transparent;
        opacity: 1.0;

        transition: all .7s ease;
      }

      .nimado-button:hover, 
      .nimado-button.nimado-active {
        color: #222;
        background: #eee;
      }

      .nimado-disabled {
        opacity: 0 !important;
        pointer-events: none;
      }

      #nimado-wrapper {
        display: flex;
        flex-direction: column-reverse;

        position: fixed;
        bottom: 10px;
        right: 0px;
        z-index: 10000;
      }

      #nimado-wrapper.nimado-active {
        right: 10px;
      }
    `;

    const style = document.createElement('style');
    style.appendChild(document.createTextNode(nimadoCss));

    mainHead.appendChild(style);
  };

  const formWrapper = () => {
    const wrapper = document.createElement('div');
    wrapper.id = 'nimado-wrapper'

    document.querySelectorAll('ytd-app')[0].appendChild(wrapper);
  }

  // Button to Adjust Window
  const formAdjustButton = () => {
    const label = '窓';

    const button = document.createElement('a');
    button.innerText = label;
    button.classList.add('nimado-button');

    const adjustMainFrame = () => {
      const mainFrameCss = `
        body {
          position: fixed !important;
          top     : 0px   !important;
          bottom  : 0px   !important;
          left    : 0px   !important;
          right   : 0px   !important;
        }

        ::-webkit-scrollbar {
          display : none  !important;
        }

        video                   { ${css.fullSize} }
        .html5-video-container  { ${css.fullSize} }

        #contentContainer       { ${css.noDisplay} }
        #container.ytd-masthead { ${css.noDisplay} }

        #primary      { ${css.noSpace} }
        #page-manager { ${css.noSpace} }
        #chat         { ${css.noSpace} }

        ytd-live-chat-frame {
          position  : fixed !important;
          bottom    : -1px  !important;
          right     : -1px  !important;
          left      : -1px  !important;
          z-index   : 10000 !important;
          min-height: auto  !important;
        }

        #show-hide-button { ${css.noDisplay} }
      `;

      const style = document.createElement('style');
      style.appendChild(document.createTextNode(mainFrameCss));

      mainHead.appendChild(style);
    };

    const adjustChatFrame = () => {
      if (!document.getElementById('chatframe')) {
        alert('no chatframe.');
        return;
      }
      const chatFrame = document.getElementById('chatframe').contentWindow.document;

      const chatFrameCss = `
        yt-live-chat-app {
          min-height: auto !important;
        }

        yt-live-chat-header-renderer { 
          ${css.noDisplay} 
        }

        #container.yt-live-chat-ticker-renderer {
          padding-top: 8px !important;
        }
        
        yt-live-chat-message-input-renderer {
          padding-top: 12px !important;
          padding-bottom: 8px !important;
        }

        #buttons.yt-live-chat-message-input-renderer {
          ${css.noDisplay}
        }

        #item-scroller::-webkit-scrollbar {
          display: none !important;
        }

        #item-scroller {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `;

      const chatStyle = chatFrame.createElement('style');
      chatStyle.appendChild(chatFrame.createTextNode(chatFrameCss));

      const chatHead = chatFrame.getElementsByTagName('head')[0];
      chatHead.appendChild(chatStyle);;
    };

    const tweakChatFrameSize = () => {
      const videoFrame = document.querySelector('#player.ytd-watch-flexy');
      const videoFrameHeight = videoFrame.offsetHeight;

      const desiredChatWindowSize = window.innerHeight - videoFrameHeight;

      const chatWindow = document.getElementsByTagName('ytd-live-chat-frame')[0];
      chatWindow.style = `height: ${desiredChatWindowSize + 2}px;`;
    };

    const enableOtherFeature = () => {
      document.getElementById('toggle-supper-chat-log').classList.remove('nimado-disabled');
    };

    button.addEventListener('click', () => {
      adjustChatFrame();
      adjustMainFrame();
      tweakChatFrameSize();
      enableOtherFeature();
      document.getElementById('nimado-wrapper').classList.add('nimado-active')
    });

    document.getElementById('nimado-wrapper').appendChild(button)
  };


  // Toggle SuperChat History
  const toggleSuperChatHistory = () => {
    const label = 'S';

    const toggle = document.createElement('a');
    toggle.innerText = label;
    toggle.id = 'toggle-supper-chat-log'

    toggle.classList.add('nimado-button');
    toggle.classList.add('nimado-toggle');
    toggle.classList.add('nimado-active');
    toggle.classList.add('nimado-disabled');

    toggle.addEventListener('click', () => {
      if (!document.getElementById('chatframe')) {
        alert('no chatframe.');
        return;
      }

      const chatFrame = document.getElementById('chatframe').contentWindow.document;;
      const superChatLog = chatFrame.getElementById('ticker');

      if(toggle.classList.contains('nimado-active')) {
        toggle.classList.remove('nimado-active');
        superChatLog.style = `${css.noDisplay}`;
      } else {
        toggle.classList.add('nimado-active');
        superChatLog.style = '';
      }
    });

    document.getElementById('nimado-wrapper').appendChild(toggle)
  }


  // Toggle Send Chat



  //
  //
  init();
  formWrapper();
  formAdjustButton();
  toggleSuperChatHistory();
  //
  //

  // log
  console.log('Nimado script executed...');
})();
