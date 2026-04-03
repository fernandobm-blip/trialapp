export default async function handler(req, res) {
  const { nct } = req.query;

  if (!nct) {
    return res.status(400).json({ error: "Missing NCT" });
  }

  const cleanNct = String(nct).trim().toUpperCase();

  if (!/^NCT\d{8}$/.test(cleanNct)) {
    return res.status(400).json({ error: "Invalid NCT format" });
  }

  try {
    const url = `https://clinicaltrials.gov/api/v2/studies/${cleanNct}`;
    const response = await fetch(url, {
      headers: {
        accept: "application/json"
      }
    });

    if (response.status === 404) {
      return res.status(404).json({ error: "Study not found" });
    }

    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({
        error: "ClinicalTrials.gov request failed",
        status: response.status,
        details: text
      });
    }

    const data = await response.json();

    const protocol = data.protocolSection || {};
    const identification = protocol.identificationModule || {};
    const conditions = protocol.conditionsModule || {};
    const design = protocol.designModule || {};
    const status = protocol.statusModule || {};
    const sponsor = protocol.sponsorCollaboratorsModule || {};

    return res.status(200).json({
      NCTId: identification.nctId || cleanNct,
      title: identification.briefTitle || "Untitled study",
      condition: Array.isArray(conditions.conditions) && conditions.conditions.length
        ? conditions.conditions[0]
        : "N/A",
      phase: Array.isArray(design.phases) && design.phases.length
        ? design.phases.join(", ")
        : "N/A",
      status: status.overallStatus || "N/A",
      sponsor: sponsor.leadSponsor?.name || "N/A"
    });

  } catch (error) {
    return res.status(500).json({
      error: "Server error",
      details: error.message
    });
  }
}
