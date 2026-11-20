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

  if (ggc) {
    opts = {...opts, signal: AbortSignal.timeout(TIMEOUT) };
    console.log(`>>> ${ggc} - Timer set`);
  }

  try {
    return await origFetch(req, opts);
  } catch (error) {
    ggc && console.error(`>>> ${ggc} - ${error}`);
  }
}
