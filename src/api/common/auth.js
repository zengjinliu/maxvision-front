/**
 * 是否有权限
 * @param key
 * @returns {boolean}
 * @constructor
 */
export function Auth (key) {
  var user = JSON.parse(sessionStorage.getItem("user"));
  let arr = user.perms;
  return arr.includes(key);
}

