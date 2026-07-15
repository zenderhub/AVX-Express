// Mock data for the prototype (test edit).

const USER = {
  name: "Juan Sebastian Acuna",
  initials: "JA",
  email: "juan.acuna@gmail.com",
  phone: "+57 310 555 4412",
  country: "Colombia",
  apto: "ZB-123301",
  levelName: "Nivel Básico",
  levelPoints: 1678,
  levelCap: 2000,
  nextLevel: "CE",
};

const USA_ADDRESS = [
  ["Telefono",  "7864423800"],
  ["Dirección", "7971 NW 21 ST"],
  ["Apto",      "ZB-123301"],
  ["ZC",        "33198"],
  ["Ciudad",    "Doral"],
  ["Estado",    "Florida"],
];

// Package states (order matters for the timeline)
const STATES = [
  { id: "tienda",     label: "En Tienda",    short: "TDA" },
  { id: "bodega",     label: "En Bodega",    short: "BOD" },
  { id: "despachado", label: "Despachado",   short: "DES" },
  { id: "camino",     label: "En Camino",    short: "CAM" },
  { id: "entregado",  label: "Entregado",    short: "ENT" },
];

const STATE_LABEL = Object.fromEntries(STATES.map(s => [s.id, s.label]));

const STORES = ["Amazon", "eBay", "SHEIN", "Temu", "Best Buy", "Nike", "Otra"];
const CATEGORIES = ["MODA", "TECNOLOGÍA", "HOGAR", "MASCOTAS", "BELLEZA", "DEPORTES"];

// Packages — mix of states and stores
const PACKAGES = [
  {
    id: "p1", tracking: "1Z999AA10123456784", store: "Amazon",
    description: "Auriculares Sony WH-1000XM5", category: "TECNOLOGÍA",
    value: 349.99, weight: 0.9, dims: "25 × 22 × 10 cm",
    state: "bodega", arrivedAt: "2026-04-18",
    photo: "tech",
    events: [
      { t: "2026-04-18 14:22", loc: "Doral, FL",  text: "Recibido en bodega ZenderBox" },
      { t: "2026-04-17 09:10", loc: "Memphis, TN", text: "Salió del centro FedEx" },
      { t: "2026-04-16 21:30", loc: "Seattle, WA", text: "Aceptado por el transportista" },
    ],
  },
  {
    id: "p2", tracking: "9400111899223456781234", store: "SHEIN",
    description: "Vestido verano floral + 2 blusas", category: "MODA",
    value: 68.40, weight: 0.6, dims: "30 × 24 × 6 cm",
    state: "tienda", arrivedAt: "2026-04-19",
    photo: "fashion",
    events: [
      { t: "2026-04-19 11:05", loc: "Doral, FL", text: "Pedido recibido en tienda" },
    ],
  },
  {
    id: "p3", tracking: "TBA123456789000", store: "Nike",
    description: "Air Zoom Pegasus 41 · Talla 10", category: "DEPORTES",
    value: 139.00, weight: 1.1, dims: "33 × 22 × 13 cm",
    state: "camino", arrivedAt: "2026-04-14",
    photo: "sport",
    events: [
      { t: "2026-04-22 06:18", loc: "Bogotá, CO", text: "En tránsito internacional" },
      { t: "2026-04-20 08:44", loc: "Miami, FL",  text: "Despachado desde ZenderBox" },
      { t: "2026-04-14 15:30", loc: "Doral, FL",  text: "Recibido en bodega ZenderBox" },
    ],
  },
  {
    id: "p4", tracking: "1Z999AA10987654321", store: "Best Buy",
    description: "Logitech MX Master 3S", category: "TECNOLOGÍA",
    value: 99.99, weight: 0.3, dims: "14 × 10 × 6 cm",
    state: "camino", arrivedAt: "2026-04-09",
    photo: "tech",
    events: [
      { t: "2026-04-24 07:40", loc: "Bogotá, CO", text: "En proceso aduanero" },
      { t: "2026-04-22 18:12", loc: "Bogotá, CO", text: "Llegó al país de destino" },
      { t: "2026-04-20 08:44", loc: "Miami, FL",  text: "Despachado desde ZenderBox" },
      { t: "2026-04-09 13:05", loc: "Doral, FL",  text: "Recibido en bodega ZenderBox" },
    ],
  },
  {
    id: "p5", tracking: "EC123456789US", store: "Temu",
    description: "Organizador escritorio + cables", category: "HOGAR",
    value: 24.50, weight: 0.7, dims: "28 × 20 × 8 cm",
    state: "entregado", arrivedAt: "2026-03-28",
    photo: "home",
    events: [
      { t: "2026-04-04 11:20", loc: "Bogotá, CO", text: "Entregado al destinatario" },
      { t: "2026-04-03 08:50", loc: "Bogotá, CO", text: "En reparto local" },
      { t: "2026-04-01 16:00", loc: "Bogotá, CO", text: "Liberado de aduana" },
      { t: "2026-03-28 10:45", loc: "Doral, FL",  text: "Recibido en bodega ZenderBox" },
    ],
  },
  {
    id: "p6", tracking: "1Z999AA10555333777", store: "eBay",
    description: "Cámara Fujifilm X100V (usada)", category: "TECNOLOGÍA",
    value: 1200.00, weight: 0.8, dims: "20 × 15 × 12 cm",
    state: "despachado", arrivedAt: "2026-04-12",
    photo: "tech",
    events: [
      { t: "2026-04-20 08:44", loc: "Miami, FL", text: "Despachado desde ZenderBox" },
      { t: "2026-04-12 09:15", loc: "Doral, FL", text: "Recibido en bodega ZenderBox" },
    ],
  },
  {
    id: "p7", tracking: "1Z999AA10444555222", store: "Amazon",
    description: "Kindle Paperwhite 12a gen", category: "TECNOLOGÍA",
    value: 159.99, weight: 0.4, dims: "18 × 13 × 3 cm",
    state: "bodega", arrivedAt: "2026-04-21",
    photo: "tech",
    events: [
      { t: "2026-04-21 16:40", loc: "Doral, FL", text: "Recibido en bodega ZenderBox" },
    ],
  },
];

const ADDRESSES = [
  {
    id: "a1", alias: "Casa",   primary: true,
    recipient: "Juan Sebastian Acuna",   phone: "+57 310 555 4412",
    line1: "Cra 43 # 6 Sur-15 · Apto 902",
    line2: "Poblado, Medellín, Antioquia",
    country: "Colombia", zip: "050021",
  },
  {
    id: "a2", alias: "Oficina", primary: false,
    recipient: "Juan Sebastian Acuna",   phone: "+57 310 555 4412",
    line1: "Calle 99 # 7-33 · Piso 8 · WeWork",
    line2: "Chicó Reservado, Bogotá, Cundinamarca",
    country: "Colombia", zip: "110221",
  },
];

const REFERRALS = [
  { name: "María Rivas",    date: "2026-04-18", state: "activo",    earn: 5 },
  { name: "Carlos Mejía",   date: "2026-04-09", state: "activo",    earn: 5 },
  { name: "Ana Salcedo",    date: "2026-04-02", state: "pendiente", earn: 0 },
  { name: "David Ordoñez",  date: "2026-03-24", state: "activo",    earn: 5 },
  { name: "Laura Peña",     date: "2026-03-11", state: "activo",    earn: 5 },
  { name: "Sebastián Ríos", date: "2026-02-28", state: "pendiente", earn: 0 },
];

Object.assign(window, {
  USER, USA_ADDRESS, STATES, STATE_LABEL,
  STORES, CATEGORIES, PACKAGES, ADDRESSES, REFERRALS,
});
