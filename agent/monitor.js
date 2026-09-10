import { readFileSync } from "fs";

const SA_DIR = "/var/run/secrets/kubernetes.io/serviceaccount";
const NAMESPACE =
  process.env.NAMESPACE || readFileSync(`${SA_DIR}/namespace`, "utf8").trim();
const TOKEN = readFileSync(`${SA_DIR}/token`, "utf8").trim();
const K8S_API = `https://${process.env.KUBERNETES_SERVICE_HOST}:${process.env.KUBERNETES_SERVICE_PORT}`;

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL =
  process.env.OPENROUTER_MODEL || "anthropic/claude-haiku-4.5";

async function k8sGet(path) {
  const res = await fetch(`${K8S_API}${path}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  if (!res.ok) {
    throw new Error(`k8s API ${path} -> HTTP ${res.status}`);
  }
  return res.json();
}

async function getPodSummary() {
  const pods = await k8sGet(`/api/v1/namespaces/${NAMESPACE}/pods`);
  return pods.items.map((p) => {
    const statuses = p.status.containerStatuses || [];
    return {
      name: p.metadata.name,
      phase: p.status.phase,
      ready: statuses.length > 0 && statuses.every((c) => c.ready),
      restarts: statuses.reduce((sum, c) => sum + c.restartCount, 0),
    };
  });
}

async function getWarningEvents() {
  const events = await k8sGet(
    `/api/v1/namespaces/${NAMESPACE}/events?fieldSelector=type=Warning`
  );
  return events.items
    .slice(-20)
    .map(
      (e) =>
        `[${e.lastTimestamp || e.eventTime || "?"}] ${
          e.involvedObject?.name
        }: ${e.reason} - ${e.message}`
    );
}

async function askLLM(pods, warningEvents) {
  if (!OPENROUTER_API_KEY) {
    return "(OPENROUTER_API_KEY absente — analyse IA sautée, voir le résumé brut ci-dessus)";
  }

  const prompt = `État des pods dans le namespace "${NAMESPACE}" :
${JSON.stringify(pods, null, 2)}

Événements d'avertissement récents (max 20) :
${warningEvents.length ? warningEvents.join("\n") : "(aucun)"}`;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      max_tokens: 400,
      messages: [
        {
          role: "system",
          content:
            "Tu es un agent de supervision pour un cluster Kubernetes. " +
            "On te donne l'état des pods et les événements d'avertissement " +
            "récents d'un namespace. Réponds en français, en 3 à 5 lignes : " +
            "dis si tout va bien, et sinon explique le problème le plus " +
            "probable et une piste de correction concrète.",
        },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenRouter API error ${res.status}: ${text}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || "(réponse vide)";
}

async function main() {
  console.log(`=== Agent de supervision — namespace "${NAMESPACE}" ===`);
  console.log(new Date().toISOString());

  const [pods, warningEvents] = await Promise.all([
    getPodSummary(),
    getWarningEvents(),
  ]);

  console.log("--- Pods ---");
  console.log(JSON.stringify(pods, null, 2));

  console.log("--- Événements d'avertissement ---");
  if (warningEvents.length === 0) {
    console.log("(aucun)");
  } else {
    warningEvents.forEach((e) => console.log(e));
  }

  console.log("--- Analyse IA ---");
  const diagnosis = await askLLM(pods, warningEvents);
  console.log(diagnosis);
}

main().catch((err) => {
  console.error("Agent error:", err);
  process.exit(1);
});
