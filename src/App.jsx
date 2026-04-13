import { useState, useEffect, useRef, useCallback } from "react";

// ─── BRAND TOKENS ───
const R = "#C52126", RL = "#E9544E", RD = "#9B1B1F";
const FLORA_IMG = "data:image/jpeg;base64,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";
const SOLARIS_IMG = "data:image/jpeg;base64,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";

// ─── ICON (Google Material Symbols Rounded) ───
function I({ n, s = 22, c = "#333", w = 400, f = 0, style = {} }) {
  return <span className="material-symbols-rounded" style={{ fontSize: s, color: c, fontVariationSettings: `'FILL' ${f}, 'wght' ${w}, 'GRAD' 0, 'opsz' 24`, lineHeight: 1, verticalAlign: "middle", userSelect: "none", ...style }}>{n}</span>;
}

// ─── PRIMITIVES ───
function Card({ children, onClick, s = {} }) {
  const [hov, setHov] = useState(false);
  return <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: hov && onClick ? "0 2px 8px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)" : "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)", cursor: onClick ? "pointer" : "default", transition: "transform 0.2s, box-shadow 0.2s", transform: hov && onClick ? "translateY(-1px)" : "none", ...s }}>{children}</div>;
}

function Badge({ status }) {
  const m = { em_dia: { bg: "#E8F5E9", c: "#2E7D32", l: "Em dia", i: "check_circle" }, atrasado: { bg: "#FFF3E0", c: "#E65100", l: "Atrasado", i: "warning" }, em_construcao: { bg: "#FFF8E1", c: "#F57F17", l: "Em construção", i: "construction" }, concluido: { bg: "#E8F5E9", c: "#2E7D32", l: "Concluído", i: "verified" }, em_analise: { bg: "#E3F2FD", c: "#1565C0", l: "Em análise", i: "hourglass_top" }, rascunho: { bg: "#F5F5F5", c: "#757575", l: "Rascunho", i: "edit_note" }, aberto: { bg: "#E8EAF6", c: "#283593", l: "Aberto", i: "radio_button_checked" }, pendente: { bg: "#FFF3E0", c: "#E65100", l: "Pendente", i: "pending" }, em_processamento: { bg: "#E3F2FD", c: "#1565C0", l: "Processando", i: "sync" }, first_call: { bg: "#F3E5F5", c: "#6A1B9A", l: "Resolução imediata", i: "bolt" } };
  const v = m[status] || m.em_dia;
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: v.bg, color: v.c }}><I n={v.i} s={12} c={v.c} w={600} f={1} />{v.l}</span>;
}

function PBar({ value, delay = 0, label, color = R }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(value), 200 + delay); return () => clearTimeout(t); }, [value, delay]);
  return <div style={{ marginBottom: 12 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}><span style={{ fontSize: 13, color: "#666" }}>{label}</span><span style={{ fontSize: 13, fontWeight: 600, color: "#222" }}>{value}%</span></div><div style={{ height: 6, background: "#F0F0F0", borderRadius: 3, overflow: "hidden" }}><div style={{ height: "100%", width: `${w}%`, background: color, borderRadius: 3, transition: "width 1.2s cubic-bezier(0.22,1,0.36,1)" }} /></div></div>;
}

function CopyBtn() {
  const [c, setC] = useState(false);
  return <button onClick={() => { setC(true); setTimeout(() => setC(false), 2200); }} style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 20px", background: c ? "#E8F5E9" : R, color: c ? "#2E7D32" : "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.35s", flex: 1, justifyContent: "center" }}><I n={c ? "check_circle" : "content_copy"} s={20} c={c ? "#2E7D32" : "#fff"} w={500} f={c ? 1 : 0} />{c ? "Copiado!" : "Copiar código"}</button>;
}

function ShareBtn() {
  const [open, setOpen] = useState(false);
  return <>
    <button onClick={() => setOpen(true)} style={{ width: 48, height: 48, borderRadius: 12, background: "#F5F5F5", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><I n="ios_share" s={20} c="#666" w={400} /></button>
    {open && <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={() => setOpen(false)}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />
      <div onClick={e => e.stopPropagation()} style={{ position: "relative", width: 390, background: "#F2F2F7", borderRadius: "14px 14px 0 0", paddingBottom: 28, zIndex: 201 }}>
        <div style={{ background: "#fff", borderRadius: "14px 14px 0 0", padding: "14px 16px 12px" }}>
          <div style={{ width: 36, height: 5, borderRadius: 3, background: "#D1D1D6", margin: "0 auto 12px" }} />
          <p style={{ fontSize: 13, fontWeight: 600, color: "#333", margin: "0 0 4px" }}>Boleto Rôgga</p>
          <p style={{ fontSize: 11, color: "#999", margin: 0 }}>Código de barras do boleto</p>
        </div>
        <div style={{ display: "flex", gap: 0, padding: "12px 8px", overflowX: "auto" }}>
          {[{ n: "WhatsApp", i: "chat", bg: "#25D366" },{ n: "Mensagens", i: "sms", bg: "#34C759" },{ n: "E-mail", i: "mail", bg: "#007AFF" },{ n: "Copiar", i: "content_copy", bg: "#8E8E93" }].map((a,i) => (
            <div key={i} onClick={() => setOpen(false)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "0 10px", cursor: "pointer", minWidth: 72 }}>
              <div style={{ width: 50, height: 50, borderRadius: 12, background: a.bg, display: "flex", alignItems: "center", justifyContent: "center" }}><I n={a.i} s={24} c="#fff" w={400} f={1} /></div>
              <span style={{ fontSize: 10, color: "#333" }}>{a.n}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: "0 8px" }}>
          {["Salvar nos Arquivos", "Imprimir"].map((a,i) => (
            <button key={i} onClick={() => setOpen(false)} style={{ width: "100%", padding: "14px 16px", background: "#fff", border: "none", borderTop: i ? "1px solid #E5E5EA" : "none", borderRadius: i === 0 ? "10px 10px 0 0" : "0 0 10px 10px", cursor: "pointer", fontSize: 15, color: "#007AFF", textAlign: "left" }}>{a}</button>
          ))}
        </div>
        <div style={{ padding: "8px 8px 0" }}>
          <button onClick={() => setOpen(false)} style={{ width: "100%", padding: "14px 16px", background: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 16, fontWeight: 600, color: "#007AFF", textAlign: "center" }}>Cancelar</button>
        </div>
      </div>
    </div>}
  </>;
}

function BoletoActions() {
  return <div style={{ display: "flex", gap: 8, alignItems: "stretch" }}><CopyBtn /><ShareBtn /></div>;
}

function TopBar({ title, onBack }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 20px 12px" }}>{onBack && <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><I n="arrow_back" s={22} c="#333" w={500} /></button>}<p style={{ fontSize: 20, fontWeight: 700, color: "#111", margin: 0 }}>{title}</p></div>;
}

function Pill({ label, active, onClick }) {
  return <button onClick={onClick} style={{ padding: "7px 14px", borderRadius: 20, border: "none", fontSize: 12, fontWeight: 600, background: active ? R : "#F0F0F0", color: active ? "#fff" : "#777", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s" }}>{label}</button>;
}

// ─── RÔGGA LOGO SVG (inline) ───
function Logo({ size = 120 }) {
  return <svg width={size} height={size} viewBox="0 0 1634 1634" style={{ display: "block" }}><g transform="translate(-57.375672,-40.629016)"><g transform="matrix(0.653233,0,0,0.653233,-777.692533,-83.385543)"><g transform="matrix(-1.895134,1.876053,1.876053,1.895134,1635.612397,2315.011221)"><rect x="-800.308" y="-329.129" width="663.002" height="663.002" style={{ fill: "rgb(214,45,41)" }} /></g><g transform="matrix(-2.350056,1.260297,1.260297,2.350056,1303.046754,1687.274319)"><rect x="-780.314" y="-196.03" width="663.002" height="663.001" style={{ fill: "rgb(157,25,21)" }} /></g><g transform="matrix(-2.541605,0.807065,0.807065,2.541605,1296.465349,1227.932172)"><rect x="-747.783" y="-115.875" width="663.001" height="663.001" style={{ fill: "rgb(196,23,24)" }} /></g><g transform="matrix(2.666667,0,0,2.666667,2139.114667,1534.283467)"><path d="M0,-32.346C0,-29.929 -0.29,-27.629 -0.868,-25.446C-1.446,-23.26 -2.36,-21.155 -3.604,-19.131C-4.85,-17.105 -6.55,-15.293 -8.708,-13.695C-10.864,-12.097 -13.417,-10.852 -16.363,-9.965L6.208,21.689L-11.049,21.689L-31.989,-7.673L-44.667,-7.673L-44.667,21.689L-57.924,21.689L-57.924,-54.035L-26.095,-54.035C-24.517,-54.035 -23.07,-53.99 -21.755,-53.902C-20.44,-53.814 -18.844,-53.6 -16.968,-53.262C-15.09,-52.924 -13.426,-52.471 -11.969,-51.904C-10.515,-51.334 -9.006,-50.5 -7.445,-49.398C-5.884,-48.297 -4.587,-47.009 -3.551,-45.534C-2.517,-44.06 -1.667,-42.196 -1.001,-39.939C-0.334,-37.684 0,-35.153 0,-32.346M-44.667,-41.725L-44.667,-20.036L-32.461,-20.036C-30.357,-20.036 -28.499,-20.107 -26.884,-20.249C-25.272,-20.39 -23.605,-20.685 -21.887,-21.129C-20.168,-21.573 -18.756,-22.184 -17.651,-22.967C-16.546,-23.749 -15.635,-24.833 -14.916,-26.218C-14.197,-27.604 -13.837,-29.238 -13.837,-31.12C-13.837,-38.189 -19.222,-41.725 -29.989,-41.725L-44.667,-41.725Z" style={{ fill: "white", fillRule: "nonzero" }} /></g><g transform="matrix(2.666667,0,0,2.666667,2304.100267,1594.252)"><path d="M0,-77.322C7.611,-77.322 14.381,-75.813 20.308,-72.793C26.235,-69.773 30.9,-65.376 34.303,-59.604C37.705,-53.831 39.405,-47.125 39.405,-39.486C39.405,-31.741 37.739,-24.877 34.407,-18.891C31.074,-12.904 26.393,-8.259 20.36,-4.956C14.327,-1.651 7.4,0 -0.421,0C-5.577,0 -10.469,-0.807 -15.1,-2.425C-19.729,-4.041 -23.877,-6.402 -27.541,-9.512C-31.207,-12.62 -34.118,-16.661 -36.274,-21.635C-38.433,-26.61 -39.51,-32.221 -39.51,-38.475C-39.51,-46.256 -37.827,-53.103 -34.46,-59.018C-31.093,-64.933 -26.428,-69.462 -20.466,-72.606C-14.503,-75.75 -7.681,-77.322 0,-77.322M25.832,-38.581C25.832,-43.057 25.043,-47.045 23.465,-50.545C21.886,-54.044 19.8,-56.815 17.204,-58.858C14.607,-60.9 11.793,-62.437 8.76,-63.468C5.726,-64.497 2.578,-65.012 -0.683,-65.012C-3.138,-65.012 -5.541,-64.711 -7.893,-64.108C-10.243,-63.503 -12.513,-62.525 -14.704,-61.176C-16.897,-59.826 -18.817,-58.183 -20.466,-56.247C-22.114,-54.31 -23.438,-51.903 -24.437,-49.026C-25.438,-46.149 -25.936,-42.985 -25.936,-39.54C-25.936,-31.333 -23.43,-24.744 -18.414,-19.77C-13.398,-14.795 -7.137,-12.308 0.369,-12.308C3.49,-12.308 6.515,-12.823 9.444,-13.854C12.372,-14.886 15.082,-16.412 17.572,-18.438C20.062,-20.462 22.062,-23.216 23.57,-26.697C25.078,-30.179 25.832,-34.139 25.832,-38.581" style={{ fill: "white", fillRule: "nonzero" }} /></g><g transform="matrix(2.666667,0,0,2.666667,2653.2944,1420.743733)"><path d="M0,53.288C-7.26,61.318 -17.643,65.333 -31.146,65.333C-36.898,65.333 -42.151,64.579 -46.903,63.067C-51.656,61.558 -55.628,59.551 -58.818,57.047C-62.012,54.542 -64.703,51.602 -66.895,48.227C-69.087,44.851 -70.674,41.344 -71.656,37.702C-72.639,34.061 -73.129,30.321 -73.129,26.484C-73.129,22.47 -72.586,18.598 -71.498,14.867C-70.411,11.137 -68.719,7.638 -66.42,4.37C-64.124,1.101 -61.353,-1.75 -58.109,-4.183C-54.864,-6.617 -50.945,-8.535 -46.351,-9.939C-41.755,-11.343 -36.741,-12.045 -31.303,-12.045C-21.378,-12.045 -12.452,-9.806 -4.524,-5.328L-2.683,-4.264L-8.208,6.288L-10.101,5.275C-12.592,3.996 -15.713,2.85 -19.466,1.839C-23.22,0.826 -26.99,0.319 -30.777,0.319C-34.496,0.319 -38.091,0.905 -41.563,2.077C-45.036,3.25 -48.131,4.903 -50.849,7.033C-53.566,9.165 -55.742,11.875 -57.372,15.16C-59.004,18.447 -59.818,22.044 -59.818,25.951C-59.818,31.104 -58.486,35.74 -55.819,39.861C-53.155,43.982 -49.464,47.187 -44.745,49.479C-40.029,51.77 -34.723,52.917 -28.831,52.917C-22.378,52.917 -17.099,51.443 -12.995,48.492L-12.995,33.945L-36.406,33.945L-36.406,22.115L0,22.115L0,53.288Z" style={{ fill: "white", fillRule: "nonzero" }} /></g><g transform="matrix(2.666667,0,0,2.666667,2899.511733,1420.743733)"><path d="M0,53.288C-7.26,61.318 -17.643,65.333 -31.145,65.333C-36.898,65.333 -42.151,64.579 -46.903,63.067C-51.655,61.558 -55.628,59.551 -58.818,57.047C-62.011,54.542 -64.703,51.602 -66.895,48.227C-69.087,44.851 -70.674,41.344 -71.655,37.702C-72.638,34.061 -73.129,30.321 -73.129,26.484C-73.129,22.47 -72.586,18.598 -71.498,14.867C-70.411,11.137 -68.718,7.638 -66.421,4.37C-64.124,1.101 -61.352,-1.75 -58.108,-4.183C-54.864,-6.617 -50.945,-8.535 -46.35,-9.939C-41.755,-11.343 -36.74,-12.045 -31.303,-12.045C-21.377,-12.045 -12.452,-9.806 -4.524,-5.328L-2.683,-4.264L-8.207,6.288L-10.101,5.275C-12.591,3.996 -15.713,2.85 -19.465,1.839C-23.218,0.826 -26.99,0.319 -30.777,0.319C-34.495,0.319 -38.09,0.905 -41.563,2.077C-45.035,3.25 -48.13,4.903 -50.849,7.033C-53.566,9.165 -55.741,11.875 -57.372,15.16C-59.003,18.447 -59.818,22.044 -59.818,25.951C-59.818,31.104 -58.486,35.74 -55.819,39.861C-53.154,43.982 -49.463,47.187 -44.745,49.479C-40.028,51.77 -34.723,52.917 -28.831,52.917C-22.377,52.917 -17.098,51.443 -12.995,48.492L-12.995,33.945L-36.406,33.945L-36.406,22.115L0,22.115L0,53.288Z" style={{ fill: "white", fillRule: "nonzero" }} /></g><g transform="matrix(2.666667,0,0,2.666667,3017.782667,1592.122133)"><path d="M0,-75.725L14.521,-75.725L44.088,0L30.461,0L22.096,-19.824L-8.417,-19.824L-16.783,0L-29.62,0L0,-75.725ZM17.467,-32.134L6.838,-60.217L-3.841,-32.134L17.467,-32.134Z" style={{ fill: "white", fillRule: "nonzero" }} /></g><g transform="matrix(2.666667,0,0,2.666667,2249.302133,1285.0352)"><path d="M0,32.668L-7.188,23.333L22.34,0L50.308,23.439L42.856,32.561L22.126,15.186L0,32.668Z" style={{ fill: "white", fillRule: "nonzero" }} /></g></g></g></svg>;
}

// ═══════════════ LOGIN ═══════════════
function LoginScreen({ onLogin }) {
  const [cpf, setCpf] = useState(""); const [pw, setPw] = useState(""); const [showPw, setShowPw] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: RD }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 56, display: "flex", justifyContent: "center" }}><Logo size={220} /></div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginBottom: 6, display: "block", fontWeight: 500 }}>CPF</label>
          <div style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.12)", borderRadius: 12, padding: "0 14px", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
            <I n="person" s={20} c="rgba(255,255,255,0.5)" w={400} />
            <input value={cpf} onChange={e => setCpf(e.target.value)} placeholder="000.000.000-00" style={{ flex: 1, background: "none", border: "none", padding: "14px 10px", color: "#fff", fontSize: 15, outline: "none" }} />
          </div>
        </div>
        <div style={{ marginBottom: 28 }}>
          <label style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginBottom: 6, display: "block", fontWeight: 500 }}>Senha</label>
          <div style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.12)", borderRadius: 12, padding: "0 14px", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
            <I n="lock" s={20} c="rgba(255,255,255,0.5)" w={400} />
            <input value={pw} onChange={e => setPw(e.target.value)} type={showPw ? "text" : "password"} placeholder="••••••••" style={{ flex: 1, background: "none", border: "none", padding: "14px 10px", color: "#fff", fontSize: 15, outline: "none" }} />
            <button onClick={() => setShowPw(!showPw)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><I n={showPw ? "visibility_off" : "visibility"} s={20} c="rgba(255,255,255,0.5)" w={400} /></button>
          </div>
        </div>
        <button onClick={onLogin} style={{ width: "100%", padding: "15px", background: "#fff", color: R, border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          Entrar <I n="arrow_forward" s={18} c={R} w={600} />
        </button>
        <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Esqueci minha senha</p>
      </div>
    </div>
  );
}

// ═══════════════ EMPREENDIMENTO SELECTOR ═══════════════
function EmpSelector({ onSelect }) {
  const emps = [
    { id: 1, nome: "Residencial Flora", unidade: "Apto 1204 - Torre B", contrato: "CT-2024-00892", status: "em_construcao", img: FLORA_IMG },
    { id: 2, nome: "Edifício Solaris", unidade: "Apto 502 - Torre A", contrato: "CT-2023-00451", status: "concluido", img: SOLARIS_IMG },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#FAFAFA" }}>
      <div style={{ padding: "20px 20px 0" }}><div style={{ width: 48, height: 48, borderRadius: 14, background: R, display: "flex", alignItems: "center", justifyContent: "center" }}><Logo size={36} /></div></div>
      <div style={{ padding: "20px 20px 16px" }}>
        <p style={{ fontSize: 13, color: "#999", margin: 0 }}>Olá, Marina</p>
        <p style={{ fontSize: 20, fontWeight: 700, color: "#111", margin: "2px 0 0" }}>Selecione o empreendimento</p>
      </div>
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
        {emps.map(e => (
          <Card key={e.id} onClick={() => onSelect(e)} s={{ padding: 0, overflow: "hidden" }}>
            <div style={{ width: "100%", height: 130, overflow: "hidden", position: "relative" }}>
              <img src={e.img} alt={e.nome} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", top: 10, right: 10 }}><Badge status={e.status} /></div>
            </div>
            <div style={{ padding: "14px 16px 16px" }}>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#111", margin: "0 0 2px" }}>{e.nome}</p>
              <p style={{ fontSize: 13, color: "#666", margin: "0 0 3px" }}>{e.unidade}</p>
              <p style={{ fontSize: 11, color: "#BBB", margin: "0 0 10px" }}>{e.contrato}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 4, color: R, fontSize: 13, fontWeight: 600 }}>Acessar <I n="chevron_right" s={18} c={R} w={600} /></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ═══════════════ HOME ═══════════════
function HomeScreen({ emp, nav, setEmpStatus, empStatus }) {
  const isB = empStatus === "em_construcao";
  return (
    <div style={{ paddingBottom: 20 }}>
      <div style={{ padding: "16px 20px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div><p style={{ fontSize: 13, color: "#999", margin: 0 }}>Olá, Marina</p><p style={{ fontSize: 20, fontWeight: 700, color: "#111", margin: "2px 0 0" }}>Inicial</p></div>
        <button onClick={() => nav("notificacoes")} style={{ position: "relative", width: 40, height: 40, borderRadius: 12, background: "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer" }}>
          <I n="notifications" s={22} c="#333" w={400} /><span style={{ position: "absolute", top: 6, right: 8, width: 8, height: 8, background: R, borderRadius: "50%", border: "2px solid #F5F5F5" }} />
        </button>
      </div>

      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Empreendimento */}
        <Card onClick={() => nav("meuape")} s={{ padding: 0, overflow: "hidden" }}>
          <div style={{ width: "100%", height: 110, overflow: "hidden", position: "relative" }}>
            <img src={emp.img} alt={emp.nome} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", top: 10, right: 10 }}><Badge status={empStatus} /></div>
          </div>
          <div style={{ padding: "12px 16px 14px" }}>
            <p style={{ fontSize: 11, color: "#999", margin: 0, textTransform: "uppercase", letterSpacing: 1 }}>Empreendimento</p>
            <p style={{ fontSize: 17, fontWeight: 700, color: "#111", margin: "4px 0 0" }}>{emp.nome}</p>
            <p style={{ fontSize: 13, color: "#666", margin: "2px 0 0" }}>{emp.unidade}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 4, color: R, fontSize: 13, fontWeight: 600, marginTop: 8 }}>Ver detalhes <I n="chevron_right" s={18} c={R} w={600} /></div>
          </div>
        </Card>

        {/* Financeiro resumo — apenas informativo */}
        <Card onClick={() => nav("parcelas")}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><div style={{ width: 36, height: 36, borderRadius: 10, background: `${R}10`, display: "flex", alignItems: "center", justifyContent: "center" }}><I n="account_balance_wallet" s={20} c={R} w={500} f={1} /></div><p style={{ fontSize: 15, fontWeight: 700, color: "#111", margin: 0 }}>Financeiro</p><div style={{ marginLeft: "auto" }}><Badge status="em_dia" /></div></div>
          <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
            <div style={{ flex: 1, padding: 12, background: "#FAFAFA", borderRadius: 12 }}><p style={{ fontSize: 11, color: "#999", margin: 0 }}>Títulos abertos</p><p style={{ fontSize: 20, fontWeight: 700, color: "#111", margin: "4px 0 0" }}>3</p></div>
            <div style={{ flex: 1, padding: 12, background: "#FAFAFA", borderRadius: 12 }}><p style={{ fontSize: 11, color: "#999", margin: 0 }}>Próximo vencimento</p><p style={{ fontSize: 15, fontWeight: 700, color: "#111", margin: "4px 0 2px" }}>R$ 1.842</p><p style={{ fontSize: 11, color: "#666", margin: 0 }}>15/05/2026</p></div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 12, background: `${R}08`, borderRadius: 12, color: R, fontSize: 14, fontWeight: 600 }}><I n="credit_card" s={18} c={R} w={500} />Ver parcelas <I n="chevron_right" s={18} c={R} w={500} /></div>
        </Card>

        {/* Obra / Concluído */}
        {isB ? (
          <Card onClick={() => nav("obra")}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}><div style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 36, height: 36, borderRadius: 10, background: `${R}10`, display: "flex", alignItems: "center", justifyContent: "center" }}><I n="engineering" s={20} c={R} w={500} f={1} /></div><p style={{ fontSize: 15, fontWeight: 700, color: "#111", margin: 0 }}>Progresso da Obra</p></div><span style={{ fontSize: 24, fontWeight: 700, color: R }}>68%</span></div>
            <p style={{ fontSize: 12, color: "#888", margin: "0 0 10px" }}>Atualizado: 28/03/2026 · Próxima medição: 15/04/2026</p>
            <PBar label="Serv. preliminares" value={100} delay={0} color="#2E7D32" /><PBar label="Fundações" value={100} delay={50} color="#2E7D32" /><PBar label="Estruturas" value={95} delay={100} /><PBar label="Alvenaria" value={78} delay={150} /><PBar label="Revestimentos" value={42} delay={200} color={RL} /><PBar label="Acabamentos" value={18} delay={250} color={RL} /><PBar label="Áreas comuns" value={10} delay={300} color={RL} />
            <div style={{ display: "flex", alignItems: "center", gap: 4, color: R, fontSize: 13, fontWeight: 600, marginTop: 4 }}><I n="photo_library" s={16} c={R} w={500} />Ver fotos da obra <I n="chevron_right" s={18} c={R} w={600} /></div>
          </Card>
        ) : (
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}><div style={{ width: 36, height: 36, borderRadius: 10, background: "#E8F5E9", display: "flex", alignItems: "center", justifyContent: "center" }}><I n="verified" s={20} c="#2E7D32" w={500} f={1} /></div><p style={{ fontSize: 15, fontWeight: 700, color: "#111", margin: 0 }}>Imóvel Concluído</p></div>
            {[{ l: "Manutenções agendadas", v: "2 pendentes", i: "build", c: "#E65100" },{ l: "Garantias ativas", v: "Até Dez 2030", i: "verified_user", c: "#2E7D32" },{ l: "Eficiência mensal", v: "94%", i: "speed", c: "#1565C0" }].map((x,i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderTop: i ? "1px solid #F5F5F5" : "none" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center" }}><I n={x.i} s={18} c={x.c} w={400} /></div>
                <div style={{ flex: 1 }}><p style={{ fontSize: 13, color: "#888", margin: 0 }}>{x.l}</p><p style={{ fontSize: 15, fontWeight: 600, color: "#222", margin: "1px 0 0" }}>{x.v}</p></div>
              </div>
            ))}
          </Card>
        )}

        {/* Resumo de atendimentos */}
        <Card onClick={() => nav("atendimento")}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><div style={{ width: 36, height: 36, borderRadius: 10, background: `${R}10`, display: "flex", alignItems: "center", justifyContent: "center" }}><I n="support_agent" s={20} c={R} w={500} f={1} /></div><p style={{ fontSize: 15, fontWeight: 700, color: "#111", margin: 0 }}>Atendimentos</p></div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1, padding: 12, background: "#FFF8E1", borderRadius: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}><I n="pending" s={14} c="#F57F17" w={500} f={1} /><span style={{ fontSize: 11, color: "#F57F17", fontWeight: 600 }}>Aguardando</span></div>
              <p style={{ fontSize: 20, fontWeight: 700, color: "#222", margin: 0 }}>1</p>
            </div>
            <div style={{ flex: 1, padding: 12, background: "#E8F5E9", borderRadius: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}><I n="check_circle" s={14} c="#2E7D32" w={500} f={1} /><span style={{ fontSize: 11, color: "#2E7D32", fontWeight: 600 }}>Respondidos</span></div>
              <p style={{ fontSize: 20, fontWeight: 700, color: "#222", margin: 0 }}>2</p>
            </div>
          </div>
        </Card>

        {/* Notificações resumo */}
        <Card onClick={() => nav("notificacoes")}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><div style={{ width: 36, height: 36, borderRadius: 10, background: `${R}10`, display: "flex", alignItems: "center", justifyContent: "center" }}><I n="notifications_active" s={20} c={R} w={500} f={1} /></div><p style={{ fontSize: 15, fontWeight: 700, color: "#111", margin: 0 }}>Notificações</p><span style={{ marginLeft: "auto", background: R, color: "#fff", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>2</span></div>
          {[{ t: "Atualização da obra", d: "Novas fotos — Mar 2026", tm: "2h", i: "photo_camera", dot: true },{ t: "Documento disponível", d: "Extrato IR 2025", tm: "1d", i: "description", dot: true },{ t: "Parcela confirmada", d: "Pagamento Mar processado", tm: "5d", i: "payments", dot: false }].map((n,i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderTop: i ? "1px solid #F0F0F0" : "none", alignItems: "flex-start" }}>
              <div style={{ position: "relative", width: 34, height: 34, borderRadius: 10, background: "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><I n={n.i} s={17} c="#666" w={400} />{n.dot && <span style={{ position: "absolute", top: -2, right: -2, width: 7, height: 7, background: R, borderRadius: "50%", border: "2px solid #fff" }} />}</div>
              <div style={{ flex: 1 }}><p style={{ fontSize: 13, fontWeight: 600, color: "#222", margin: 0 }}>{n.t}</p><p style={{ fontSize: 12, color: "#888", margin: "1px 0 0" }}>{n.d}</p></div>
              <span style={{ fontSize: 11, color: "#BBB", flexShrink: 0, marginTop: 2 }}>{n.tm}</span>
            </div>
          ))}
        </Card>

        {/* Trocar empreendimento */}
        <button onClick={() => nav("selector")} style={{ width: "100%", padding: 14, background: "none", border: "1px dashed #DDD", borderRadius: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "#999" }}>
          <I n="swap_horiz" s={18} c="#999" w={400} /> Trocar empreendimento
        </button>
      </div>
    </div>
  );
}

// ═══════════════ PARCELAS ═══════════════
function ParcelasScreen({ nav }) {
  const [filter, setFilter] = useState("todas");
  const [selected, setSelected] = useState([]);
  const [showAntecip, setShowAntecip] = useState(false);
  const [diaVenc, setDiaVenc] = useState(15);
  const parcelas = [
    { id: "#0042", val: "R$ 1.842,00", orig: "R$ 1.800,00", venc: "15/05/2026", cat: "parcela", st: "pendente" },
    { id: "#0041", val: "R$ 320,00", orig: "R$ 320,00", venc: "10/05/2026", cat: "cartório", st: "pendente" },
    { id: "#0040", val: "R$ 1.842,00", orig: "R$ 1.800,00", venc: "15/04/2026", cat: "parcela", st: "pago" },
    { id: "#0039", val: "R$ 180,00", orig: "R$ 180,00", venc: "01/04/2026", cat: "manutenção", st: "pago" },
    { id: "#0038", val: "R$ 1.842,00", orig: "R$ 1.800,00", venc: "15/03/2026", cat: "parcela", st: "pago" },
    { id: "#0037", val: "R$ 45,00", orig: "R$ 45,00", venc: "10/03/2026", cat: "taxas bancárias", st: "pago" },
  ];
  const catIcons = { parcela: "receipt_long", cartório: "gavel", manutenção: "build", "taxas bancárias": "account_balance" };
  const filtered = filter === "todas" ? parcelas : filter === "abertas" ? parcelas.filter(p => p.st === "pendente") : filter === "pagas" ? parcelas.filter(p => p.st === "pago") : parcelas.filter(p => p.cat === filter);
  const toggleSel = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const pendentes = parcelas.filter(p => p.st === "pendente");
  const selAll = () => setSelected(pendentes.map(p => p.id));
  return (
    <div style={{ paddingBottom: 20, position: "relative" }}>
      <TopBar title="Minhas Parcelas" />
      <div style={{ display: "flex", gap: 10, padding: "0 20px", marginBottom: 16 }}>
        <div style={{ flex: 1, background: R, borderRadius: 14, padding: 14, color: "#fff" }}><div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}><I n="receipt_long" s={16} c="#fff" w={400} style={{ opacity: 0.8 }} /><span style={{ fontSize: 11, opacity: 0.8 }}>Abertas</span></div><p style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>2</p></div>
        <div style={{ flex: 1, background: "#fff", borderRadius: 14, padding: 14, color: "#222", border: `2px solid ${R}` }}><div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}><I n="check_circle" s={16} c={R} w={400} /><span style={{ fontSize: 11, color: "#888" }}>Pagas</span></div><p style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>4</p></div>
      </div>
      <div style={{ display: "flex", gap: 6, padding: "0 20px", overflowX: "auto", marginBottom: 16 }}>
        {["todas", "abertas", "pagas", "parcela", "cartório", "manutenção", "taxas bancárias"].map(f => <Pill key={f} label={f.charAt(0).toUpperCase() + f.slice(1)} active={filter === f} onClick={() => setFilter(f)} />)}
      </div>
      {/* Next payment */}
      <div style={{ padding: "0 20px", marginBottom: 14 }}><Card s={{ border: `2px solid ${R}15` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}><div><p style={{ fontSize: 11, color: "#999", margin: 0, textTransform: "uppercase", letterSpacing: 1 }}>Próximo vencimento</p><p style={{ fontSize: 22, fontWeight: 700, color: "#111", margin: "4px 0 0" }}>R$ 1.842,00</p><p style={{ fontSize: 13, color: "#666", margin: "2px 0 0" }}>15/05/2026</p></div><div style={{ width: 48, height: 48, borderRadius: 14, background: `${R}10`, display: "flex", alignItems: "center", justifyContent: "center" }}><I n="calendar_month" s={26} c={R} w={400} f={1} /></div></div>
        <BoletoActions />
        <button onClick={() => { selAll(); setShowAntecip(true); }} style={{ width: "100%", marginTop: 10, padding: 12, background: "none", border: `1px solid ${R}30`, borderRadius: 12, color: R, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><I n="fast_forward" s={18} c={R} w={500} />Antecipar parcelas</button>
      </Card></div>

      {/* Select controls */}
      {pendentes.length > 0 && <div style={{ padding: "0 20px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={selected.length === pendentes.length ? () => setSelected([]) : selAll} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, color: R, display: "flex", alignItems: "center", gap: 4 }}>
          <I n={selected.length === pendentes.length ? "deselect" : "select_all"} s={16} c={R} w={500} />
          {selected.length === pendentes.length ? "Limpar seleção" : "Selecionar pendentes"}
        </button>
        {selected.length > 0 && <span style={{ fontSize: 12, color: "#888" }}>{selected.length} selecionada{selected.length > 1 ? "s" : ""}</span>}
      </div>}

      {/* List */}
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map((p, i) => {
          const isSel = selected.includes(p.id);
          return (
          <Card key={i} onClick={p.st === "pendente" ? () => toggleSel(p.id) : undefined} s={isSel ? { border: `2px solid ${R}`, background: `${R}04` } : {}}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {p.st === "pendente" && <div style={{ width: 24, height: 24, borderRadius: 6, border: isSel ? `2px solid ${R}` : "2px solid #DDD", background: isSel ? R : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{isSel && <I n="check" s={16} c="#fff" w={700} />}</div>}
                <div style={{ width: 40, height: 40, borderRadius: 12, background: p.st === "pago" ? "#E8F5E9" : `${R}10`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <I n={catIcons[p.cat] || "receipt"} s={20} c={p.st === "pago" ? "#2E7D32" : R} w={400} />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ fontSize: 14, fontWeight: 600, color: "#222" }}>{p.id}</span><span style={{ fontSize: 10, color: "#BBB", background: "#F5F5F5", padding: "2px 6px", borderRadius: 4, textTransform: "capitalize" }}>{p.cat}</span></div>
                  <p style={{ fontSize: 12, color: "#999", margin: "2px 0 0" }}>Venc. {p.venc}</p>
                  {p.orig !== p.val && <p style={{ fontSize: 11, color: "#BBB", margin: "1px 0 0" }}>Orig: {p.orig}</p>}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#222", margin: 0 }}>{p.val}</p>
                <p style={{ fontSize: 11, color: p.st === "pago" ? "#2E7D32" : R, margin: "2px 0 0", fontWeight: 600 }}>{p.st === "pago" ? "Pago" : "Pendente"}</p>
                {p.st === "pendente" && <div style={{ display: "flex", gap: 4, marginTop: 4, justifyContent: "flex-end" }}>
                  <button onClick={e => { e.stopPropagation(); }} style={{ padding: "4px 10px", background: `${R}10`, border: "none", borderRadius: 8, fontSize: 11, color: R, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}><I n="content_copy" s={12} c={R} w={500} />Código</button>
                  <button onClick={e => { e.stopPropagation(); }} style={{ padding: "4px 8px", background: "#F5F5F5", border: "none", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center" }}><I n="ios_share" s={12} c="#888" w={400} /></button>
                </div>}
              </div>
            </div>
          </Card>);
        })}
      </div>

      {/* Floating action for selected */}
      {selected.length > 0 && <div style={{ position: "sticky", bottom: 0, left: 0, right: 0, padding: "12px 20px", background: "linear-gradient(transparent, #FAFAFA 30%)", paddingTop: 20 }}>
        <button onClick={() => setShowAntecip(true)} style={{ width: "100%", padding: 14, background: R, color: "#fff", border: "none", borderRadius: 14, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: `0 4px 16px ${R}44` }}>
          <I n="fast_forward" s={20} c="#fff" w={500} />Antecipar {selected.length} parcela{selected.length > 1 ? "s" : ""}
        </button>
      </div>}

      {/* Antecipation modal */}
      {showAntecip && <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
        <div onClick={() => setShowAntecip(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
        <div style={{ position: "relative", width: 390, background: "#fff", borderRadius: "24px 24px 0 0", padding: "16px 24px 32px", zIndex: 101, maxHeight: "85%", overflowY: "auto" }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: "#DDD", margin: "0 auto 16px" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}><I n="fast_forward" s={24} c={R} w={500} /><p style={{ fontSize: 17, fontWeight: 700, color: "#111", margin: 0 }}>Antecipar Parcelas</p></div>
          <p style={{ fontSize: 13, color: "#888", margin: "0 0 16px" }}>{selected.length} parcela{selected.length > 1 ? "s" : ""} selecionada{selected.length > 1 ? "s" : ""}. Escolha o dia do mês para o novo vencimento:</p>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <button onClick={() => setDiaVenc(d => Math.max(1, d - 1))} style={{ width: 40, height: 40, borderRadius: 10, background: "#F5F5F5", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><I n="remove" s={20} c="#666" w={500} /></button>
            <div style={{ flex: 1, textAlign: "center", padding: 12, background: `${R}08`, borderRadius: 12, border: `2px solid ${R}20` }}>
              <p style={{ fontSize: 11, color: "#999", margin: "0 0 2px" }}>Dia do vencimento</p>
              <p style={{ fontSize: 28, fontWeight: 700, color: "#111", margin: 0 }}>{diaVenc}</p>
            </div>
            <button onClick={() => setDiaVenc(d => Math.min(31, d + 1))} style={{ width: 40, height: 40, borderRadius: 10, background: "#F5F5F5", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><I n="add" s={20} c="#666" w={500} /></button>
          </div>
          {/* Total consolidado */}
          {(() => { const total = selected.reduce((s, id) => { const p = parcelas.find(x => x.id === id); return s + (p ? parseFloat(p.val.replace("R$ ", "").replace(".", "").replace(",", ".")) : 0); }, 0); return (
            <div style={{ background: `${R}08`, borderRadius: 12, padding: 14, marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div><p style={{ fontSize: 11, color: "#888", margin: "0 0 2px" }}>Total consolidado</p><p style={{ fontSize: 22, fontWeight: 700, color: "#111", margin: 0 }}>R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p></div>
              <div style={{ display: "flex", gap: 6 }}>
                <CopyBtn />
                <ShareBtn />
              </div>
            </div>
          ); })()}
          <div style={{ background: "#FAFAFA", borderRadius: 12, padding: 12, marginBottom: 16 }}>
            <p style={{ fontSize: 12, color: "#888", margin: "0 0 8px" }}>Detalhamento:</p>
            {selected.map((id, i) => { const p = parcelas.find(x => x.id === id); return p ? <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderTop: i ? "1px solid #F0F0F0" : "none" }}><span style={{ fontSize: 13, color: "#333" }}>{p.id} · {p.val}</span><span style={{ fontSize: 13, fontWeight: 600, color: R }}>{String(diaVenc).padStart(2,"0")}/{p.venc.slice(3)}</span></div> : null; })}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setShowAntecip(false)} style={{ flex: 1, padding: 14, background: "#F5F5F5", color: "#666", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Cancelar</button>
            <button onClick={() => { setShowAntecip(false); setSelected([]); }} style={{ flex: 1, padding: 14, background: R, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><I n="check" s={18} c="#fff" w={600} />Confirmar</button>
          </div>
        </div>
      </div>}
    </div>
  );
}

// ═══════════════ IR ═══════════════
function IRScreen({ emp }) {
  const [ano, setAno] = useState("2025");
  const pags = [
    { data: "15/12/2025", parcela: "#0036", valor: "R$ 1.842,00" },
    { data: "15/11/2025", parcela: "#0035", valor: "R$ 1.842,00" },
    { data: "15/10/2025", parcela: "#0034", valor: "R$ 1.842,00" },
    { data: "15/09/2025", parcela: "#0033", valor: "R$ 1.842,00" },
    { data: "15/08/2025", parcela: "#0032", valor: "R$ 1.842,00" },
  ];
  return (
    <div style={{ paddingBottom: 20 }}>
      <TopBar title="Imposto de Renda" />
      <div style={{ padding: "0 20px" }}>
        <Card s={{ marginBottom: 14, background: `linear-gradient(135deg, ${RD}, ${R})`, color: "#fff" }}>
          <p style={{ fontSize: 12, opacity: 0.7, margin: "0 0 8px" }}>Empresa</p>
          <p style={{ fontSize: 14, fontWeight: 700, margin: "0 0 2px" }}>RÔGGA S.A. CONSTRUTORA E INCORPORADORA</p>
          <p style={{ fontSize: 12, opacity: 0.7, margin: "0 0 12px" }}>CNPJ: 08.486.781/0001-88</p>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: 10 }}><p style={{ fontSize: 10, opacity: 0.7, margin: 0 }}>Empreendimento</p><p style={{ fontSize: 13, fontWeight: 600, margin: "2px 0 0" }}>{emp.nome}</p></div>
            <div style={{ flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: 10 }}><p style={{ fontSize: 10, opacity: 0.7, margin: 0 }}>Unidade</p><p style={{ fontSize: 13, fontWeight: 600, margin: "2px 0 0" }}>{emp.unidade}</p></div>
          </div>
        </Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 6 }}>{["2025", "2024", "2023"].map(a => <Pill key={a} label={a} active={ano === a} onClick={() => setAno(a)} />)}</div>
          <Card s={{ padding: "8px 12px" }}><p style={{ fontSize: 11, color: "#999", margin: 0 }}>Total pago</p><p style={{ fontSize: 16, fontWeight: 700, color: "#111", margin: "1px 0 0" }}>R$ 9.210,00</p></Card>
        </div>
        {/* Grid */}
        <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "10px 14px", background: "#F8F8F8", fontSize: 11, fontWeight: 600, color: "#999" }}><span>Data</span><span>Parcela</span><span style={{ textAlign: "right" }}>Valor</span></div>
          {pags.map((p, i) => (<div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "12px 14px", borderTop: "1px solid #F5F5F5", fontSize: 13 }}><span style={{ color: "#555" }}>{p.data}</span><span style={{ color: "#888" }}>{p.parcela}</span><span style={{ textAlign: "right", fontWeight: 600, color: "#222" }}>{p.valor}</span></div>))}
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <button style={{ flex: 1, padding: 13, background: R, color: "#fff", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><I n="picture_as_pdf" s={18} c="#fff" w={500} />Exportar PDF</button>
          <button style={{ flex: 1, padding: 13, background: "#25D366", color: "#fff", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><I n="share" s={18} c="#fff" w={500} />WhatsApp</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════ DOCUMENTOS ═══════════════
function DocsScreen() {
  const docs = [
    { cat: "Plantas", i: "grid_on", items: ["Planta baixa - Apto 1204", "Planta de situação"] },
    { cat: "Manuais", i: "menu_book", items: ["Manual do proprietário", "Manual áreas comuns"] },
    { cat: "Arquivos da unidade", i: "folder_special", items: ["Contrato de compra e venda", "Aditivo contratual", "Memorial descritivo"] },
  ];
  return <div style={{ paddingBottom: 20 }}><TopBar title="Documentos" /><div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 20 }}>{docs.map((d, i) => (<div key={i}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><I n={d.i} s={16} c="#999" w={400} /><p style={{ fontSize: 12, fontWeight: 600, color: "#999", margin: 0, textTransform: "uppercase", letterSpacing: 1 }}>{d.cat}</p></div><div style={{ display: "flex", flexDirection: "column", gap: 6 }}>{d.items.map((it, j) => (<Card key={j} onClick={() => {}}><div style={{ display: "flex", alignItems: "center", gap: 12 }}><div style={{ width: 36, height: 36, borderRadius: 10, background: `${R}08`, display: "flex", alignItems: "center", justifyContent: "center" }}><I n="description" s={18} c={R} w={400} /></div><span style={{ fontSize: 14, fontWeight: 500, color: "#333", flex: 1 }}>{it}</span><I n="download" s={20} c="#BBB" w={400} /></div></Card>))}</div></div>))}</div></div>;
}

// ═══════════════ PROCURAÇÕES ═══════════════
function ProcScreen() {
  const items = [{ l: "Vistoria", i: "search" }, { l: "Recebimento de posse", i: "key" }, { l: "Assembleia de condomínio", i: "groups" }, { l: "Negociação", i: "handshake" }];
  return <div style={{ paddingBottom: 20 }}><TopBar title="Procurações" /><div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 8 }}>{items.map((p, i) => (<Card key={i} onClick={() => {}}><div style={{ display: "flex", alignItems: "center", gap: 14 }}><div style={{ width: 40, height: 40, borderRadius: 12, background: `${R}08`, display: "flex", alignItems: "center", justifyContent: "center" }}><I n={p.i} s={20} c={R} w={400} /></div><span style={{ fontSize: 15, fontWeight: 500, color: "#222", flex: 1 }}>{p.l}</span><button style={{ padding: "6px 12px", background: `${R}10`, border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, color: R, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}><I n="download" s={14} c={R} w={500} />Modelo</button></div></Card>))}</div></div>;
}

// ═══════════════ PATRIMÔNIO DE AFETAÇÃO ═══════════════
function PatrimScreen() {
  const docs = [{ data: "28/03/2026", tipo: "Ata", emp: "Residencial Flora" }, { data: "15/01/2026", tipo: "Balanço", emp: "Residencial Flora" }, { data: "20/09/2025", tipo: "Ata", emp: "Residencial Flora" }];
  return <div style={{ paddingBottom: 20 }}><TopBar title="Patrimônio de Afetação" /><div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 8 }}>{docs.map((d, i) => (<Card key={i} onClick={() => {}}><div style={{ display: "flex", alignItems: "center", gap: 12 }}><div style={{ width: 40, height: 40, borderRadius: 12, background: `${R}08`, display: "flex", alignItems: "center", justifyContent: "center" }}><I n="shield" s={20} c={R} w={400} /></div><div style={{ flex: 1 }}><div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ fontSize: 14, fontWeight: 600, color: "#222" }}>{d.tipo}</span><span style={{ fontSize: 10, color: "#BBB", background: "#F5F5F5", padding: "2px 6px", borderRadius: 4 }}>{d.data}</span></div><p style={{ fontSize: 12, color: "#888", margin: "2px 0 0" }}>{d.emp}</p></div><I n="download" s={20} c="#BBB" w={400} /></div></Card>))}</div></div>;
}

// ═══════════════ NOTIFICAÇÕES ═══════════════
function NotifsScreen() {
  const [expanded, setExpanded] = useState(null);
  const ns = [{ t: "Atualização da obra", d: "28/03/2026", body: "Novas fotos do mês de março foram adicionadas à galeria. O progresso geral passou de 65% para 68%.", i: "photo_camera" }, { t: "Documento disponível", d: "25/03/2026", body: "Seu extrato anual para declaração de IR 2025 já está disponível na seção Documentos.", i: "description" }, { t: "Parcela confirmada", d: "20/03/2026", body: "O pagamento da parcela #0038 no valor de R$ 1.842,00 foi processado com sucesso.", i: "payments" }, { t: "Lembrete de vencimento", d: "12/03/2026", body: "Sua parcela #0039 vence em 3 dias. Acesse Minhas Parcelas para gerar o código de barras.", i: "event" }];
  return <div style={{ paddingBottom: 20 }}><TopBar title="Notificações" /><div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 8 }}>{ns.map((n, i) => (<Card key={i} onClick={() => setExpanded(expanded === i ? null : i)}><div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}><div style={{ width: 36, height: 36, borderRadius: 10, background: i < 2 ? `${R}10` : "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><I n={n.i} s={18} c={i < 2 ? R : "#888"} w={400} /></div><div style={{ flex: 1 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><p style={{ fontSize: 14, fontWeight: 600, color: "#222", margin: 0 }}>{n.t}</p><span style={{ fontSize: 11, color: "#BBB" }}>{n.d}</span></div>{expanded === i && <p style={{ fontSize: 13, color: "#666", margin: "8px 0 0", lineHeight: 1.5 }}>{n.body}</p>}</div><I n={expanded === i ? "expand_less" : "expand_more"} s={20} c="#CCC" w={400} /></div></Card>))}</div></div>;
}

// ═══════════════ TROCA DE TITULARIDADE ═══════════════
function TrocaTitScreen() {
  return <div style={{ paddingBottom: 20 }}><TopBar title="Troca de Titularidade" /><div style={{ padding: "0 20px", textAlign: "center" }}><div style={{ width: 80, height: 80, borderRadius: "50%", background: `${R}10`, display: "flex", alignItems: "center", justifyContent: "center", margin: "20px auto 16px" }}><I n="swap_horiz" s={40} c={R} w={400} /></div><p style={{ fontSize: 16, fontWeight: 600, color: "#222", margin: "0 0 8px" }}>Transferência de titularidade</p><p style={{ fontSize: 14, color: "#888", margin: "0 0 24px", lineHeight: 1.5 }}>Para solicitar a troca de titularidade do seu imóvel, você será redirecionado para o formulário externo.</p><button onClick={() => {}} style={{ width: "100%", padding: 15, background: R, color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><I n="open_in_new" s={18} c="#fff" w={500} />Abrir formulário</button></div></div>;
}

// ═══════════════ ATENDIMENTO ═══════════════
function AtendScreen() {
  const [step, setStep] = useState(0); const [filter, setFilter] = useState("todos");
  const chamados = [
    { id: "#1042", title: "2ª via de boleto", status: "concluido", date: "02/04/2026" },
    { id: "#1038", title: "Vistoria do imóvel", status: "em_analise", date: "28/03/2026" },
    { id: "#1035", title: "Atualização cadastral", status: "concluido", date: "15/03/2026" },
    { id: "#1030", title: "Dúvida escritura", status: "rascunho", date: "10/03/2026" },
  ];
  const filteredC = filter === "todos" ? chamados : chamados.filter(c => c.status === filter);
  const setores = [{ l: "Escritura", i: "gavel" }, { l: "Financeiro", i: "payments" }, { l: "Financiamento bancário", i: "account_balance" }, { l: "Relacionamento", i: "support_agent" }];
  const tipos = [{ l: "Dúvida / Solicitação", i: "help" }, { l: "Reclamação", i: "report" }];

  if (step === 0) return (
    <div style={{ paddingBottom: 20 }}><TopBar title="Atendimento" />
      <div style={{ padding: "0 20px" }}>
        <Card onClick={() => setStep(1)} s={{ marginBottom: 14, border: `2px solid ${R}15` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}><div style={{ width: 48, height: 48, borderRadius: 14, background: `${R}10`, display: "flex", alignItems: "center", justifyContent: "center" }}><I n="add_circle" s={28} c={R} w={400} f={1} /></div><div><p style={{ fontSize: 15, fontWeight: 700, color: "#111", margin: 0 }}>Novo chamado</p><p style={{ fontSize: 13, color: "#888", margin: "2px 0 0" }}>Abra uma solicitação em poucos passos</p></div></div>
        </Card>
        <div style={{ display: "flex", gap: 6, marginBottom: 12, overflowX: "auto" }}>
          {["todos", "rascunho", "em_analise", "concluido"].map(f => <Pill key={f} label={f === "todos" ? "Todos" : f === "em_analise" ? "Em análise" : f.charAt(0).toUpperCase() + f.slice(1)} active={filter === f} onClick={() => setFilter(f)} />)}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filteredC.map((c, i) => (<Card key={i} onClick={() => {}}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}><div><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}><span style={{ fontSize: 12, color: "#BBB" }}>{c.id}</span><Badge status={c.status} /></div><p style={{ fontSize: 14, fontWeight: 600, color: "#222", margin: 0 }}>{c.title}</p><p style={{ fontSize: 12, color: "#999", margin: "4px 0 0" }}>{c.date}</p></div><I n="chevron_right" s={18} c="#CCC" w={400} /></div></Card>))}
        </div>
      </div>
    </div>
  );

  // Step flow
  return (
    <div style={{ paddingBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 20px 12px" }}><button onClick={() => setStep(s => Math.max(0, s - 1))} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><I n="arrow_back" s={22} c="#333" w={500} /></button><p style={{ fontSize: 20, fontWeight: 700, color: "#111", margin: 0 }}>Novo Chamado</p></div>
      <div style={{ display: "flex", gap: 5, padding: "0 20px", marginBottom: 20 }}>{[1,2,3,4,5].map(s => <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: s <= step ? R : "#E5E5E5", transition: "background 0.3s" }} />)}</div>
      <div style={{ padding: "0 20px" }}>
        {step === 1 && <><p style={{ fontSize: 16, fontWeight: 600, color: "#222", margin: "0 0 14px" }}>Escolha o setor</p><div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{setores.map((s, i) => <Card key={i} onClick={() => setStep(2)}><div style={{ display: "flex", alignItems: "center", gap: 14 }}><div style={{ width: 40, height: 40, borderRadius: 12, background: "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center" }}><I n={s.i} s={20} c="#555" w={400} /></div><span style={{ fontSize: 15, fontWeight: 500, color: "#333", flex: 1 }}>{s.l}</span><I n="chevron_right" s={18} c="#CCC" w={400} /></div></Card>)}</div></>}
        {step === 2 && <><p style={{ fontSize: 16, fontWeight: 600, color: "#222", margin: "0 0 14px" }}>Tipo de ocorrência</p><div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{tipos.map((t, i) => <Card key={i} onClick={() => setStep(3)}><div style={{ display: "flex", alignItems: "center", gap: 14 }}><div style={{ width: 40, height: 40, borderRadius: 12, background: "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center" }}><I n={t.i} s={20} c="#555" w={400} /></div><span style={{ fontSize: 15, fontWeight: 500, color: "#333", flex: 1 }}>{t.l}</span><I n="chevron_right" s={18} c="#CCC" w={400} /></div></Card>)}</div></>}
        {step === 3 && <><p style={{ fontSize: 16, fontWeight: 600, color: "#222", margin: "0 0 14px" }}>Causa</p><div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{[{ l: "Informações do imóvel", i: "info" }, { l: "Processo de escritura", i: "description" }, { l: "Outras", i: "more_horiz" }].map((c, i) => <Card key={i} onClick={() => setStep(4)}><div style={{ display: "flex", alignItems: "center", gap: 14 }}><div style={{ width: 40, height: 40, borderRadius: 12, background: "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center" }}><I n={c.i} s={20} c="#555" w={400} /></div><span style={{ fontSize: 15, fontWeight: 500, color: "#333", flex: 1 }}>{c.l}</span><I n="chevron_right" s={18} c="#CCC" w={400} /></div></Card>)}</div></>}
        {step === 4 && <><p style={{ fontSize: 16, fontWeight: 600, color: "#222", margin: "0 0 14px" }}>Descreva sua solicitação</p><div style={{ background: "#fff", borderRadius: 14, border: "1px solid #E5E5E5", padding: 16, minHeight: 120, marginBottom: 14, fontSize: 14, color: "#BBB" }}>Toque para descrever...</div><div style={{ display: "flex", gap: 8, marginBottom: 14 }}><button style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 12, background: "#F5F5F5", border: "none", borderRadius: 12, cursor: "pointer", fontSize: 13, color: "#666" }}><I n="attach_file" s={18} c="#666" w={400} />Anexar</button><button style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 12, background: "#F5F5F5", border: "none", borderRadius: 12, cursor: "pointer", fontSize: 13, color: "#666" }}><I n="photo_camera" s={18} c="#666" w={400} />Foto</button><button style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 12, background: "#F5F5F5", border: "none", borderRadius: 12, cursor: "pointer", fontSize: 13, color: "#666" }}><I n="videocam" s={18} c="#666" w={400} />Vídeo</button></div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setStep(0)} style={{ flex: 1, padding: 14, background: "#F5F5F5", color: "#666", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><I n="save" s={18} c="#666" w={500} />Rascunho</button>
            <button onClick={() => setStep(5)} style={{ flex: 1, padding: 14, background: R, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><I n="send" s={18} c="#fff" w={500} />Enviar</button>
          </div></>}
        {step === 5 && <div style={{ textAlign: "center", padding: "30px 0" }}><div style={{ width: 72, height: 72, borderRadius: "50%", background: "#E8F5E9", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><I n="task_alt" s={40} c="#2E7D32" w={400} f={1} /></div><p style={{ fontSize: 18, fontWeight: 700, color: "#111", margin: "0 0 6px" }}>Chamado enviado!</p><p style={{ fontSize: 14, color: "#888", margin: "0 0 24px" }}>Protocolo #1043</p><button onClick={() => setStep(0)} style={{ padding: "12px 32px", background: R, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}><I n="home" s={18} c="#fff" w={500} />Voltar</button></div>}
      </div>
    </div>
  );
}

// ═══════════════ PERFIL ═══════════════
function PerfilScreen() {
  return <div style={{ paddingBottom: 20 }}><TopBar title="Perfil" /><div style={{ padding: "0 20px" }}>
    <div style={{ textAlign: "center", marginBottom: 20 }}><div style={{ width: 80, height: 80, borderRadius: "50%", background: `${R}10`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}><I n="person" s={40} c={R} w={400} /></div><p style={{ fontSize: 18, fontWeight: 700, color: "#111", margin: "0 0 2px" }}>Marina Silva</p></div>
    {[{ l: "CPF", v: "123.456.789-00", i: "badge", readonly: true }, { l: "E-mail", v: "marina@email.com", i: "mail" }, { l: "Telefone", v: "(47) 99999-0000", i: "phone" }].map((f, i) => (
      <Card key={i} s={{ marginBottom: 8 }}><div style={{ display: "flex", alignItems: "center", gap: 12 }}><div style={{ width: 36, height: 36, borderRadius: 10, background: "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center" }}><I n={f.i} s={18} c="#666" w={400} /></div><div style={{ flex: 1 }}><p style={{ fontSize: 11, color: "#999", margin: 0 }}>{f.l}</p><p style={{ fontSize: 14, fontWeight: 500, color: "#222", margin: "2px 0 0" }}>{f.v}</p></div>{!f.readonly && <I n="edit" s={18} c="#CCC" w={400} />}{f.readonly && <I n="lock" s={16} c="#DDD" w={300} />}</div></Card>
    ))}
    <button style={{ width: "100%", marginTop: 12, padding: 14, background: R, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><I n="edit" s={18} c="#fff" w={500} />Editar dados</button>
    <button style={{ width: "100%", marginTop: 8, padding: 14, background: "none", border: `1px solid #E5E5E5`, borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "#666" }}><I n="lock_reset" s={18} c="#666" w={500} />Alterar senha</button>
    <button style={{ width: "100%", marginTop: 8, padding: 14, background: "none", border: `1px solid #E5E5E5`, borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "#999" }}><I n="logout" s={18} c="#999" w={400} />Sair da conta</button>
  </div></div>;
}

// ═══════════════ MEU APÊ ═══════════════
function MeuApeScreen({ emp, empStatus }) {
  const isB = empStatus === "em_construcao";
  const fotosObra = ["Mar 2026", "Fev 2026", "Jan 2026", "Dez 2025", "Nov 2025", "Out 2025"];
  const fotosPronte = ["Entrega", "Vistoria", "Acabamento", "Áreas comuns", "Fachada", "Paisagismo"];
  const fotos = isB ? fotosObra : fotosPronte;
  return <div style={{ paddingBottom: 20 }}><TopBar title="Meu Apê" /><div style={{ padding: "0 20px" }}>
    <Card s={{ marginBottom: 14 }}><div style={{ display: "flex", gap: 12, alignItems: "center" }}><div style={{ width: 48, height: 48, borderRadius: 14, background: `${R}10`, display: "flex", alignItems: "center", justifyContent: "center" }}><I n="apartment" s={26} c={R} w={400} /></div><div><p style={{ fontSize: 17, fontWeight: 700, color: "#111", margin: 0 }}>{emp.nome}</p><p style={{ fontSize: 13, color: "#666", margin: "2px 0 0" }}>{emp.unidade}</p><p style={{ fontSize: 12, color: "#BBB", margin: "2px 0 0" }}>{emp.contrato}</p></div></div></Card>
    {[{ l: "Informações do imóvel", i: "info" }, { l: "Planta baixa", i: "grid_on" }, { l: "Manual do proprietário", i: "menu_book" }, { l: "Garantias", i: "verified_user" }, { l: "Manutenções", i: "build" }].map((it, i) => (
      <Card key={i} onClick={() => {}} s={{ marginBottom: 6 }}><div style={{ display: "flex", alignItems: "center", gap: 14 }}><div style={{ width: 40, height: 40, borderRadius: 12, background: "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center" }}><I n={it.i} s={20} c="#444" w={400} /></div><span style={{ fontSize: 15, fontWeight: 500, color: "#222", flex: 1 }}>{it.l}</span><I n="chevron_right" s={18} c="#CCC" w={400} /></div></Card>
    ))}
    <Card s={{ marginTop: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <I n="photo_library" s={20} c={R} w={500} f={1} />
        <p style={{ fontSize: 15, fontWeight: 700, color: "#111", margin: 0 }}>Fotos do Imóvel</p>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "#999" }}>{isB ? "Acompanhamento da obra" : "Registro do imóvel"}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {fotos.map((m, i) => (
          <div key={i} style={{ height: 80, borderRadius: 12, background: `linear-gradient(135deg, ${R}15, ${R}08)`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 4, cursor: "pointer", transition: "transform 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
            <I n={isB ? "construction" : "image"} s={22} c={R} w={300} />
            <span style={{ fontSize: 10, color: R, fontWeight: 600, textAlign: "center", lineHeight: 1.2 }}>{m}</span>
          </div>
        ))}
      </div>
    </Card>
  </div></div>;
}

// ═══════════════ OBRA (detail from home) ═══════════════
function ObraScreen() {
  return <div style={{ paddingBottom: 20 }}><TopBar title="Progresso da Obra" /><div style={{ padding: "0 20px" }}>
    <Card s={{ marginBottom: 14 }}>
      <div style={{ textAlign: "center", marginBottom: 16 }}><div style={{ position: "relative", width: 110, height: 110, margin: "0 auto" }}><svg width="110" height="110" viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" fill="none" stroke="#F0F0F0" strokeWidth="8" /><circle cx="60" cy="60" r="52" fill="none" stroke={R} strokeWidth="8" strokeDasharray={`${2*Math.PI*52*0.68} ${2*Math.PI*52*0.32}`} strokeDashoffset={2*Math.PI*52*0.25} strokeLinecap="round" /></svg><div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}><span style={{ fontSize: 26, fontWeight: 700, color: "#111" }}>68%</span></div></div><p style={{ fontSize: 13, color: "#888", marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}><I n="event" s={14} c="#888" w={400} />Previsão: <strong style={{ color: "#333" }}>Dez 2026</strong></p></div>
      {[{ n: "Serv. preliminares", v: 100, i: "checklist" },{ n: "Fundações", v: 100, i: "foundation" },{ n: "Estruturas", v: 95, i: "apartment" },{ n: "Alvenaria", v: 78, i: "wall_art" },{ n: "Revestimentos", v: 42, i: "format_paint" },{ n: "Acabamentos", v: 18, i: "brush" },{ n: "Áreas comuns", v: 10, i: "park" }].map((s,i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}><I n={s.i} s={16} c={s.v === 100 ? "#2E7D32" : R} w={400} /><div style={{ flex: 1 }}><PBar label={s.n} value={s.v} delay={i*60} color={s.v === 100 ? "#2E7D32" : R} /></div></div>)}
    </Card>
    <Card><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}><I n="photo_library" s={20} c={R} w={500} f={1} /><p style={{ fontSize: 15, fontWeight: 700, color: "#111", margin: 0 }}>Galeria de Fotos</p></div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>{["Mar 2026", "Fev 2026", "Jan 2026", "Dez 2025", "Nov 2025", "Out 2025"].map((m, i) => <div key={i} style={{ height: 90, borderRadius: 12, background: `linear-gradient(135deg, ${R}15, ${R}08)`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 4, cursor: "pointer" }}><I n="image" s={26} c={R} w={300} /><span style={{ fontSize: 11, color: R, fontWeight: 600 }}>{m}</span></div>)}</div></Card>
  </div></div>;
}

// ═══════════════ MAIN APP ═══════════════
export default function App() {
  const [view, setView] = useState("login");
  const [emp, setEmp] = useState(null);
  const [empStatus, setEmpStatus] = useState("em_construcao");
  const [activeTab, setActiveTab] = useState("home");
  const scrollRef = useRef(null);

  const nav = useCallback((v) => { setView(v); if (scrollRef.current) scrollRef.current.scrollTop = 0; }, []);
  const tabNav = useCallback((t) => { setActiveTab(t); setView(t); if (scrollRef.current) scrollRef.current.scrollTop = 0; }, []);

  const menuItems = [
    { id: "home", l: "Inicial", i: "home" },
    { id: "meuape", l: "Meu Apê", i: "apartment" },
    { id: "atendimento", l: "Atendimento", i: "support_agent" },
    { id: "parcelas", l: "Minhas Parcelas", i: "credit_card" },
    { id: "ir", l: "IR", i: "request_quote" },
    { id: "documentos", l: "Documentos", i: "folder_open" },
    { id: "procuracoes", l: "Procurações", i: "gavel" },
    { id: "notificacoes", l: "Notificações", i: "notifications" },
    { id: "troca", l: "Troca de Titularidade", i: "swap_horiz" },
    { id: "patrimonio", l: "Patrimônio de Afetação", i: "shield" },
    { id: "perfil", l: "Perfil", i: "person" },
  ];

  const tabs = [
    { id: "home", l: "Inicial", i: "home" },
    { id: "parcelas", l: "Parcelas", i: "credit_card" },
    { id: "atendimento", l: "Atendimento", i: "support_agent" },
    { id: "menu", l: "Menu", i: "menu" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  const renderContent = () => {
    if (view === "login") return <LoginScreen onLogin={() => nav("selector")} />;
    if (view === "selector") return <EmpSelector onSelect={(e) => { setEmp(e); setEmpStatus(e.status); nav("home"); }} />;
    if (view === "obra") return <ObraScreen />;
    if (view === "meuape") return <MeuApeScreen emp={emp} empStatus={empStatus} />;
    if (view === "parcelas") return <ParcelasScreen nav={nav} />;
    if (view === "ir") return <IRScreen emp={emp} />;
    if (view === "documentos") return <DocsScreen />;
    if (view === "procuracoes") return <ProcScreen />;
    if (view === "patrimonio") return <PatrimScreen />;
    if (view === "notificacoes") return <NotifsScreen />;
    if (view === "troca") return <TrocaTitScreen />;
    if (view === "atendimento") return <AtendScreen />;
    if (view === "perfil") return <PerfilScreen />;
    return <HomeScreen emp={emp} nav={nav} setEmpStatus={setEmpStatus} empStatus={empStatus} />;
  };

  const showChrome = !["login", "selector"].includes(view);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#1A1A1A", padding: 20, fontFamily: "'DM Sans', sans-serif" }}>

      <div style={{ width: 390, height: 844, background: "#FAFAFA", borderRadius: 44, overflow: "hidden", boxShadow: "0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", position: "relative" }}>
        {/* Status bar */}
        {showChrome && <div style={{ height: 50, padding: "0 28px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingBottom: 6, flexShrink: 0 }}><span style={{ fontSize: 15, fontWeight: 600, color: "#111" }}>9:41</span><div style={{ display: "flex", gap: 5, alignItems: "center" }}><I n="signal_cellular_alt" s={14} c="#111" w={600} f={1} /><I n="wifi" s={14} c="#111" w={600} f={1} /><I n="battery_full" s={14} c="#111" w={600} f={1} /></div></div>}

        {/* Empreendimento context bar */}
        {showChrome && emp && <div style={{ padding: "4px 20px 6px", display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <I n="apartment" s={14} c={R} w={500} f={1} />
          <span style={{ fontSize: 11, fontWeight: 600, color: R }}>{emp.nome}</span>
          <span style={{ fontSize: 11, color: "#CCC" }}>·</span>
          <span style={{ fontSize: 11, color: "#999" }}>{emp.unidade}</span>
        </div>}

        {/* Content */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>{renderContent()}</div>

        {/* Menu overlay */}
        {menuOpen && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, top: 0, zIndex: 50 }}>
          <div onClick={() => setMenuOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#fff", borderRadius: "24px 24px 0 0", padding: "12px 20px 30px", maxHeight: "70%", overflowY: "auto", zIndex: 51 }}>
            <div style={{ width: 40, height: 4, borderRadius: 2, background: "#DDD", margin: "0 auto 16px" }} />
            <p style={{ fontSize: 16, fontWeight: 700, color: "#111", margin: "0 0 14px" }}>Menu</p>
            {menuItems.map((m, i) => (
              <button key={i} onClick={() => { setMenuOpen(false); nav(m.id); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "12px 0", background: "none", border: "none", borderBottom: i < menuItems.length - 1 ? "1px solid #F5F5F5" : "none", cursor: "pointer" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: view === m.id ? `${R}10` : "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center" }}><I n={m.i} s={20} c={view === m.id ? R : "#666"} w={view === m.id ? 600 : 400} f={view === m.id ? 1 : 0} /></div>
                <span style={{ fontSize: 15, fontWeight: view === m.id ? 600 : 500, color: view === m.id ? R : "#333" }}>{m.l}</span>
              </button>
            ))}
          </div>
        </div>}

        {/* Tab bar */}
        {showChrome && <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", height: 76, paddingBottom: 18, background: "#fff", flexShrink: 0, borderTop: "1px solid #F0F0F0" }}>
          {tabs.map(t => {
            const isActive = t.id === "menu" ? menuOpen : view === t.id && !menuOpen;
            return <button key={t.id} onClick={() => { if (t.id === "menu") { setMenuOpen(!menuOpen); } else { setMenuOpen(false); tabNav(t.id); }}} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "none", border: "none", cursor: "pointer", padding: "4px 16px" }}>
              <div style={{ width: 48, height: 28, borderRadius: 14, background: isActive ? `${R}12` : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.25s" }}><I n={t.i} s={22} c={isActive ? R : "#999"} w={isActive ? 600 : 400} f={isActive ? 1 : 0} /></div>
              <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? R : "#999" }}>{t.l}</span>
            </button>;
          })}
        </div>}

        {/* Home indicator */}
        {showChrome && <div style={{ height: 5, display: "flex", justifyContent: "center", paddingBottom: 6, background: "#fff", flexShrink: 0 }}><div style={{ width: 134, height: 5, borderRadius: 3, background: "#111" }} /></div>}
      </div>
    </div>
  );
}
