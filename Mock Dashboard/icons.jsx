// icons.jsx — powered by Lucide Icons (lucide.dev · MIT)
// window.lucide disponible via CDN cargado en el <head>

function _ico(name, size, sw) {
  size = size || 18;
  sw   = sw   || 1.8;
  // En el UMD de Lucide cada icono es directamente [[tag, attrs], ...]
  const nodes = window.lucide && window.lucide[name];
  if (!nodes) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor"
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      {nodes.map(function(node, i) {
        return React.createElement(node[0], Object.assign({ key: i }, node[1]));
      })}
    </svg>
  );
}

// Sidebar
function IcoDashboard()          { return _ico("LayoutDashboard", 18); }
function IcoHome(p)              { return _ico("House",            (p||{}).size || 18); }
function IcoTrack(p)             { return _ico("Scan",             18); }
function IcoPlus(p)              { return _ico("SquarePlus",       18); }
function IcoBox(p)               { return _ico("Package",          18); }
function IcoConsolidate(p)       { return _ico("GitMerge",         18); }
function IcoUser(p)              { return _ico("User",             18); }
function IcoPin(p)               { return _ico("MapPin",           18); }
function IcoShare(p)             { return _ico("Share2",           18); }
function IcoLogout()             { return _ico("LogOut",           18); }

// Utility
function IcoCopy(p)              { return _ico("Copy",             (p||{}).size || 14, 1.6); }
function IcoCheck(p)             { return _ico("Check",            (p||{}).size || 14); }
function IcoX(p)                 { return _ico("X",                (p||{}).size || 16); }
function IcoSearch(p)            { return _ico("Search",           (p||{}).size || 16); }
function IcoChevron(p)           { return _ico("ChevronRight",     (p||{}).size || 16); }
function IcoChevronDown(p)       { return _ico("ChevronDown",      (p||{}).size || 16); }
function IcoChevronLeft(p)       { return _ico("ChevronLeft",      (p||{}).size || 16); }
function IcoMenu(p)              { return _ico("Menu",             (p||{}).size || 20); }
function IcoFilter(p)            { return _ico("SlidersHorizontal",(p||{}).size || 16); }
function IcoGrid(p)              { return _ico("LayoutGrid",       (p||{}).size || 16); }
function IcoList(p)              { return _ico("List",             (p||{}).size || 16); }
function IcoTrash(p)             { return _ico("Trash2",           (p||{}).size || 16); }
function IcoEdit(p)              { return _ico("Pencil",           (p||{}).size || 16); }
function IcoUpload(p)            { return _ico("Upload",           (p||{}).size || 24); }
function IcoCamera(p)            { return _ico("Camera",           (p||{}).size || 16); }
function IcoEye(p)               { return _ico("Eye",              (p||{}).size || 16); }
function IcoTruck(p)             { return _ico("Truck",            (p||{}).size || 18); }
function IcoPackage(p)           { return _ico("Package",          (p||{}).size || 18); }
function IcoPlane(p)             { return _ico("Send",             (p||{}).size || 18); }
function IcoWarehouse(p)         { return _ico("Warehouse",        (p||{}).size || 18); }
function IcoShield(p)            { return _ico("Shield",           (p||{}).size || 18); }
function IcoDone(p)              { return _ico("CircleCheck",      (p||{}).size || 18); }
function IcoWhatsapp(p)          { return _ico("MessageCircle",    (p||{}).size || 16); }
function IcoMail(p)              { return _ico("Mail",             (p||{}).size || 16); }
function IcoLink(p)              { return _ico("Link",             (p||{}).size || 16); }
function IcoLock(p)              { return _ico("Lock",             (p||{}).size || 16); }
function IcoBell(p)              { return _ico("Bell",             (p||{}).size || 16); }
function IcoGlobe(p)             { return _ico("Globe",            (p||{}).size || 16); }
function IcoImage(p)             { return _ico("Image",            (p||{}).size || 16); }
function IcoXSocial(p)           { return _ico("X",                (p||{}).size || 16); }
function IcoFacebook(p)          { return _ico("Facebook",         (p||{}).size || 16); }

// Big stat-card icons
function IcoShareLg()            { return _ico("Share2",   28, 1.6); }
function IcoGuideLg()            { return _ico("FileText", 28, 1.6); }

// Store avatar — sin cambios
function StoreDot({ name }) {
  const colors = {
    Amazon:    "#FF9900",
    eBay:      "#E53238",
    SHEIN:     "#000000",
    Temu:      "#F86A1F",
    "Best Buy":"#0046BE",
    Nike:      "#111111",
    Otra:      "#8A8A8A",
  };
  const initial = (name || "?").charAt(0).toUpperCase();
  return (
    <div style={{
      width: 32, height: 32, borderRadius: 8, background: colors[name] || "#8A8A8A",
      color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 700, fontSize: 14, flexShrink: 0, fontFamily: "Ubuntu",
    }}>{initial}</div>
  );
}

Object.assign(window, {
  IcoDashboard, IcoHome, IcoTrack, IcoPlus, IcoBox, IcoConsolidate,
  IcoUser, IcoPin, IcoShare, IcoLogout,
  IcoCopy, IcoCheck, IcoX, IcoSearch, IcoChevron, IcoChevronDown, IcoChevronLeft,
  IcoMenu, IcoFilter, IcoGrid, IcoList, IcoTrash, IcoEdit,
  IcoUpload, IcoCamera, IcoEye, IcoTruck, IcoPackage, IcoPlane, IcoWarehouse,
  IcoShield, IcoDone, IcoWhatsapp, IcoMail, IcoLink, IcoLock, IcoBell, IcoGlobe, IcoImage,
  IcoXSocial, IcoFacebook,
  IcoShareLg, IcoGuideLg, StoreDot,
});
