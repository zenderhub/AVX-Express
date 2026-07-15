#!/usr/bin/env python3
"""Genera index.html autocontenido con Dashboard y Tracking."""
import pathlib

HERE = pathlib.Path(__file__).parent

order = [
    "icons.jsx",
    "data.jsx",
    "shell.jsx",
    "pages/dashboard.jsx",
    "pages/tracking.jsx",
]

chunks = []
for rel in order:
    src = (HERE / rel).read_text(encoding="utf-8")
    chunks.append(f"\n/* ========== {rel} ========== */\n{src}\n")

inline_jsx = "".join(chunks)

APP = r"""
const TITLES = {
  dashboard: "Dashboard",
  tracking:  "Tracking",
};

function App() {
  const initial = window.location.hash.replace("#", "") || "dashboard";
  const [active, setActive] = React.useState(TITLES[initial] ? initial : "dashboard");
  const [toast, setToast] = React.useState(null);

  const nav = (id) => {
    if (id === "salir") { setToast("Cerrando sesión…"); return; }
    if (!TITLES[id]) return;
    setActive(id);
    window.location.hash = id;
    window.scrollTo({ top: 0 });
  };

  React.useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace("#", "");
      if (TITLES[h]) setActive(h);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const pageProps = { setToast, onNav: nav };
  let Page = null;
  switch (active) {
    case "dashboard": Page = <DashboardPage {...pageProps} />; break;
    case "tracking":  Page = <TrackingPage  {...pageProps} />; break;
    default:          Page = <DashboardPage {...pageProps} />;
  }

  return (
    <>
      <Shell active={active} onNav={nav} title={TITLES[active] || "Dashboard"}>
        <div key={active} className="zb-page" data-screen-label={active}>
          {Page}
        </div>
      </Shell>
      <Toast msg={toast} onClose={() => setToast(null)} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
"""

css = (HERE / "colors_and_type.css").read_text(encoding="utf-8")

html = f"""<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>ZenderBox · Dashboard</title>
<meta name="viewport" content="width=1280">
<link rel="icon" href="assets/favicon-color.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet">
<style>
{css}

html,body{{margin:0;padding:0;background:#F6F6F6;min-height:100vh;font-family:"Ubuntu",ui-sans-serif,system-ui,sans-serif;color:#333}}
*{{box-sizing:border-box}}
button{{font-family:inherit}}
input,textarea,select{{font-family:inherit}}

@keyframes zbFadeIn {{ from {{ opacity: 0 }} to {{ opacity: 1 }} }}
@keyframes zbDrawerIn {{ from {{ transform: translateX(100%) }} to {{ transform: translateX(0) }} }}
@keyframes zbModalIn {{ from {{ opacity: 0; transform: scale(0.97) }} to {{ opacity: 1; transform: scale(1) }} }}
@keyframes zbToastIn {{ from {{ opacity: 0; transform: translateY(8px) }} to {{ opacity: 1; transform: translateY(0) }} }}
@keyframes zbPageIn {{ from {{ opacity: 0; transform: translateY(4px) }} to {{ opacity: 1 }} }}
.zb-page {{ animation: zbPageIn .18s ease backwards; }}

::-webkit-scrollbar {{ width: 10px; height: 10px; }}
::-webkit-scrollbar-thumb {{ background: #DBDBDB; border-radius: 8px; border: 2px solid #F6F6F6; }}
::-webkit-scrollbar-thumb:hover {{ background: #B8B8B8; }}
</style>

<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" crossorigin="anonymous"></script>
</head>
<body>
<div id="root"></div>

<script type="text/babel" data-presets="react">
{inline_jsx}
{APP}
</script>
</body>
</html>
"""

out = HERE / "index.html"
out.write_text(html, encoding="utf-8")
print(f"Wrote {out} ({len(html):,} bytes)")
