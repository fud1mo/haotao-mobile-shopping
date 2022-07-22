// 封装节流函数,debounce 防抖动
export function debounce(func, delay) {
  let timer = null;
  return function (...args) {
    if (timer) { clearTimeout(timer) };
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  };
}

// 时间戳转换
export function formatDate(date, fmt) {
  //1、获取年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  //2、获取
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      // 如果fmt中为'm'，则直接用str替换，得到如'4'、'10'之类的结果
      // 如果fmt中为'mm'，则str左边补零后替换，得到如'04'、'10'之类的结果
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};