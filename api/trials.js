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
      method: "GET",
      headers: { accept: "application/json" }
    });

    if (response.status === 404) {
      return res.status(404).json({ error: "Study not found" });
    }

    const rawText = await response.text();

    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      return res.status(500).json({
        error: "Invalid JSON returned by ClinicalTrials.gov",
        raw: rawText.slice(0, 500)
      });
    }

    if (!response.ok) {
      return res.status(500).json({
        error: "ClinicalTrials.gov request failed",
        status: response.status,
        details: data
      });
    }

    const protocol = data.protocolSection || {};
    const identification = protocol.identificationModule || {};
    const conditions = protocol.conditionsModule || {};
    const design = protocol.designModule || {};
    const status = protocol.statusModule || {};
    const sponsor = protocol.sponsorCollaboratorsModule || {};

    return res.status(200).json({
      NCTId: identification.nctId || cleanNct,
      title: identification.briefTitle || "Untitled study",
      condition:
        Array.isArray(conditions.conditions) && conditions.conditions.length > 0
          ? conditions.conditions[0]
          : "N/A",
      phase:
        Array.isArray(design.phases) && design.phases.length > 0
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
