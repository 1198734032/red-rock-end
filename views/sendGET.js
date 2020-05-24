function ajax({ url, method = "get", data = null, success, err}) {
    let xhr = null
    try {
        xhr = new XMLHttpRequest()
    } catch (error) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }

    xhr.open(method, url, true)
    // xhr.setRequestHeader("content-type", "application/json")
    // xhr.send(JSON.stringify(data))
    if(data) xhr.send(data);
    else xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (success) {
                    success(xhr.responseText);
                }
            } else {
                err("ERROE")
            }
        }
    }
}

