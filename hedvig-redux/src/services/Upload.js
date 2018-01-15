// See https://github.com/github/fetch/issues/89#issuecomment-256610849
export function upload(url, opts = {}, onProgress) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.open(opts.method || "get", url)
    for (var k in opts.headers || {}) xhr.setRequestHeader(k, opts.headers[k])
    // xhr.onload = result => result.target.status < 300 ? resolve(result) : reject(result)
    // Accept all upload statuses for now
    xhr.onload = resolve
    xhr.onerror = reject
    if (xhr.upload && onProgress) xhr.upload.onprogress = onProgress // event.loaded / event.total * 100 ; //event.lengthComputable
    xhr.send(opts.body)
  })
}
