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

function userData(data) {
  console.log(data);
}

xhrFunc(
  "https://api.edamam.com/api/recipes/v2?type=public&q=pasta%20and%20chicken%20and%20tomato&app_id=aa0ecd38&app_key=%20faaaf58a1de94869c3e7173cc85c005d%09&imageSize=REGULAR&random=true",
  userData
);