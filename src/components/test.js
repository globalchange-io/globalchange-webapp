import StellarSdk from "stellar-sdk";

const Test = () => {
  // Replace with your own horizon server URL
  const horizon = "https://horizon.stellar.org";
  // Replace with the recent ledger number that the user entered
  const recentLedgerNumber = "339988";

  // Replace with the five account numbers that the user entered
  const accounts = "GAHUQ47QPCIU54OWKLZKOG2WRT7IXEJOJLDREQRGLNF2SOPQN7QG55HD";

  // Replace with the scarcity level that the user entered
  const scarcityLevel = 50;

  // Replace with the start time of the 1990s in Unix time
  const startOf1990s = 631152000;

  // Replace with the end time of the 1990s in Unix time
  const endOf1990s = 946684799;

  // Date on which transactions should be considered "Available Art"
  const availableArtDate = new Date("2022-12-23").toJSON();
  const availableArtDate2 = new Date("2022-12-27").toJSON();
  // Function to filter transactions that meet the criteria for "Available Art"
  const isAvailableArt = (transaction) => {
    // Check if the transaction took place on May 13, 2022 or has a mintime between the start and end of the 1990s
    const isCorrectDate =
      (transaction.created_at <= availableArtDate2 &&
        transaction.created_at >= availableArtDate) ||
      (transaction.mintime >= startOf1990s &&
        transaction.mintime <= endOf1990s);
    // Check if the transaction is for the correct amount of Stroop
    const isCorrectAmount = transaction.amount === scarcityLevel + 50;

    // Return true if both conditions are met, false otherwise
    return isCorrectDate;
  };

  // Function to filter out transactions with duplicate memos
  // const filterDuplicateMemos = (transactions) => {
  //   // Set to store unique memos
  //   const uniqueMemos = new Set();
  //   // Filter out transactions with duplicate memos
  //   return transactions.filter((transaction) => {
  //     // Check if the memo is blank or consists only of spaces
  //     if (transaction.memo.trim() === "") {
  //       return false;
  //     }

  //     // Check if the memo has already been seen
  //     if (uniqueMemos.has(transaction.memo)) {
  //       return false;
  //     }
  //     // Add the memo to the set of unique memos
  //     uniqueMemos.add(transaction.memo);
  //     return true;
  //   });
  // };

  // Function to remove delisted art from the "Available Art" list
  const removeDelistedArt = (transactions) => {
    // Map to store the delisted memos
    const delistedMemos = new Map();

    // Iterate through the transactions and store the delisted memos
    transactions.forEach((transaction) => {
      // Check if the transaction is a delisting transaction
      if (transaction.amount === 63) {
        delistedMemos.set(transaction.memo, true);
      }
    });

    // Filter out transactions that have been delisted
    return transactions.filter(
      (transaction) => !delistedMemos.has(transaction.memo)
    );
  };

  // Function to print the transactions in the "Available Art" list
  const printAvailableArt = (transactions) => {
    // Iterate through the transactions and print each one
    transactions.forEach((transaction, index) => {
      console.log(`${index + 1}. Memo: ${transaction.memo}`);
    });
  };

  // Connect to the Horizon server
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

  server
    .transactions()
    .forAccount(accounts)
    .call()
    .then(function (results) {
      const availableArtTransactions = results.records.filter(isAvailableArt);
      // Remove delisted art from the "Available Art" list
      const filteredTransactions = removeDelistedArt(availableArtTransactions);
      // Sort the remaining transactions in operation order
      const sortedTransactions = filteredTransactions.sort(
        (a, b) => a.operation_count - b.operation_count
      );
      // Print the "Available Art" list
      printAvailableArt(sortedTransactions);
    })
    .catch(function (err) {
      console.log(err);
    });
  checkBillOwnership(
    "fa19c57af52f7e3bd66585e0318fb659bf1c47b67c25307d424de93c825593c7",
    accounts
  );
  async function checkBillOwnership(serialNumber, recipientAccountId) {
    // Load the transaction with the specified serial number
    const transaction = await server
      .transactions()
      .transaction(serialNumber)
      .call();

    // Get the account ID of the sender of the transaction
    const senderAccountId = transaction.source_account;

    // Initialize the current account ID to the sender's account ID
    let currentAccountId = senderAccountId;

    // Initialize a flag to track whether the recipient is the owner
    let isOwner = false;

    // Initialize a list to store the transaction history
    const transactionHistory = [currentAccountId];

    // Keep searching for the recipient's account ID in the memo field of transactions
    // until the recipient's account ID is found or there are no more transactions to search
    while (!isOwner && currentAccountId !== recipientAccountId) {
      // Load the transactions for the current account
      const transactions = await server
        .transactions()
        .forAccount(currentAccountId)
        .call();

      // Iterate through the transactions to find the one with the serial number in the memo
      for (const transaction of transactions.records) {
        if (transaction.memo && transaction.memo.value === serialNumber) {
          // Set the current account ID to the recipient of the transaction
          currentAccountId = transaction.to;
          transactionHistory.push(currentAccountId);
          break;
        }
      }
      // Check if the current account ID is the recipient's account ID
      isOwner = currentAccountId === recipientAccountId;
    }

    // Output the transaction history
    // Return the result
    return isOwner;
  }
};

export default Test;
