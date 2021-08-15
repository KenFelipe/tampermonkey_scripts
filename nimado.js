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
      video                   { ${fullsizecss} }
      .html5-video-container  { ${fullsizecss} }

      #contentContainer       { ${nondisplaycss} }
      #container.ytd-masthead { ${nondisplaycss} }

      #chat         { ${nonspacecss} }
      #primary      { ${nonspacecss} }
      #page-manager { ${nonspacecss} }
    `

    var mainstyle = document.createElement('style')
    mainstyle.appendChild(document.createTextNode(maincss))

    var mainhead = document.getElementsByTagName('head')[0]
    mainhead.appendChild(mainstyle);

    ///////////////////
    //   Chatframe   //
    ///////////////////
    var chatframe = document.getElementById('chatframe').contentWindow.document

    var chatcss = `
      yt-live-chat-header-renderer { ${nondisplaycss} }

      #container.yt-live-chat-ticker-renderer {
        padding-top: 8px !important;
      }
    `

    var chatstyle = chatframe.createElement('style')
    chatstyle.appendChild(chatframe.createTextNode(chatcss))

    var chathead = chatframe.getElementsByTagName('head')[0]
    chathead.appendChild(chatstyle);

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
