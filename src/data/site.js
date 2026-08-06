/* ------------------------------------------------------------------ */
/* SINGLE SOURCE OF TRUTH for all copy + assets.                        */
/* Edit text here. Drop real photos into /public/images using the       */
/* filenames in `.src` below — they load automatically (grayscale       */
/* placeholders show until you do).                                     */
/* ------------------------------------------------------------------ */

// Lightweight inline placeholder (soft brand-tinted gradient) shown until a
// real photo exists. Local data-URI => instant, no external dependency.
const PH_PALETTES = [
  ['#e9eef7', '#c4d2e6'],
  ['#eef1f6', '#cdd8e8'],
  ['#e7edf5', '#c0cfe4'],
  ['#f0f2f6', '#d2dae6'],
]
const ph = (seed, w, h) => {
  let n = 0
  for (const ch of seed) n += ch.charCodeAt(0)
  const [a, b] = PH_PALETTES[n % PH_PALETTES.length]
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23g)'/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

// img = { src: real-file-you-will-provide, fb: placeholder-shown-meanwhile }
const img = (file, seed, w, h) => ({ src: `/images/${file}`, fb: ph(seed, w, h) })

export const brand = {
  name: '4M INTERNATIONAL',
  short: '4M',
  tagline: 'Splendor of Global Business.',
  logo: '/images/logo-mark.png',
}

export const nav = [
  { label: 'About Us', target: '#group' },
  { label: 'Our Concerns', target: '#companies' },
  { label: 'Our Mission', target: '#values' },
  { label: 'Founder', target: '#founder' },
]

export const hero = {
  // image: a cinematic, wide establishing shot. See public/images/README.md
  image: img('hero.jpg', '4m-hero-skyline', 2000, 1200),
  title: ['Built across', 'industries that matter.'],
  subtitle:
    'Five companies, built by one founder, across healthcare, agriculture, technology, hardware, and trade.',
}

export const stats = [
  { value: 5, label: 'Companies' },
  { value: 5, label: 'Industries' },
  // TODO(client): confirm — founding year is a placeholder.
  { value: 2010, label: 'Established', plain: true },
]

export const about = {
  eyebrow: 'About Us',
  title: 'One founder’s vision, grown into five companies.',
  body: [
    '4M International is the family of businesses built by a single founder, who turned one venture into five companies across healthcare, agriculture, technology, hardware, and trade.',
    'Every company shares the same DNA: honest work, disciplined management, and patient, long-term investment. Different industries, one standard.',
  ],
  image: img('about.jpg', '4m-about-people', 1200, 1500),
}

// sectors for the kinetic divider strip
export const sectors = [
  'Healthcare',
  'Agriculture',
  'Technology',
  'Hardware & Sanitary',
  'Trade',
]

export const companies = [
  {
    id: 'oushod-sheba',
    index: '01',
    name: 'Oushod Sheba Ltd',
    sector: 'Healthcare & Medicine Delivery',
    tagline: 'Your trusted medicine delivery partner.',
    description:
      'An online pharmacy and medicine-delivery service bringing genuine, trusted healthcare right to your door.',
    tags: ['Online pharmacy', 'Medicine delivery', 'Healthcare'],
    url: 'https://oushodsheba.com/',
    image: img('company-oushod-sheba.jpg', '4m-pharma-care', 1700, 1300),
  },
  {
    id: 'agro',
    index: '02',
    name: '4M Agro Ltd',
    sector: 'Agriculture & Agro-processing',
    tagline: 'From our soil to your table.',
    description:
      'Modern farming, livestock, and agro-processing that strengthen the food supply from field to market.',
    tags: ['Farming', 'Agro-processing', 'Food'],
    image: img('company-4m-agro.jpg', '4m-agro-field', 1700, 1300),
    page: {
      intro: [
        '4M Agro is the agriculture and agro-processing arm of 4M International, working across the value chain from cultivation to processed food.',
        'We pair modern farming practices with dependable processing and distribution to strengthen the food supply and support local growers.',
      ],
      offerings: [
        { title: 'Crop cultivation', body: 'Efficient farming of staple and cash crops on well-managed land.' },
        { title: 'Agro-processing', body: 'Cleaning, processing, and packaging that add value to raw produce.' },
        { title: 'Livestock & poultry', body: 'Responsibly managed livestock and poultry operations.' },
        { title: 'Distribution', body: 'Moving quality food from farm to market, dependably.' },
      ],
      gallery: [
        img('agro-gallery-1.jpg', '4m-agro-crop', 1200, 1500),
        img('agro-gallery-2.jpg', '4m-agro-harvest', 1200, 900),
        img('agro-gallery-3.jpg', '4m-agro-processing', 1200, 900),
      ],
    },
  },
  {
    id: 'zaag-system',
    index: '03',
    name: 'Zaag System Ltd',
    sector: 'Technology & AI Engineering',
    tagline: 'An AI product engineering lab.',
    description:
      'Building intelligent software, platforms, and digital systems for organisations ready to modernise.',
    tags: ['AI engineering', 'Software', 'Platforms'],
    url: 'https://zaagsys.com/',
    image: img('company-zaag-system.jpg', '4m-tech-systems', 1700, 1300),
  },
  {
    id: 'hardware-sanitary',
    index: '04',
    name: '4M Hardware & Sanitary',
    sector: 'Hardware & Sanitaryware',
    tagline: 'The fittings behind every build.',
    description:
      'Hardware, plumbing, and sanitary products supplying contractors, retailers, and households nationwide.',
    tags: ['Hardware', 'Plumbing', 'Sanitaryware'],
    image: img('company-hardware-sanitary.jpg', '4m-hardware-tools', 1700, 1300),
    page: {
      intro: [
        '4M Hardware & Sanitary supplies the building materials behind homes, businesses, and infrastructure across the country.',
        'From everyday hardware to complete sanitaryware ranges, we serve contractors, retailers, and households with dependable products and supply.',
      ],
      offerings: [
        { title: 'Hardware & tools', body: 'A broad range of construction and general hardware.' },
        { title: 'Sanitaryware', body: 'Bathroom and sanitary fittings for every budget.' },
        { title: 'Plumbing supplies', body: 'Pipes, fittings, and fixtures for projects of any size.' },
        { title: 'Trade supply', body: 'Reliable bulk supply for contractors and retailers.' },
      ],
      gallery: [
        img('hardware-gallery-1.jpg', '4m-hardware-store', 1200, 1500),
        img('hardware-gallery-2.jpg', '4m-hardware-fittings', 1200, 900),
        img('hardware-gallery-3.jpg', '4m-sanitary-ware', 1200, 900),
      ],
    },
  },
  {
    id: 'trading',
    index: '05',
    name: '4M Trading',
    sector: 'Trading & Distribution',
    tagline: 'Sourcing the world, delivered locally.',
    description:
      'Import, export, and distribution connecting global suppliers with local markets.',
    tags: ['Import / export', 'Sourcing', 'Distribution'],
    image: img('company-trading.jpg', '4m-trade-port', 1700, 1300),
    page: {
      intro: [
        '4M Trading is the import, export, and distribution business of 4M International, connecting global suppliers with local markets.',
        'We source dependable products at scale and move them efficiently through a trusted distribution network.',
      ],
      offerings: [
        { title: 'Import & export', body: 'Sourcing and shipping across borders with trusted partners.' },
        { title: 'Sourcing', body: 'Finding the right products at the right price, at scale.' },
        { title: 'Distribution', body: 'A network that reaches markets nationwide.' },
        { title: 'Wholesale supply', body: 'Consistent bulk supply for businesses and retailers.' },
      ],
      gallery: [
        img('trading-gallery-1.jpg', '4m-trade-containers', 1200, 1500),
        img('trading-gallery-2.jpg', '4m-trade-cargo', 1200, 900),
        img('trading-gallery-3.jpg', '4m-trade-warehouse', 1200, 900),
      ],
    },
  },
]

export const values = {
  eyebrow: 'Our Mission',
  title: 'Build companies that earn trust and last for generations.',
  items: [
    {
      k: '01',
      title: 'Integrity first',
      body: 'We build long-term trust over short-term gain. Reputation is the only asset that compounds across every business.',
    },
    {
      k: '02',
      title: 'Diversified by design',
      body: 'Five industries, one disciplined operating standard. Breadth keeps the group resilient through any single cycle.',
    },
    {
      k: '03',
      title: 'Rooted locally',
      body: 'Bangladeshi roots, held to a global bar. We know our markets, and we hold our quality to international standards.',
    },
    {
      k: '04',
      title: 'Built to last',
      body: 'We invest for decades, not quarters. Patient capital and steady management let each company grow on solid ground.',
    },
  ],
}

export const founder = {
  eyebrow: 'The Founder',
  // TODO(client): add the founder's real name + portrait at public/images/founder.jpg
  name: '',
  title: 'Founder & Chairman, 4M International',
  message:
    'I built each of these companies around one belief: do honest work, serve people well, and stay patient. Five businesses later, that belief still guides every decision we make.',
  image: img('founder.jpg', '4m-founder-portrait', 1200, 1500),
}

export const presence = {
  eyebrow: 'Presence',
  title: 'Headquartered in Dhaka.',
  body: 'Our group office anchors operations spanning the country, from supply and distribution to manufacturing and trade.',
  address: ['47 Ishakha Avenue', 'Uttara, Dhaka', 'Bangladesh'],
  mapQuery: '47 Ishakha Avenue, Uttara, Dhaka, Bangladesh',
  image: img('presence.jpg', '4m-dhaka-city', 1900, 1150),
}

export const contact = {
  eyebrow: 'Contact',
  title: "Let's build something together.",
  body: 'Whether you are a partner, supplier, or future colleague, we would like to hear from you.',
  email: 'corporate@4mgroupbd.com',
  phone: '+880 1873-222255',
  address: ['47 Ishakha Avenue', 'Uttara, Sector 6, Dhaka, Bangladesh'],
  // Optional: paste a Formspree (or similar) endpoint to make the form send.
  // Leave empty to fall back to a pre-filled email draft.
  formEndpoint: '',
}

export const socials = [
  { label: 'LinkedIn', href: '#', icon: 'linkedin' },
  { label: 'Facebook', href: '#', icon: 'facebook' },
  { label: 'Instagram', href: '#', icon: 'instagram' },
]

export const year = 2026
