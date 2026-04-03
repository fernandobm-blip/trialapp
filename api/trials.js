export default async function handler(req, res) {

  const { nct } = req.query;

  if (!nct) {
    return res.status(400).json({ error: "Missing NCT" });
  }

  try {

    const url = `https://clinicaltrials.gov/api/query/study_fields?expr=${nct}&fields=NCTId,BriefTitle,Condition,Phase,OverallStatus&min_rnk=1&max_rnk=1&fmt=json`;

    const response = await fetch(url);
    const data = await response.json();

    const study = data.StudyFieldsResponse.StudyFields[0];

    if (!study) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(200).json({
      NCTId: study.NCTId[0],
      title: study.BriefTitle[0],
      condition: study.Condition[0],
      phase: study.Phase[0] || "N/A",
      status: study.OverallStatus[0]
    });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}