function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function addCookie(name, value, expiration) {
    document.cookie = name + '=' + value + '; Path=/;' + ' Expires=' + expiration + ';';
}
function deleteCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export default { getCookie, addCookie, deleteCookie };
