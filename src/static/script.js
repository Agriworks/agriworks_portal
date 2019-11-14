function getCookie(name) {
    console.log("Getting cookie");
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function addCookie(name, value, expiration) {
    console.log("Adding cookie");
    document.cookie = name + '=' + value + '; Path=/;' + ' Expires=' + expiration + ';';
}
function deleteCookie(name) {
    console.log("Deleting cookie");
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export default { getCookie, addCookie, deleteCookie };
