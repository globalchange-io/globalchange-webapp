import StellarSdk from "stellar-sdk";
import { checkURL, digits_count, layerGifOnImage } from "../utills";
const server = new StellarSdk.Server("https://horizon.stellar.org");

const Test = async (artOutComeNumber, artOutComeLevel) => {
  console.log(
    "in here I use mainnet account for test... GC4EN3GEKM2SOCIBMW3URTQSPIYCTFNOK5ZWDUBOT3ZSXKHGZKFO76MK  --- GBY6IQU3COE7SPWRNIVX72NSPAIK2X6O3WLFWAS3CXDSMJUJ35JT6HEA --- GB4ZF5RC42KIKVGODIELXAAXFZM2ZGJTYN37WHFP74WE373ZUKIYOUUP --- GCQC3WNP6PG463276UP4B4NKTXGMKMKC2OWVRQOOABMZW7Q6OBAYVTWI --- GAWGCWX3VD2MMCNK4KNECPBMNLVNFE4GLB5DV4ZT3YFBS6NWFI7K6THI"
  );
  // Replace with your own horizon server URL
  // Replace with the recent ledger number that the user entered
  const recentLedgerNumber = "40861697";
  let memoTransactions = [];
  const accounts = [
    // { address: "GB6O5KIWNM5VMK6NYYV573PTDT7ZJBHXWLBBJXTY4LZDTC47Q2R4RX6S" },
    // { address: "GBY6IQU3COE7SPWRNIVX72NSPAIK2X6O3WLFWAS3CXDSMJUJ35JT6HEA" },
    { address: "GB4ZF5RC42KIKVGODIELXAAXFZM2ZGJTYN37WHFP74WE373ZUKIYOUUP" },
    { address: "GCQC3WNP6PG463276UP4B4NKTXGMKMKC2OWVRQOOABMZW7Q6OBAYVTWI" },
    { address: "GAWGCWX3VD2MMCNK4KNECPBMNLVNFE4GLB5DV4ZT3YFBS6NWFI7K6THI" },
  ];
  // const accounts = [
  //   { address: "GBVKR2N54PESLPY57TJ6L4JHNMNBXI5SWRGRWEZV4LU73DC5DI26545A" },
  //   { address: "GBSPK7XJDK3BB2HUO4DTANKWWVLTEKAK4NTTLVY56YYHIYQUFX5CJMAK" },
  //   { address: "GDWNMXOVH3GDYXFBD66U5OCHO33SUOSY37O6ZSZBCG33IZ7N6ZONZGFW" },
  //   { address: "GCQC3WNP6PG463276UP4B4NKTXGMKMKC2OWVRQOOABMZW7Q6OBAYVTWI" },
  //   { address: "GANLOWYTGSBJC6HK7PNWCYGTSPSXYQMJHKEK7B7FOTSU5HB2QWTJJBZW" },
  // ];

  // Replace with the five account numbers that the user entered

  // Replace with the scarcity level that the user entered
  const scarcityLevel1 = 51;
  const scarcityLevel2 = 62;
  const checkreal = 63;
  // Replace with the start time of the 1990s in Unix time
  const startOf1990s = 631152000;

  // Replace with the end time of the 1990s in Unix time
  const endOf1990s = 946684799;

  try {
    let arr = [];
    let arr2 = [];
    for (let k = 0; k < artOutComeLevel.length; k++) {
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
          if (
            tran?.records[i]?.preconditions?.timebounds?.min_time >=
              startOf1990s &&
            tran?.records[i]?.preconditions?.timebounds?.min_time <= endOf1990s
          ) {
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
                  // eslint-disable-next-line no-loop-func
                  .then(function (resp) {
                    console.log(resp, "resp");
                    if (
                      resp.records[0].amount * Math.pow(10, 7) ===
                      checkreal
                    ) {
                      arr2.push(tran.records[i].memo);
                    }
                    if (
                      scarcityLevel2 >=
                        resp.records[0].amount * Math.pow(10, 7) &&
                      resp.records[0].amount * Math.pow(10, 7) >= scarcityLevel1
                    ) {
                      if (
                        resp.records[0].amount * Math.pow(10, 7) ===
                        50 + artOutComeLevel[k]
                      ) {
                        memoTransactions.push(tran.records[i]);
                      }
                    }
                  })
                  .catch(function (err) {
                    console.error(err);
                  });
              }
            }
          }
        }
      }
      let trans = [];
      if (memoTransactions.length > 0) {
        for (let i = 0; i < memoTransactions.length; i++) {
          const object1 = memoTransactions[i];
          const isNameRepeated = arr2.some(
            (object2) => object2 === object1.memo
          );

          if (!isNameRepeated) {
            console.log(object1, isNameRepeated, "Asdfadsfsdfsdaf");
            trans.push(object1);
          }
        }

        const sortedTransactions = trans.sort(
          (a, b) => a.paging_token - b.paging_token
        );

        const templength = digits_count(trans.length);
        const artcycle = artOutComeNumber[k].slice(
          artOutComeNumber[k].length - +templength
        );

        console.log(
          sortedTransactions,
          trans,
          "transaction that has url and pass some checking",
          artcycle
        );
        await Promise.all(
          sortedTransactions.map(async (items, key) => {
            if (key + 1 === +artcycle % sortedTransactions.length) {
              console.log(+artcycle % sortedTransactions.length, "ASdfasdf");

              await layerGifOnImage(items.memo).then((res) => {
                arr.push(res);
              });
            }
          })
        );
      }
    }
    return arr;
  } catch (error) {
    console.error(error);
  }
};

export default Test;
