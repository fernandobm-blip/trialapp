export default async function handler(req, res) {
  const nct = String(req.query.nct || "").trim().toUpperCase();

  if (!/^NCT\d{8}$/.test(nct)) {
    return res.status(400).json({
      ok: false,
      error: "Invalid NCT format"
    });
  }

  try {
    const url = `https://clinicaltrials.gov/api/v2/studies/${nct}?format=json`;

    const response = await fetch(url, {
      headers: {
        accept: "application/json"
      }
    });

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(500).json({
        ok: false,
        error: "ClinicalTrials.gov did not return valid JSON",
        raw: text.slice(0, 300)
      });
    }

    if (!response.ok) {
      return res.status(response.status).json({
        ok: false,
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
      ok: true,
      NCTId: identification.nctId || nct,
      title: identification.briefTitle || "Untitled study",
      condition:
        Array.isArray(conditions.conditions) && conditions.conditions.length
          ? conditions.conditions[0]
          : "N/A",
      phase:
        Array.isArray(design.phases) && design.phases.length
          ? design.phases.join(", ")
          : "N/A",
      status: status.overallStatus || "N/A",
      sponsor: sponsor.leadSponsor?.name || "N/A"
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: "Server error",
      details: error.message
    });
  }
}
