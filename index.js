const csv = require("csv-parser");
const fs = require("fs");


// Function to process the CSV files
function processCSVFile(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        results.push(row);
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

// Function to process the CSV files and calculate the results
function calculateLegislatorStatistics(
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

// Reading and processing the CSV files
const legislatorsDataPromise = processCSVFile("legislators.csv");
const voteResultsDataPromise = processCSVFile("vote_results.csv");
const votesDataPromise = processCSVFile("votes.csv");
const billsDataPromise = processCSVFile("bills.csv");

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
