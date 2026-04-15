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
      headers: { accept: "application/json" }
    });

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(500).json({
        ok: false,
        error: "ClinicalTrials.gov did not return valid JSON"
      });
    }

    if (!response.ok) {
      return res.status(response.status).json({
        ok: false,
        error: "ClinicalTrials.gov request failed"
      });
    }

    const protocol = data.protocolSection || {};
    const identification = protocol.identificationModule || {};
    const conditions = protocol.conditionsModule || {};
    const design = protocol.designModule || {};
    const status = protocol.statusModule || {};
    const sponsor = protocol.sponsorCollaboratorsModule || {};
    const description = protocol.descriptionModule || {};
    const interventions = protocol.armsInterventionsModule || {};

    return res.status(200).json({
      ok: true,
      NCTId: identification.nctId || nct,
      title: identification.briefTitle || "Untitled study",
      condition: conditions.conditions?.[0] || "N/A",
      phase: design.phases?.join(", ") || "N/A",
      status: status.overallStatus || "N/A",
      sponsor: sponsor.leadSponsor?.name || "N/A",
      summary: description.briefSummary || "No summary available",
      intervention: interventions.interventions?.[0]?.name || "N/A"
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: "Server error",
      details: error.message
    });
  }
}
