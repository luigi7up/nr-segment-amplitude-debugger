// ==UserScript==
// @name         New Relic Segment/Amplitude debugger
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Luka Eterovic
// @match        https://staging-one.newrelic.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=newrelic.com
// @grant        none
// @run-at      document-idle
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

    let checkExist = setInterval(function() {
        console.log("waiting for window.analytics.track and window.analytics.page...")

        if(window.analytics.track !== undefined && window.analytics.page !== undefined){
            init();
            clearInterval(checkExist);
        }
    }, 200); // check every 100ms


    function init(){

        let _track = window.analytics.track;
        let _page = window.analytics.page;

        let elemDiv = document.createElement('div');
        elemDiv.style.cssText =`position:absolute;
                width:auto;
                height:auto%;
                opacity:10;
                z-index:100;
                background:#ff0066;
                bottom:1rem;
                right:1rem;
                padding:1rem;
                color:#fff;
                border-radius:4px;
                font: 12px "Courier New", Courier, "Lucida Sans Typewriter", serif;`;
        elemDiv.innerHTML = '<b>Segment/Amplitude debugging</b>';
        document.body.appendChild(elemDiv);

        window.analytics.track = function(event) {

            //The event name is UI_Nerdlet_nerdletView
            if(arguments[0]=="UI_Nerdlet_nerdletView"){

                elemDiv.innerHTML = '<b>UI_Nerdlet_nerdletView</b>';
                elemDiv.innerHTML += `
                <pre>
                {
                  <b>targetFullArtifactId:</b> ${arguments[1]['targetFullArtifactId']}
                  <b>targetArtifactId: </b>${arguments[1]['targetArtifactId']}
                  <b>paneFullArtifactId:</b> ${arguments[1]['paneFullArtifactId']}
                  <b>artifactId: </b>${arguments[1]['artifactId']}
                  <b>fullArtifactId: </b>${arguments[1]['fullArtifactId']}
                  <b>nr_product: </b>${arguments[1]['nr_product']}
                  <b>category: </b>${arguments[1]['category']}
                  <b>pageName: </b>${arguments[1]['pageName']}
                  <b>entityType: </b>${arguments[1]['entityType']} //For APM details view
                  <b>entityDomain: </b>${arguments[1]['entityDomain']} //For APM details view
                  <b>pageComponent: </b>${arguments[1]['pageComponent']}
                  <b>fullArtifactId: </b>${arguments[1]['fullArtifactId']}
                  <b>artifactType: </b>${arguments[1]['artifactType']}
                  <b>targetNerdpackName: </b>${arguments[1]['targetNerdpackName']}
                  <b>targetNerdpackId: </b>${arguments[1]['targetNerdpackId']}
                }
                </pre>`
            }else{
                elemDiv.innerHTML += `${arguments[0]}<br/>`
            }

            // call the original window.analytics.track()
            _track.apply( this, arguments );
        }


        window.analytics.page = function(event) {
            elemDiv.innerHTML = '<b>Page event was registered</b>';
            elemDiv.innerHTML += `${arguments[0]}`
            _page.apply( this, arguments );
        }


    }
    //////////
})();
