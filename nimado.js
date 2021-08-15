// ==UserScript==
// @name         Nimado
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  tweak youtube to watch multiple streamings
// @author       Suzuki Minato
// @include      https://www.youtube.com/watch*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // Your code here...
  var toggleLabel = '窓'

  var ontoggle = function() {
    if (!document.getElementById('container')
      || !document.getElementById('chatframe')) {
      alert('Wait until load content...')
      return
    }

    var nondisplaycss = 'display: none !important;'
    var nonmargincss  = 'margin : 0    !important;'
    var nonpaddingcss = 'padding: 0    !important;'
    var wfullcss      = 'width  : 100% !important;' 
    var hfullcss      = 'height : 100% !important;'

    var nonspacecss   = nonmargincss + nonpaddingcss
    var fullsizecss   = wfullcss + hfullcss

    ///////////////////
    //   Mainframe   //
    ///////////////////
    var maincss = `
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

      video                   { ${fullsizecss} }
      .html5-video-container  { ${fullsizecss} }

      #contentContainer       { ${nondisplaycss} }
      #container.ytd-masthead { ${nondisplaycss} }

      #primary      { ${nonspacecss} }
      #page-manager { ${nonspacecss} }
      #chat         { ${nonspacecss} }

      ytd-live-chat-frame {
        position  : fixed !important;
        bottom    : -1px  !important;
        right     : -1px  !important;
        left      : -1px  !important;
        z-index   : 10000 !important;
        min-height: auto  !important;
      }

      #show-hide-button { ${nondisplaycss} }
    `

    var mainstyle = document.createElement('style')
    mainstyle.appendChild(document.createTextNode(maincss))

    var mainhead = document.getElementsByTagName('head')[0]
    mainhead.appendChild(mainstyle);

    var videoframe = document.querySelector('#player.ytd-watch-flexy')
    var videoframeheight = videoframe.offsetHeight

    var desiredchatwindowsize = window.innerHeight - videoframeheight

    var chatwindow = document.getElementsByTagName('ytd-live-chat-frame')[0]
    chatwindow.style = `height: ${desiredchatwindowsize + 2}px;`

    ///////////////////
    //   Chatframe   //
    ///////////////////
    var chatframe = document.getElementById('chatframe').contentWindow.document

    var chatcss = `
      yt-live-chat-app {
        min-height: auto !important;
      }

      yt-live-chat-header-renderer { 
        ${nondisplaycss} 
      }

      #container.yt-live-chat-ticker-renderer {
        padding-top: 8px !important;
      }
      
      yt-live-chat-message-input-renderer {
        padding-top: 12px !important;
        padding-bottom: 8px !important;
      }

      #buttons.yt-live-chat-message-input-renderer {
        ${nondisplaycss}
      }

      #item-scroller::-webkit-scrollbar {
        display: none !important;
      }

      #item-scroller {
        -ms-overflow-style: none !important;
        scrollbar-width   : none !important;
      }
    `

    var chatstyle = chatframe.createElement('style')
    chatstyle.appendChild(chatframe.createTextNode(chatcss))

    var chathead = chatframe.getElementsByTagName('head')[0]
    chathead.appendChild(chatstyle);

    toggle.style.right = '10px'

    // hidden toggle after clicked
    // toggle.style = nondisplaycss
  }

  var toggle = document.createElement('a');
  toggle.innerText = toggleLabel
  toggle.style = `
    display: block;
    cursor: pointer;

    position: fixed;
    bottom: 10px;
    right: 0px;
    z-index: 10000;

    width: 20px:
    height: 20px;
    padding: 6px;

    font-size: 2.0rem;
    border: 1px solid #eee;
    border-radius: 50%;

    color: #eee;
    background: transparent;
    transition: all .7s ease;
  `

  toggle.addEventListener('mouseout', function() {
    this.style.color = '#eee'
    this.style.background = 'transparent'
  })

  toggle.addEventListener('mouseover', function() {
    this.style.color = '#222'
    this.style.background = '#eee'
  })

  toggle.addEventListener('click', ontoggle)
  document.querySelectorAll('ytd-app')[0].appendChild(toggle)

  // log
  console.log('Nimado script executed...')
})();
