export function dateFormat(date: string, parse?: string) {

  const dtArray = parse ? date.split(parse) : date.split(' ')

  const dateArray = dtArray[0].split('-') //dtArray[0] manupulating date
  const result = dateArray.reverse().join('.')
  const time = dtArray[1].split(':').slice(0, 2).join(':')
  return result + ' ' + time
}

export function dateFormatNotTime(date: string, parse?: string) {

  const dtArray = parse ? date.split(parse) : date.split(' ')

  const dateArray = dtArray[0].split('-') //dtArray[0] manupulating date
  const result = dateArray.reverse().join('.')
  const time = dtArray[1].split(':').slice(0, 2).join(':')
  return result
}

export function inetNtoa(num) {
  const nbuffer = new ArrayBuffer(4);
  const ndv = new DataView(nbuffer);
  ndv.setUint32(0, num);

  const a = new Array();
  for (let i = 0; i < 4; i++) {
    a[i] = ndv.getUint8(i);
  }
  return a.join('.');
}
