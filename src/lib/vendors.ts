export type Vendor = {
  id: string;
  name: string;
  phone: string;
};

export const VENDORS: Vendor[] = [
  { id: "paulo", name: "Paulo", phone: "5554981310049" },
  { id: "gabriel", name: "Gabriel", phone: "5554996602179" },
  { id: "leonardo", name: "Leonardo", phone: "5554997038825" },
];

const STATUS_KEY = "7d_vendor_status";
const LAST_ASSIGNED_KEY = "7d_vendor_last_assigned";
const ONLINE_SINCE_KEY = "7d_vendor_online_since";

// Guard SSR — localStorage only exists in browser
function safeGetItem(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, value);
  } catch {}
}

export function getVendorStatus(): Record<string, boolean> {
  const raw = safeGetItem(STATUS_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {}
  }
  // Default: todos online
  const def: Record<string, boolean> = {};
  VENDORS.forEach((v) => (def[v.id] = true));
  return def;
}

export function setVendorStatus(id: string, online: boolean) {
  const s = getVendorStatus();
  s[id] = online;
  safeSetItem(STATUS_KEY, JSON.stringify(s));

  // Registra quando ficou online (para prioridade por tempo de espera)
  if (online) {
    const onlineSince = getOnlineSince();
    if (!onlineSince[id]) {
      onlineSince[id] = Date.now();
      safeSetItem(ONLINE_SINCE_KEY, JSON.stringify(onlineSince));
    }
  } else {
    // Ficou offline: limpa onlineSince
    const onlineSince = getOnlineSince();
    delete onlineSince[id];
    safeSetItem(ONLINE_SINCE_KEY, JSON.stringify(onlineSince));
  }
}

function getOnlineSince(): Record<string, number> {
  const raw = safeGetItem(ONLINE_SINCE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {}
  }
  return {};
}

function getLastAssigned(): Record<string, number> {
  const raw = safeGetItem(LAST_ASSIGNED_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {}
  }
  return {};
}

/**
 * Seleciona o próximo vendedor online com prioridade para:
 * 1. Quem está online há mais tempo sem receber atendimento (lastAssignedAt mais antigo)
 * 2. Em caso de empate, quem está online há mais tempo (onlineSince mais antigo)
 */
export function pickNextVendor(): Vendor | null {
  const status = getVendorStatus();
  const available = VENDORS.filter((v) => status[v.id] !== false);

  if (!available.length) return null;

  const lastAssigned = getLastAssigned();
  const onlineSince = getOnlineSince();
  const now = Date.now();

  // Ordena: quem esperou mais tempo sem atendimento vem primeiro
  const sorted = [...available].sort((a, b) => {
    const aLast = lastAssigned[a.id] ?? 0;
    const bLast = lastAssigned[b.id] ?? 0;
    if (aLast !== bLast) return aLast - bLast; // menor timestamp = esperou mais

    // Desempate: quem está online há mais tempo
    const aOnline = onlineSince[a.id] ?? now;
    const bOnline = onlineSince[b.id] ?? now;
    return aOnline - bOnline;
  });

  const vendor = sorted[0];

  // Registra o momento do atendimento
  lastAssigned[vendor.id] = Date.now();
  safeSetItem(LAST_ASSIGNED_KEY, JSON.stringify(lastAssigned));

  return vendor;
}

export const getNextVendor = pickNextVendor;