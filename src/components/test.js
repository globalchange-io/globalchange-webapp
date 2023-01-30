import StellarSdk from "stellar-sdk";
import { checkURL, layerGifOnImage } from "../utills";
const server = new StellarSdk.Server("https://horizon.stellar.org");

const Test = async (artOutComeLength) => {
  // Replace with your own horizon server URL
  // Replace with the recent ledger number that the user entered
  const recentLedgerNumber = "40861697";
  let memoTransactions = [];
  const accounts = [
    { address: "GC4EN3GEKM2SOCIBMW3URTQSPIYCTFNOK5ZWDUBOT3ZSXKHGZKFO76MK" },
    { address: "GBY6IQU3COE7SPWRNIVX72NSPAIK2X6O3WLFWAS3CXDSMJUJ35JT6HEA" },
    { address: "GB4ZF5RC42KIKVGODIELXAAXFZM2ZGJTYN37WHFP74WE373ZUKIYOUUP" },
    { address: "GCQC3WNP6PG463276UP4B4NKTXGMKMKC2OWVRQOOABMZW7Q6OBAYVTWI" },
    { address: "GAWGCWX3VD2MMCNK4KNECPBMNLVNFE4GLB5DV4ZT3YFBS6NWFI7K6THI" },
  ];

  // Replace with the five account numbers that the user entered

  // Replace with the scarcity level that the user entered
  const scarcityLevel = 0.0000051;
  const scarcityLevel2 = 0.0000063;

  const filterDuplicateMemos = (transactions) => {
    // Set to store unique memos
    const uniqueMemos = new Set();

    // Filter out transactions with duplicate memos
    return transactions.filter((transaction) => {
      // Check if the memo is blank or consists only of spaces
      if (transaction.memo.trim() === "") {
        return false;
      }

      // Check if the memo has already been seen
      if (uniqueMemos.has(transaction.memo)) {
        return false;
      }

      // Add the memo to the set of unique memos
      uniqueMemos.add(transaction.memo);
      return true;
    });
  };

  // Function to print the transactions in the "Available Art" list
  const printAvailableArt = async (transactions) => {
    // Iterate through the transactions and print each one
    artOutComeLength.map((item) =>
      transactions.map(
        (items, key) =>
          key === item % transactions.length && layerGifOnImage(items.memo)
      )
    );

    console.log(artOutComeLength);
    // return transactions[turnnumber].memo;
  };

  try {
    for (let j = 0; j < accounts.length; j++) {
      let tran = await server
        .transactions()
        .forAccount(accounts[j].address)
        .limit("200")
        .call();
      if (!tran.records.length) {
        return;
      }
      // // Do something with the transactions
      for (let i = 0; i < tran.records.length; i++) {
        if (checkURL(tran.records[i].memo)) {
          if (
            tran.records[i].memo &&
            +tran.records[i].ledger_attr >= +recentLedgerNumber
          ) {
            await server
              .effects()
              .forTransaction(tran.records[i].hash)
              .limit("1")
              .call()
              .then(function (resp) {
                if (
                  scarcityLevel2 >= resp.records[0].amount &&
                  resp.records[0].amount >= scarcityLevel
                ) {
                  memoTransactions.push(tran.records[i]);
                }
              })
              .catch(function (err) {
                console.error(err);
              });
          }
        }
      }
    }
    // const filteredComplete = filterDuplicateMemos(memoTransactions);

    const sortedTransactions = memoTransactions.sort(
      (a, b) => a.operation_count - b.operation_count
    );
    printAvailableArt(sortedTransactions);
    // Update the last transaction ID
    // Recursive call to get all the transactions.
  } catch (error) {
    console.error(error);
  }
};

export default Test;
