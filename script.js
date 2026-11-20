// ==UserScript==
// @name        YT GGC Reconnect
// @namespace   yt-ggc-reconnect
// @version     0.0.1
//
// @match       https://youtube.com/*
// @match       https://*.youtube.com/*
// @grant       none
// @run-at      document-start
// @noframes
//
// @author      perfect-jelly
// ==/UserScript==


const TIMEOUT = 5000;
const origFetch = window.fetch;

window.fetch = async (req, opts) => {
  const url = req?.url ?? req;
  const matches = url.match(/:\/\/(.*googlevideo.com)/);
  const ggc = matches?.at(1);
  const controller = new AbortController();
  let response;

  if (ggc) {
    opts = {...opts, signal: controller.signal };
    setTimeout(() => {
      if (!response) {
        controller.abort();
        console.error(`>>> ${ggc} - Aborted after ${TIMEOUT} ms`);
      }
    }, TIMEOUT);
    console.log(`>>> ${ggc} - Timer set`);
  }

  response = await origFetch(req, opts);

  return response;
}
