export const capitalizeStr = function (str) {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

export function filterData(data) {
  return data.map(i => {
    return (i.snippet = i.snippet
      .replace(/<span class="searchmatch">(.*?)<\/span>/g, '$1')
      .replace(/&quot;(.*?)&quot;/g, '$1')
      .replace('&quot;', '')
      .replace('&amp;', ''));
  });
}

export function generateId() {
  return Math.random().toString(16).slice(2);
}
