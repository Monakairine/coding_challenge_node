import { processCSVFile } from "./services/csv.service";
import { calculateLegislatorStatistics } from "./domain/calculate-legislator-statistics.use-case";


const legislatorsDataPromise = processCSVFile(
  "./src/data/legislators.csv"
);
const voteResultsDataPromise = processCSVFile("./src/data/vote_results.csv");
const votesDataPromise = processCSVFile("./src/data/votes.csv");
const billsDataPromise = processCSVFile("./src/data/bills.csv");


// Reading and processing the CSV files


Promise.all([
  legislatorsDataPromise,
  voteResultsDataPromise,
  votesDataPromise,
  billsDataPromise,
])
  .then(([legislatorsData, voteResultsData, votesData, billsData]) => {
    const legislatorStatistics = calculateLegislatorStatistics(
      legislatorsData,
      voteResultsData,
      votesData,
      billsData
    );

    console.log("Legislator Statistics:", legislatorStatistics);
  })
  .catch((error) => {
    console.error("Error reading or processing CSV files:", error);
  });
