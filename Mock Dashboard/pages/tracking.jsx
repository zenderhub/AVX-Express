// Tracking page — search, filter, horizontal timeline, drawer detail.

function TrackingPage({ setToast }) {
  const [q, setQ] = React.useState("");
  const [filter, setFilter] = React.useState("todos");
  const [detail, setDetail] = React.useState(null);

  const filters = [
    { id: "todos",      label: "Todos" },
    { id: "tienda",     label: "En Tienda" },
    { id: "bodega",     label: "En Bodega" },
    { id: "despachado", label: "Despachado" },
    { id: "camino",     label: "En Camino" },
    { id: "entregado",  label: "Entregado" },
  ];

  const filtered = PACKAGES.filter(p => {
    const matchQ = q === "" ||
      p.tracking.toLowerCase().includes(q.toLowerCase()) ||
      p.description.toLowerCase().includes(q.toLowerCase());
    const matchF = filter === "todos" ? true : p.state === filter;
    return matchQ && matchF;
  });

  return (
    <>
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <div style={{ position: "relative", flex: 1, maxWidth: 440 }}>
          <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#8A8A8A" }}><IcoSearch /></div>
          <Input placeholder="Buscar por tracking o descripción…" value={q} onChange={e => setQ(e.target.value)} style={{ paddingLeft: 40 }} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {filters.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            padding: "8px 14px", borderRadius: 10, cursor: "pointer",
            border: filter === f.id ? "1px solid #C8352B" : "1px solid #DBDBDB",
            background: filter === f.id ? "rgba(2,158,203,0.08)" : "#F6F6F6",
            color: filter === f.id ? "#C8352B" : "#333",
            fontFamily: "Ubuntu", fontWeight: filter === f.id ? 700 : 500, fontSize: 13,
            transition: "all .15s ease",
          }}>{f.label}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No hay paquetes que mostrar"
          description="Ajusta la búsqueda o los filtros, o registra un nuevo paquete para hacerle seguimiento."
          action={<Btn variant="primary">Registrar paquete</Btn>} />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map(p => (
            <div key={p.id} onClick={() => setDetail(p)} style={{
              background: "#F6F6F6", border: "1px solid #E8E8E8", borderRadius: 10,
              padding: 20, cursor: "pointer", transition: "border-color .15s ease, box-shadow .15s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#C8352B"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(39,39,39,0.06)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#E8E8E8"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ display: "grid", gridTemplateColumns: "56px 1fr auto", gap: 16, alignItems: "center", marginBottom: 20 }}>
                <PackageThumb category={p.category} state={p.state} size={56} />
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontFamily: "Ubuntu", fontWeight: 700, fontSize: 15, color: "#333" }}>{p.description}</span>
                    <StateBadge id={p.state} />
                  </div>
                  <div style={{ fontFamily: "Ubuntu", fontSize: 12, color: "#666", display: "flex", gap: 14 }}>
                    <span>{p.tracking}</span>
                    <span>·</span>
                    <span>{p.store}</span>
                    <span>·</span>
                    <span>{p.arrivedAt}</span>
                  </div>
                </div>
                <IcoChevron />
              </div>
              <div style={{ padding: "0 8px" }}>
                <Timeline currentId={p.state} />
              </div>
            </div>
          ))}
        </div>
      )}

      {detail && <TrackingDrawer pkg={detail} onClose={() => setDetail(null)} />}
    </>
  );
}

function TrackingDrawer({ pkg, onClose }) {
  const stateColor = (STATE_COLORS[pkg.state] || { color: "#8A8A8A" }).color;
  const stateLabel = STATE_LABEL[pkg.state] || pkg.state;
  const zdId = `ZB-${pkg.arrivedAt.replace(/-/g,"").slice(4)}${pkg.id.replace("p","").padStart(3,"0")}`;
  const weightLbs = (pkg.weight * 2.205).toFixed(1);
  const primaryAddr = ADDRESSES.find(a => a.primary) || ADDRESSES[0];

  return (
    <>
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, background: "rgba(31,31,31,0.4)", zIndex: 100,
        animation: "zbFadeIn .15s ease",
      }} />
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: 480, zIndex: 101,
        background: "#FFFFFF", boxShadow: "-4px 0 24px rgba(39,39,39,0.12)",
        display: "flex", flexDirection: "column",
        animation: "zbDrawerIn .25s ease",
      }}>
        <div style={{ padding: "14px 20px", display: "flex", justifyContent: "flex-end", flexShrink: 0 }}>
          <button onClick={onClose} style={{ background: "transparent", border: 0, cursor: "pointer", color: "#666", padding: 4 }}><IcoX /></button>
        </div>

        <div style={{ padding: "0 20px 24px", overflow: "auto", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>

          {/* Card 1: Estado */}
          <div style={{ background: "#F6F6F6", borderRadius: 10, border: "1px solid #E8E8E8", padding: 20 }}>
            <div style={{ fontFamily: "Ubuntu", fontWeight: 700, fontSize: 22, color: stateColor, marginBottom: 4 }}>
              {stateLabel}
            </div>
            <div style={{ fontFamily: "Ubuntu", fontSize: 13, color: "#666", marginBottom: 20 }}>
              Tu paquete ya se encuentra {stateLabel.toLowerCase()}.
            </div>
            <Timeline currentId={pkg.state} />
          </div>

          {/* Card 2: Información del paquete */}
          <div style={{ background: "#F6F6F6", borderRadius: 10, border: "1px solid #E8E8E8", padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontFamily: "Ubuntu", fontWeight: 700, fontSize: 11, color: "#8A8A8A", textTransform: "uppercase", letterSpacing: "0.04em" }}>{pkg.category}</div>
              <div style={{ fontFamily: "Ubuntu", fontSize: 12, color: "#666" }}>{weightLbs} Lbs</div>
            </div>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 14 }}>
              <PackageThumb category={pkg.category} state={pkg.state} size={56} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "Ubuntu", fontSize: 13, color: "#666", marginBottom: 4 }}>Enviado por: <span style={{ color: "#333", fontWeight: 600 }}>{pkg.store}</span></div>
                <div style={{ fontFamily: "Ubuntu", fontWeight: 700, fontSize: 13, color: "#333", marginBottom: 4 }}>Tracking: {pkg.tracking}</div>
                <div style={{ fontFamily: "Ubuntu", fontSize: 13, color: "#C8352B" }}>Zender ID: {zdId}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid #F0F0F0" }}>
              <div style={{ fontFamily: "Ubuntu", fontSize: 12, color: "#666" }}>Recibido: {pkg.arrivedAt}</div>
              <StateBadge id={pkg.state} />
            </div>
          </div>

          {/* Card 3: Destinatario */}
          <div style={{ background: "#F6F6F6", borderRadius: 10, border: "1px solid #E8E8E8", padding: 20 }}>
            <div style={{ fontFamily: "Ubuntu", fontWeight: 700, fontSize: 14, color: "#333", marginBottom: 12 }}>Destinatario</div>
            <div style={{ fontFamily: "Ubuntu", fontWeight: 700, fontSize: 13, color: "#333", marginBottom: 4 }}>{primaryAddr.recipient}</div>
            <div style={{ fontFamily: "Ubuntu", fontSize: 13, color: "#666", lineHeight: "20px" }}>
              {primaryAddr.line1}<br/>
              {primaryAddr.line2}<br/>
              {primaryAddr.country} · {primaryAddr.zip}
            </div>
          </div>

          {/* Card 4: Seguimiento */}
          <div style={{ background: "#F6F6F6", borderRadius: 10, border: "1px solid #E8E8E8", padding: 20 }}>
            <div style={{ fontFamily: "Ubuntu", fontWeight: 700, fontSize: 14, color: "#333", marginBottom: 16 }}>Seguimiento</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {pkg.events.map((ev, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{
                    flexShrink: 0, width: 32, height: 32, borderRadius: 10,
                    background: i === 0 ? "rgba(2,158,203,0.1)" : "#FFFFFF",
                    color: i === 0 ? "#C8352B" : "#8A8A8A",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <IcoPackage size={14} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "Ubuntu", fontWeight: 700, fontSize: 13, color: "#333", marginBottom: 2 }}>{ev.text}</div>
                    <div style={{ fontFamily: "Ubuntu", fontSize: 12, color: "#666" }}>{ev.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {pkg.state === "bodega" && (
          <div style={{ padding: "16px 20px", borderTop: "1px solid #E8E8E8", background: "#F6F6F6", flexShrink: 0 }}>
            <Btn variant="primary" style={{ width: "100%" }}>Despachar</Btn>
          </div>
        )}
      </div>
    </>
  );
}

function DetailRow({ label, value }) {
  return (
    <div>
      <div style={{ fontFamily: "Ubuntu", fontWeight: 500, fontSize: 11, color: "#8A8A8A", marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</div>
      <div style={{ fontFamily: "Ubuntu", fontWeight: 700, fontSize: 13, color: "#333" }}>{value}</div>
    </div>
  );
}

Object.assign(window, { TrackingPage });
