// Dashboard home page — replicates reference + recent packages.

function useIsTabletLandscape() {
  const [isTablet, setIsTablet] = React.useState(
    typeof window !== "undefined" && window.innerWidth <= 1180
  );
  React.useEffect(() => {
    const onResize = () => setIsTablet(window.innerWidth <= 1180);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isTablet;
}

function DashboardPage({ setToast, onNav }) {
  const recent = PACKAGES.slice().sort((a, b) => b.arrivedAt.localeCompare(a.arrivedAt)).slice(0, 4);
  const isTablet = useIsTabletLandscape();
  return (
    <>
      <SectionTitle>Tu dirección en Estados Unidos</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 20, alignItems: "start" }}>
        <AddressCard onCopy={(v) => setToast(`Copiado: ${v}`)} />
        <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr", gap: 20 }}>
          <div style={{ gridColumn: isTablet ? "auto" : "1 / span 2" }}><LevelCard /></div>
          <StatCard icon={<IcoShareLg />} value="$0.00 USD" label="Referidos ($5 USD por cada uno)" onClick={() => onNav("referidos")} />
          <StatCard icon={<IcoGuideLg />} value="37" label="Guías enviadas" onClick={() => onNav("paquetes")} />
        </div>
      </div>

      <div style={{ marginTop: 36, display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{ fontFamily: "Ubuntu", fontWeight: 700, fontSize: 18, color: "#333" }}>Paquetes recientes</div>
        <button onClick={() => onNav("paquetes")} style={{
          background: "transparent", border: 0, cursor: "pointer",
          fontFamily: "Ubuntu", fontWeight: 700, fontSize: 13, color: "#C8352B",
          display: "inline-flex", alignItems: "center", gap: 4
        }}>Ver todo <IcoChevron size={14} /></button>
      </div>

      <Card padding={0}>
        {recent.map((p, i) =>
        <div key={p.id} style={{
          display: "grid", gridTemplateColumns: "56px 1fr 110px 110px 80px 80px 130px",
          gap: 16, alignItems: "center", padding: "14px 20px",
          borderTop: i === 0 ? "none" : "1px solid #F0F0F0"
        }}>
            <PackageThumb category={p.category} state={p.state} size={56} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: "Ubuntu", fontWeight: 700, fontSize: 13, color: "#333", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.description}</div>
              <div style={{ fontFamily: "Ubuntu", fontSize: 11, color: "#B8B8B8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.tracking}</div>
            </div>
            <div style={{ fontFamily: "Ubuntu", fontSize: 13, color: "#333" }}>{p.store}</div>
            <div style={{ fontFamily: "Ubuntu", fontSize: 12, color: "#666" }}>{p.arrivedAt}</div>
            <div style={{ fontFamily: "Ubuntu", fontSize: 12, color: "#333" }}>{p.weight} kg</div>
            <div style={{ fontFamily: "Ubuntu", fontWeight: 700, fontSize: 12, color: "#333" }}>${p.value.toFixed(0)}</div>
            <StateBadge id={p.state} />
          </div>
        )}
      </Card>
    </>);

}

function AddressCard({ onCopy }) {
  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <div style={{
          width: 92, height: 92, borderRadius: 10, background: GRADIENT, color: "#F6F6F6",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "Ubuntu", fontWeight: 700, fontSize: 34, letterSpacing: "-0.02em"
        }}>JA</div>
      </div>
      <div style={{ fontFamily: "Ubuntu", fontWeight: 700, fontSize: 18, color: "#333", textAlign: "center", marginBottom: 8 }}>Juan Sebastian Acuna</div>
      <div style={{ fontFamily: "Ubuntu", fontWeight: 500, fontSize: 12, color: "#666", textAlign: "center", lineHeight: "17px", marginBottom: 14 }}>
        Usa esta dirección y datos <b style={{ color: "#333" }}>exactamente</b> como aparecen aquí en todas tus compras online.
      </div>
      <div style={{ border: "1px solid #C8352B", borderRadius: 8, padding: "10px 14px", display: "flex", flexDirection: "column", gap: 4 }}>
        {USA_ADDRESS.map(([k, v]) =>
        <div key={k} style={{ display: "flex", alignItems: "center", gap: 12, padding: "3px 0" }}>
            <span style={{ width: 74, fontFamily: "Ubuntu", fontWeight: 700, fontSize: 12, color: "#004B72" }}>{k}</span>
            <span style={{ flex: 1, fontFamily: "Ubuntu", fontWeight: 500, fontSize: 12, color: "#333" }}>{v}</span>
            <CopyButton value={v} onCopy={onCopy} />
          </div>
        )}
      </div>
    </Card>);

}

function LevelCard() {
  const pct = Math.round(USER.levelPoints / USER.levelCap * 1000) / 10;
  return (
    <Card branded style={{ display: "flex", flexDirection: "column", gap: 24 }} padding={24}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontFamily: "Ubuntu", fontWeight: 500, fontSize: 12, color: "#333", marginBottom: 4 }}>Nivel básico</div>
          <div style={{ fontFamily: "Ubuntu", fontWeight: 700, fontSize: 32, lineHeight: "100%", color: "#333" }}>{USER.levelPoints.toLocaleString("es")}</div>
        </div>
        <Badge variant="gradient" style={{ padding: "5px 12px", fontSize: 10 }}>★★★ {USER.nextLevel}</Badge>
      </div>
      <div>
        <div style={{ fontFamily: "Ubuntu", fontWeight: 500, fontSize: 12, color: "#333", marginBottom: 8 }}>
          Nivel Básico (<span style={{ color: "#C8352B", fontWeight: 700 }}>{USER.levelPoints.toLocaleString("es")}</span>/{USER.levelCap.toLocaleString("es")})
        </div>
        <div style={{ height: 8, borderRadius: 10, background: "#F2F2F2", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: GRADIENT, borderRadius: 10, transition: "width .4s ease" }} />
        </div>
      </div>
    </Card>);

}

function StatCard({ icon, value, label, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: "#F6F6F6", borderRadius: 10,
      padding: "20px 24px", height: 148, boxSizing: "border-box", cursor: onClick ? "pointer" : "default",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      transition: "border-color .15s ease, transform .15s ease", border: "1px solid rgb(232, 232, 232)"
    }}
    onMouseEnter={(e) => onClick && (e.currentTarget.style.borderColor = "#C8352B")}
    onMouseLeave={(e) => onClick && (e.currentTarget.style.borderColor = "#E8E8E8")}>
      <div style={{ color: "#333", opacity: 0.55 }}>{icon}</div>
      <div>
        <div style={{ fontFamily: "Ubuntu", fontWeight: 700, color: "#C8352B", lineHeight: "100%", fontSize: "23px" }}>{value}</div>
        <div style={{ fontFamily: "Ubuntu", fontWeight: 500, fontSize: 13, color: "#666", marginTop: 8 }}>{label}</div>
      </div>
    </div>);

}

Object.assign(window, { DashboardPage });