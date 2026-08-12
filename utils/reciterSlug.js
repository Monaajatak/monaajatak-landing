const AR = {
  ' ': '-', 'ال': 'al', 'ش': 'sh', 'خ': 'kh', 'غ': 'gh', 'ذ': 'dh', 'ث': 'th',
  'ا': 'a', 'ب': 'b', 'ت': 't', 'ج': 'j', 'ح': 'h', 'د': 'd', 'ر': 'r',
  'ز': 'z', 'س': 's', 'ص': 's', 'ض': 'd', 'ط': 't', 'ظ': 'z', 'ع': '',
  'ف': 'f', 'ق': 'q', 'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n', 'ه': 'h',
  'و': 'w', 'ي': 'y', 'ى': 'a', 'ة': 'a', 'آ': 'a', 'أ': 'a', 'إ': 'a', 'ئ': 'i', 'ؤ': 'u', 'ء': '',
  '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
}

const ALIASES = {
  menshawy: 112, menshawi: 112, minshawi: 112, alminshawi: 112, 'al-minshawi': 112, elmenshawi: 112,
  abdulbasit: 51, 'abdul-basit': 51, abdulbasitabdulsamad: 51, basit: 51, 'abdul-basit-abdus-samad': 51,
  elhosary: 118, husary: 118, alhusary: 118, 'al-husary': 118, hosary: 118, husari: 118,
  alsudais: 54, sudais: 54, saud: 54, 'abdul-rahman-al-sudais': 54, shuraim: 218, shoraimy: 218, alsherayem: 218,
  alafasy: 123, afasy: 123, afasi: 123, mishary: 123, 'mishary-rashid-al-afasy': 123,
  alajmi: 5, ajmi: 5, 'ahmed-al-ajmi': 5, ajem: 5,
  'islam-sobhi': 253, islamsabhi: 253, sobhi: 253,
  maher: 102, almuaiqly: 102, muaiqly: 102, muayqly: 102, 'maher-al-muaiqly': 102, maheralmuaiqly: 102,
  ghamdi: 226, alghamdi: 226, 's-aad-al-ghamdi': 226,
  dosari: 178, aldosari: 178, 'yasser-al-dosari': 178,
  'mustafa-ismail': 125, mustafaismail: 125, 'mostafa-ismail': 125,
  'mohamed-ayyoub': 109, ayyoub: 109, ayub: 109, 'mohammed-ayub': 109,
  qatami: 86, alqatami: 86, 'nasser-al-qatami': 86,
  'khaled-al-jalil': 20, jaleel: 20, 'khalid-al-jalil': 20,
  shatree: 4, shatiri: 4, alshatri: 4, 'abu-bakr-al-shatri': 4,
  akram: 2, 'akram-al-alaqmi': 2, alaqmi: 2,
  'abdul-muhsin-al-qasim': 55, 'al-qasim': 55,
}

const normalize = (s) =>
  String(s || '')
    .toLowerCase()
    .replace(/[^\w-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

export const slugify = (name) => {
  let out = ''
  const src = String(name || '').trim()
  let i = 0
  while (i < src.length) {
    let m = null
    if (src[i] === 'ا' && src[i + 1] === 'ل') m = 'ال'
    if (m) { out += AR[m]; i += 2; continue }
    const ch = src[i]
    out += AR[ch] || ''
    i++
  }
  return normalize(out)
}

export const reciterSlug = (r) => slugify(r.name)

export const resolveReciter = (reciters, raw) => {
  if (!raw) return null
  const id = parseInt(raw, 10)
  if (!isNaN(id)) return reciters.find((r) => r.id === id) || null
  const alias = ALIASES[normalize(raw)]
  if (alias != null) return reciters.find((r) => r.id === alias) || null
  const slug = normalize(raw)
  return reciters.find((r) => slugify(r.name) === slug) || null
}
