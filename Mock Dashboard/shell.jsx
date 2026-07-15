// Shared UI primitives: Sidebar, Header, Card, Button, Input, Badge, StateBadge, Timeline, Toast.

const GRADIENT = "#1E4B8A";

// ============ Shell ============
function Shell({ active, onNav, title, children, onOpenMenu }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#FFFFFF" }}>
      <Sidebar active={active} onNav={onNav} />
      <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", borderLeft: "1px solid #E8E8E8", background: "#FFFFFF" }}>
        <WebHeader title={title} onNav={onNav} onOpenMenu={onOpenMenu} />
        <div style={{ padding: "24px 40px 64px", flex: 1 }}>{children}</div>
      </main>
    </div>
  );
}

// ============ Sidebar ============
function Sidebar({ active, onNav }) {
  const principal = [
    { id: "dashboard", label: "Dashboard", icon: (a) => <IcoHome size={18} /> },
    { id: "tracking",  label: "Tracking",  icon: (a) => <IcoTrack active={a} /> },
  ];
  const cuenta = [];
  return (
    <aside style={{
      width: 232, minWidth: 232, background: "#F6F6F6",
      display: "flex", flexDirection: "column",
      padding: "28px 0 24px", position: "sticky", top: 0, height: "100vh",
    }}>
      <div style={{ padding: "0 22px 18px" }}>
        <img src="assets/logo-avx.png" alt="AVX Express" style={{ height: 36 }} />
      </div>
      <SidebarSection label="Principal" items={principal} active={active} onNav={onNav} />
      <div style={{ marginTop: "auto", padding: "0 14px" }}>
        <button onClick={() => onNav?.("salir")} style={{
          width: "100%", display: "flex", alignItems: "center", gap: 10,
          padding: "10px 12px", border: 0, background: "transparent",
          color: "#E02424", cursor: "pointer",
          fontFamily: "Ubuntu", fontWeight: 700, fontSize: 13,
        }}>
          <IcoLogout /> Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}

function SidebarSection({ label, items, active, onNav }) {
  return (
    <div style={{ padding: "6px 14px 12px" }}>
      <div style={{
        padding: "10px 12px 6px", fontFamily: "Ubuntu",
        fontWeight: 700, fontSize: 12, color: "#333",
      }}>{label}</div>
      {items.map(it => (
        <SidebarItem key={it.id} {...it}
          active={active === it.id} onClick={() => onNav?.(it.id)} />
      ))}
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: "100%", height: 36, border: 0, cursor: "pointer",
      background: active ? GRADIENT : "transparent",
      borderRadius: 8, marginBottom: 2,
      display: "flex", alignItems: "center", gap: 10, padding: "0 12px",
      fontFamily: "Ubuntu", fontWeight: active ? 700 : 500, fontSize: 13,
      color: active ? "#F6F6F6" : "#333", textAlign: "left",
      transition: "background .15s ease",
    }}
    onMouseEnter={e => { if(!active) e.currentTarget.style.background = "#FFFFFF"; }}
    onMouseLeave={e => { if(!active) e.currentTarget.style.background = "transparent"; }}>
      <span style={{ width: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{typeof icon === "function" ? icon(active) : icon}</span>
      <span>{label}</span>
    </button>
  );
}

// ============ Header ============
function WebHeader({ title, userName = "Juan Sebastian Acuna", onNav }) {
  const initials = userName.split(" ").map(s => s[0]).join("").slice(0,2);
  return (
    <div style={{ padding: "22px 40px 0", background: "#FFFFFF" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ flex: 1, fontFamily: "Ubuntu", fontWeight: 700, fontSize: 22, color: "#333" }}>{title}</div>
        <span style={{ fontFamily: "Ubuntu", fontWeight: 600, fontSize: 14, color: "#333" }}>{userName}</span>
        <div onClick={() => onNav?.("perfil")} style={{
          width: 36, height: 36, borderRadius: 10, background: GRADIENT,
          color: "#F6F6F6", display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "Ubuntu", fontWeight: 700, fontSize: 12,
          cursor: "pointer",
        }}>{initials}</div>
      </div>
      <div style={{ height: 1, background: "#E8E8E8", marginTop: 18 }} />
    </div>
  );
}

// ============ Buttons ============
function Btn({ variant = "primary", size = "md", children, onClick, style = {}, disabled, type="button", iconLeft, iconRight }) {
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    border: 0, cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: "Ubuntu", fontWeight: 700,
    borderRadius: 8, transition: "filter .15s ease, transform .1s ease",
    opacity: disabled ? 0.55 : 1,
  };
  const sizes = {
    sm: { padding: "8px 14px", fontSize: 13, lineHeight: "16px" },
    md: { padding: "12px 20px", fontSize: 14, lineHeight: "18px" },
    lg: { padding: "16px 24px", fontSize: 15, lineHeight: "18px" },
  };
  const variants = {
    primary:   { background: GRADIENT, color: "#F6F6F6" },
    secondary: { background: "#C8352B", color: "#F6F6F6" },
    stroke:    { background: "#F6F6F6", color: "#C8352B", border: "1px solid #C8352B" },
    ghost:     { background: "transparent", color: "#333" },
    danger:    { background: "#F6F6F6", color: "#E02424", border: "1px solid #E02424" },
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.filter = "brightness(1.05)"; }}
      onMouseLeave={e => { e.currentTarget.style.filter = "brightness(1)"; }}
      onMouseDown={e => { if (!disabled) e.currentTarget.style.transform = "scale(0.98)"; }}
      onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}>
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}

// ============ Card ============
function Card({ children, style = {}, branded = false, padding = 24 }) {
  return (
    <div style={{
      background: "#F6F6F6",
      border: branded ? "1px solid #C8352B" : "1px solid #E8E8E8",
      borderRadius: 10, padding, boxSizing: "border-box", ...style,
    }}>{children}</div>
  );
}

function SectionTitle({ children, style = {} }) {
  return <div style={{ fontFamily: "Ubuntu", fontWeight: 700, fontSize: 18, color: "#333", marginBottom: 18, ...style }}>{children}</div>;
}

// ============ Input ============
function Field({ label, children, hint, error, style = {} }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, ...style }}>
      {label && <label style={{ fontFamily: "Ubuntu", fontWeight: 700, fontSize: 12, color: "#333" }}>{label}</label>}
      {children}
      {hint && !error && <div style={{ fontSize: 12, color: "#8A8A8A", fontFamily: "Ubuntu" }}>{hint}</div>}
      {error && <div style={{ fontSize: 12, color: "#F32735", fontFamily: "Ubuntu" }}>{error}</div>}
    </div>
  );
}

const inputBase = {
  width: "100%", height: 42, padding: "10px 14px",
  background: "#F6F6F6", border: "1px solid #B8B8B8", borderRadius: 8,
  fontFamily: "Ubuntu", fontWeight: 500, fontSize: 14, color: "#333",
  outline: "none", transition: "border-color .15s ease", boxSizing: "border-box",
};

function Input(props) {
  const { error, ...rest } = props;
  return <input {...rest} style={{
    ...inputBase, ...(error ? { borderColor: "#F32735" } : {}), ...(props.style||{}),
  }} onFocus={e => e.currentTarget.style.borderColor = error ? "#F32735" : "#C8352B"}
     onBlur={e => e.currentTarget.style.borderColor = error ? "#F32735" : "#B8B8B8"} />;
}

function Textarea(props) {
  return <textarea {...props} style={{
    ...inputBase, height: "auto", minHeight: 96, paddingTop: 12,
    resize: "vertical", ...(props.style||{}),
  }} onFocus={e => e.currentTarget.style.borderColor = "#C8352B"}
     onBlur={e => e.currentTarget.style.borderColor = "#B8B8B8"} />;
}

function Select({ value, onChange, options, placeholder, style = {} }) {
  return (
    <div style={{ position: "relative", ...style }}>
      <select value={value} onChange={e => onChange(e.target.value)} style={{
        ...inputBase, appearance: "none", paddingRight: 38, cursor: "pointer",
        color: value ? "#333" : "#B8B8B8",
      }}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => typeof o === "string"
          ? <option key={o} value={o}>{o}</option>
          : <option key={o.value} value={o.value}>{o.label}</option>
        )}
      </select>
      <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#666" }}>
        <IcoChevronDown />
      </div>
    </div>
  );
}

// ============ Checkbox + Toggle ============
function Checkbox({ checked, onChange, label, style = {} }) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: "pointer", fontFamily: "Ubuntu", fontSize: 13, color: "#333", ...style }}>
      <span style={{
        width: 18, height: 18, borderRadius: 4,
        border: checked ? "1px solid #C8352B" : "1px solid #B8B8B8",
        background: checked ? GRADIENT : "#F6F6F6",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        color: "#F6F6F6", transition: "all .15s ease",
      }}>{checked && <IcoCheck size={12} />}</span>
      <input type="checkbox" checked={checked} onChange={e => onChange?.(e.target.checked)} style={{ display: "none" }} />
      {label}
    </label>
  );
}

function Toggle({ on, onChange }) {
  return (
    <button onClick={() => onChange?.(!on)} style={{
      width: 40, height: 22, borderRadius: 10, border: 0, cursor: "pointer",
      background: on ? GRADIENT : "#DBDBDB",
      position: "relative", padding: 0, transition: "background .15s ease",
    }}>
      <span style={{
        position: "absolute", top: 2, left: on ? 20 : 2,
        width: 18, height: 18, borderRadius: 10, background: "#F6F6F6",
        boxShadow: "0 2px 4px rgba(39,39,39,0.2)",
        transition: "left .15s ease",
      }} />
    </button>
  );
}

// ============ Badge / StateBadge ============
function Badge({ children, variant = "default", style = {} }) {
  const variants = {
    default: { background: "#FFFFFF", color: "#333" },
    cyan:    { background: "rgba(200,53,43,0.12)", color: "#C8352B" },
    lime:    { background: "rgba(204,211,42,0.22)", color: "#5A6214" },
    success: { background: "#F1F6F5", color: "#008C31" },
    warn:    { background: "rgba(242,168,42,0.15)", color: "#A86A07" },
    error:   { background: "#F4E8E9", color: "#F32735" },
    gradient:{ background: GRADIENT, color: "#F6F6F6" },
  };
  return <span style={{
    display: "inline-flex", alignItems: "center", gap: 4,
    padding: "3px 10px", borderRadius: 10,
    fontFamily: "Ubuntu", fontWeight: 700, fontSize: 10,
    letterSpacing: "0.02em", textTransform: "uppercase",
    ...variants[variant], ...style,
  }}>{children}</span>;
}

const STATE_COLORS = {
  tienda:     { color: "#5B84C4", bg: "#E8F0FA" },
  bodega:     { color: "#4A73B5", bg: "#DDE8F5" },
  despachado: { color: "#3A62A6", bg: "#D2E0F0" },
  camino:     { color: "#2A5197", bg: "#C7D8EB" },
  entregado:  { color: "#1A4088", bg: "#BCD0E6" },
};

function StateBadge({ id }) {
  const s = STATE_COLORS[id] || { color: "#8A8A8A", bg: "#FFFFFF" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "3px 10px", borderRadius: 10,

      background: s.bg,
      color: s.color,
      fontFamily: "Ubuntu", fontWeight: 700, fontSize: 10,
      letterSpacing: "0.05em", textTransform: "uppercase",
      whiteSpace: "nowrap",
    }}>{STATE_LABEL[id] || id}</span>
  );
}

// State icons shared by Timeline and PackageThumb
const STATE_ICONS = {
  tienda:     { vb: "31 1 30 30",  d: "M39.5448 10.8926V9.66675H53.455V10.8926H39.5448ZM39.5792 22.3334V17.4302H38.5833V16.2044L39.5448 12.1184H53.455L54.4166 16.2044V17.4302H53.4207V22.3334H52.0812V17.4302H48.0627V22.3334H39.5792ZM40.9187 21.1076H46.7232V17.4302H40.9187V21.1076Z" },
  bodega:     { vb: "113 1 30 30", d: "M122.118 23.9166V8.08325H123.244V9.62123H133.756V8.08325H134.883V23.9166H133.756V22.3788H123.244V23.9166H122.118ZM123.244 15.2455H124.977V12.3287H129.02V15.2455H133.756V10.7474H123.244V15.2455ZM123.244 21.2525H127.98V18.3357H132.023V21.2525H133.756V16.3718H123.244V21.2525Z" },
  despachado: { vb: "195 1 30 30", d: "M208.114 24.4051L206.017 20.4799L202.083 18.3743L203.396 17.0759L206.646 17.6323L209.218 15.0602L202.133 12.0395L203.735 10.4179L212.347 11.9175L215.203 9.05219C215.508 8.74721 215.884 8.59473 216.331 8.59473C216.778 8.59473 217.154 8.74721 217.459 9.05219C217.764 9.35731 217.917 9.73095 217.917 10.1731C217.917 10.6154 217.764 10.989 217.459 11.294L214.58 14.1646L216.079 22.7622L214.463 24.3787L211.437 17.2931L208.865 19.8652L209.427 23.0927L208.114 24.4051Z" },
  camino:     { vb: "277 1 30 30", d: "M287.969 21.5416C287.394 21.5416 286.906 21.3406 286.505 20.9388C286.104 20.5369 285.904 20.0489 285.904 19.4749H284.658V11.7889C284.658 11.417 284.787 11.1023 285.045 10.8447C285.302 10.5871 285.617 10.4583 285.989 10.4583H296.01V13.261H297.964L300.342 16.4459V19.4749H299.011C299.011 20.0489 298.81 20.5369 298.408 20.9388C298.006 21.3406 297.517 21.5416 296.943 21.5416C296.368 21.5416 295.881 21.3406 295.48 20.9388C295.078 20.5369 294.878 20.0489 294.878 19.4749H290.037C290.037 20.0505 289.836 20.5388 289.434 20.9399C289.032 21.341 288.543 21.5416 287.969 21.5416ZM287.97 20.4375C288.24 20.4375 288.468 20.3445 288.654 20.1585C288.84 19.9727 288.933 19.7448 288.933 19.4749C288.933 19.205 288.84 18.9771 288.654 18.7911C288.468 18.6053 288.24 18.5124 287.97 18.5124C287.701 18.5124 287.473 18.6053 287.287 18.7911C287.101 18.9771 287.008 19.205 287.008 19.4749C287.008 19.7448 287.101 19.9727 287.287 20.1585C287.473 20.3445 287.701 20.4375 287.97 20.4375ZM296.945 20.4375C297.215 20.4375 297.442 20.3445 297.628 20.1585C297.814 19.9727 297.907 19.7448 297.907 19.4749C297.907 19.205 297.814 18.9771 297.628 18.7911C297.442 18.6053 297.215 18.5124 296.945 18.5124C296.675 18.5124 296.447 18.6053 296.261 18.7911C296.075 18.9771 295.982 19.205 295.982 19.4749C295.982 19.7448 296.075 19.9727 296.261 20.1585C296.447 20.3445 296.675 20.4375 296.945 20.4375ZM296.01 16.8987H299.308L297.397 14.365H296.01V16.8987Z" },
  entregado:  { vb: "356 1 30 30", d: "M371 22.3333L370.08 21.5559C368.699 20.3776 367.556 19.3651 366.653 18.5184C365.75 17.6715 365.034 16.9178 364.506 16.2573C363.977 15.597 363.608 14.9945 363.398 14.4499C363.188 13.9055 363.083 13.3531 363.083 12.7926C363.083 11.6807 363.482 10.7497 364.28 9.99974C365.077 9.24991 366.067 8.875 367.25 8.875C367.977 8.875 368.665 9.03497 369.312 9.35491C369.96 9.67484 370.522 10.1337 371 10.7314C371.477 10.1337 372.04 9.67484 372.687 9.35491C373.335 9.03497 374.022 8.875 374.75 8.875C375.933 8.875 376.923 9.24991 377.72 9.99974C378.518 10.7497 378.917 11.6807 378.917 12.7926C378.917 13.3531 378.812 13.9055 378.602 14.4499C378.392 14.9945 378.023 15.597 377.494 16.2573C376.966 16.9178 376.251 17.6715 375.351 18.5184C374.45 19.3651 373.307 20.3776 371.92 21.5559L371 22.3333Z" },
};

// Lucide icons para cada estado del timeline
const TIMELINE_ICONS = {
  tienda:     "ShoppingBag",
  bodega:     "Warehouse",
  despachado: "Send",
  camino:     "Truck",
  entregado:  "PackageCheck",
};

// ============ Horizontal timeline ============
function Timeline({ currentId, compact = false, style = {} }) {
  const idx = STATES.findIndex(s => s.id === currentId);
  const activeColor = "#1E4B8A";
  const GRAY = "#DBDBDB";

  const shortLabel = { tienda: "Tienda", bodega: "Bodega", despachado: "Despachado", camino: "En Camino", entregado: "Entregado" };

  if (compact) {
    return (
      <div style={{ display: "flex", alignItems: "center", width: "100%", ...style }}>
        {STATES.map((s, i) => {
          const done = i < idx;
          const active = i === idx;
          return (
            <React.Fragment key={s.id}>
              <div style={{
                width: active ? 10 : 8, height: active ? 10 : 8, borderRadius: 10, flexShrink: 0,
                background: done || active ? activeColor : GRAY,
                boxShadow: active ? `0 0 0 3px ${activeColor}30` : "none",
              }} />
              {i < STATES.length - 1 && (
                <div style={{ flex: 1, height: 2, margin: "0 4px", background: done ? activeColor : GRAY, borderRadius: 2, minWidth: 8 }} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "flex-start", width: "100%", ...style }}>
      {STATES.map((s, i) => {
        const isDone = i <= idx;
        const isActive = i === idx;
        const color = isDone ? activeColor : GRAY;
        const lucideName = TIMELINE_ICONS[s.id];
        const iconNodes = lucideName && window.lucide && window.lucide[lucideName];
        return (
          <React.Fragment key={s.id}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: isDone ? color : GRAY,
              }}>
                {iconNodes && (
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
                    stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    {iconNodes.map(function(n, i) { return React.createElement(n[0], Object.assign({ key: i }, n[1])); })}
                  </svg>
                )}
              </div>
              <div style={{
                fontFamily: "Ubuntu", fontWeight: isActive ? 700 : 500,
                fontSize: 11, color: isActive ? color : "#8A8A8A",
                textAlign: "center", whiteSpace: "nowrap",
              }}>{shortLabel[s.id] || s.label}</div>
            </div>
            {i < STATES.length - 1 && (
              <div style={{
                flex: 1, height: 2, alignSelf: "flex-start", marginTop: 15,
                background: i < idx ? activeColor : GRAY,
                borderRadius: 2, minWidth: 8,
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ============ Toast ============
function Toast({ msg, variant = "success", onClose }) {
  if (!msg) return null;
  const variants = {
    success: { bg: "#F1F6F5", fg: "#008C31" },
    error:   { bg: "#F4E8E9", fg: "#F32735" },
  };
  const v = variants[variant];
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 1000,
      background: v.bg, color: v.fg, border: `1px solid ${v.fg}33`,
      padding: "12px 16px", borderRadius: 8, boxShadow: "0 4px 12px rgba(39,39,39,0.08)",
      display: "flex", alignItems: "center", gap: 10,
      fontFamily: "Ubuntu", fontWeight: 700, fontSize: 13,
      animation: "zbToastIn .2s ease",
    }}>
      <IcoCheck size={16} /> {msg}
      <button onClick={onClose} style={{ background: "transparent", border: 0, cursor: "pointer", color: v.fg, marginLeft: 8, padding: 2 }}><IcoX size={14} /></button>
    </div>
  );
}

// ============ Empty state ============
function EmptyState({ title, description, action }) {
  return (
    <div style={{
      background: "#F6F6F6", border: "1px dashed #B8B8B8", borderRadius: 10,
      padding: "48px 24px", textAlign: "center",
    }}>
      <div style={{
        width: 60, height: 60, borderRadius: 10,
        background: "rgba(200,53,43,0.08)", color: "#C8352B",
        display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16,
      }}><IcoPackage size={28} /></div>
      <div style={{ fontFamily: "Ubuntu", fontWeight: 700, fontSize: 18, color: "#333", marginBottom: 8 }}>{title}</div>
      {description && <div style={{ fontFamily: "Ubuntu", fontSize: 14, color: "#666", maxWidth: 420, margin: "0 auto 16px" }}>{description}</div>}
      {action}
    </div>
  );
}

// ============ Copy button (with flash feedback) ============
function CopyButton({ value, onCopy }) {
  const [copied, setCopied] = React.useState(false);
  const click = (e) => {
    e.stopPropagation();
    try { navigator.clipboard?.writeText(value); } catch (_) {}
    setCopied(true);
    onCopy?.(value);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <button onClick={click} title="Copiar" style={{
      background: "transparent", border: 0, cursor: "pointer", padding: 2,
      color: copied ? "#008C31" : "#B8B8B8", transition: "color .15s ease",
      display: "inline-flex", alignItems: "center",
    }}>
      {copied ? <IcoCheck /> : <IcoCopy />}
    </button>
  );
}

// ============ Package thumb — circular, grey, state icon ============
function PackageThumb({ state, category, size = 64 }) {
  const ico = STATE_ICONS[state];
  const iconSize = Math.round(size * 0.55);
  return (
    <div style={{
      width: size, height: size, borderRadius: 10, background: "#EBEBEB",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#8A8A8A", flexShrink: 0,
    }}>
      {ico
        ? <svg width={iconSize} height={iconSize} viewBox={ico.vb}><path d={ico.d} fill="currentColor"/></svg>
        : <IcoPackage size={iconSize} />
      }
    </div>
  );
}

Object.assign(window, {
  GRADIENT, Shell, Sidebar, WebHeader,
  Btn, Card, SectionTitle, Field, Input, Textarea, Select,
  Checkbox, Toggle, Badge, StateBadge, Timeline, Toast, EmptyState,
  CopyButton, PackageThumb, inputBase,
});
