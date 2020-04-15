function doLogin( ) {

    let username = document.getElementById('login').value;
    let pwd = document.getElementById('password').value;
    var data = "{\"username\":\""+username+"\", \"password\":\""+pwd+"\"}";

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            console.log(this.responseText);
            verifyLogin(this.responseText);
            //window.location.href = "checkCookieStatus.html";
        }
    });

    xhr.open("POST", "http://13.233.236.200:5000/login");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);

}


function verifyLogin(responseData) {
    let data = JSON.parse(responseData);
    if(data.login == true) {
        setCookie('login', 'true', 1);
        setCookie('user', data.user, 1);
        setCookie('user_name', data.user_name, 1);
        window.location.href = "checkLoginStatus.html";
    } else {
        if(data.error_msg){
            alert(data.error_msg);
        } else {
            alert('Wrong username/password');
        }
    }
}

function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function logout() {
    setCookie('login', 'false');
    setCookie('siteId', '0');
    window.location.href = 'login.html';
}

function logout1() {
    setCookie('login', 'false');
    setCookie('siteId', '0');
    window.location.href = '../login.html';
}

function checkLogin() {
    if(getCookie('login') !== 'true' ) {
        console.log('You are not logged in');
        window.location.href = 'login.html';
    } else {
        console.log('You are logged in');
        console.log(getCookie('user'));
        window.location.href = "../gispage.html";
    }
}

function checkLogin2() {
    if(getCookie('login') !== 'true' ) {
        console.log('You are not logged in');
        window.location.href = 'login.html';
    }
}
