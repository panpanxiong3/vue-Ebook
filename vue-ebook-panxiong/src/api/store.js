import axios from 'axios';
import {setLocalForage} from "../utils/localForage";

export function home () {
  return axios ({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/home`,
  })
}

export function detail ( book ) {
  return axios ({
    method: 'get',
    url: `${process.env.VUE_APP_BOOK_URL}/book/detail`,
    params: {
      fileName: book.fileName
    }
  })
}


export function list () {
  return axios ({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/list`,
  })
}

export function shelf () {
  return axios ({
    method: 'get',
    url: `/book/shelf`,
  })
}

export function download ( book, onSuccess, onError, onProgress ) {
  if ( !onProgress) {
    onProgress = onError;
  }
  return axios.create ({
    baseURL: process.env.VUE_APP_EPUB_URL,
    method: 'get',
    responseType: 'blob',
    timeout: 180 * 1000,
    onDownloadProgress: progressEvent => {
      if (onProgress) onProgress (progressEvent)
    }
  }).get (`${book.categoryText}/${book.fileName}.epub`).then (res => {
    const blob = new Blob ([res.data]);
    setLocalForage (book.filename, blob, () => {
      if (onSuccess) onSuccess (book)
    }, err => {
      if (onError) onError (err)
    })
    if (onSuccess) onSuccess (res)
  }).catch (err => {
    if (onError) onError (err)
  })
}
