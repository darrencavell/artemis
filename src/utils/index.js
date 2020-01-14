export function colorByPokemonType(type) {
  switch(type) {
    case 'normal':
      return '#c5c5c5'
    case 'fighting':
      return '#5c210a'
    case 'flying':
      return '#b0c0e2'
    case 'poison':
      return '#2c1230'
    case 'ground':
      return '#ac7809'
    case 'rock':
      return '#573d05'
    case 'bug':
      return '#123018'
    case 'ghost':
      return '#79756e'
    case 'steel':
      return '#91908e'
    case 'fire':
      return '#e77330'
    case 'water':
      return '#5481e2'
    case 'grass':
      return '#1caf54'
    case 'electric':
      return '#f5c463'
    case 'psychic':
      return '#f386f7'
    case 'ice':
      return '#b8ddf7'
    case 'dragon':
      return '#253358'
    case 'dark':
      return '#131418'
    case 'fairy':
      return '#b484c0'
    case 'unknown':
      return '#000000'
    case 'shadow':
      return '#222222'
  }
}

export function colorTransform(col, amt) {
  var usePound = false;
  if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
  }

  var num = parseInt(col,16);
  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if  (r < 0) r = 0;

  var b = ((num >> 8) & 0x00FF) + amt;
  if (b > 255) b = 255;
  else if  (b < 0) b = 0;

  var g = (num & 0x0000FF) + amt;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}

export function createObserver(inViewCallback = noop, newOptions = {}) {  
  const defaultOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
  }
  
  return new IntersectionObserver(inViewCallback, Object.assign(defaultOptions, newOptions))
}