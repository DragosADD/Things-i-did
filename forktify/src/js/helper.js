import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// export const getJSON = async function (url) {
//   //geting info from api
//   try {
//     const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message}  and (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: `POST`,
          headers: {
            'Content-Type': 'application/json',
          }, //snipets of text, bascially info about the request
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}  and (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
// export const sendJSON = async function (url, uploadData) {
//   //sending info to api
//   try {
//     const fetchPro = fetch(url, {
//       method: `POST`,
//       headers: {
//         'Content-Type': 'application/json',
//       }, //snipets of text, bascially info about the request
//       body: JSON.stringify(uploadData),
//     });
//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message}  and (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
