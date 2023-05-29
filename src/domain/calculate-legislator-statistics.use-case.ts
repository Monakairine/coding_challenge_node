export function calculateLegislatorStatistics(
  legislatorsData,
  voteResultsData,
  votesData,
  billsData
) {
  const legislatorStatistics = [];

  legislatorsData.forEach((legislator) => {
    const { id, name } = legislator;
    let numSupportedBills = 0;
    let numOpposedBills = 0;

    voteResultsData.forEach((voteResult) => {
      if (voteResult.legislator_id === id) {
        const vote = votesData.find((vote) => vote.id === voteResult.vote_id);
        if (vote) {
          const bill = billsData.find((bill) => bill.id === vote.bill_id);
          if (bill) {
            if (voteResult.vote_type === "1") {
              numSupportedBills++;
            } else if (voteResult.vote_type === "2") {
              numOpposedBills++;
            }
          }
        }
      }
    });

    legislatorStatistics.push({
      id,
      name,
      num_supported_bills: numSupportedBills,
      num_opposed_bills: numOpposedBills,
    });
  });

  return legislatorStatistics;
}
