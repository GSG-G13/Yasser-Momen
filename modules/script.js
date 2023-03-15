function xhrFunc(urllink, cb) {
  let xhr = new XMLHttpRequest();

  let url = `${urllink}`;
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let myObj = JSON.parse(xhr.responseText);
      cb(myObj);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}
