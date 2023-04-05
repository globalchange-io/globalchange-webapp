import StellarSdk from "stellar-sdk";
import {
  checkURL,
  digits_count,
  getTransactions,
  layerGifOnImage,
} from "../utills";

const server = new StellarSdk.Server("https://horizon.stellar.org");

const ArtImage = async (artOutComeNumber, artOutComeLevel, flag) => {
  console.log(
    "in here I use mainnet account for test... GC4EN3GEKM2SOCIBMW3URTQSPIYCTFNOK5ZWDUBOT3ZSXKHGZKFO76MK  --- GBY6IQU3COE7SPWRNIVX72NSPAIK2X6O3WLFWAS3CXDSMJUJ35JT6HEA --- GB4ZF5RC42KIKVGODIELXAAXFZM2ZGJTYN37WHFP74WE373ZUKIYOUUP --- GCQC3WNP6PG463276UP4B4NKTXGMKMKC2OWVRQOOABMZW7Q6OBAYVTWI --- GAWGCWX3VD2MMCNK4KNECPBMNLVNFE4GLB5DV4ZT3YFBS6NWFI7K6THI"
  );
  console.log(artOutComeNumber, artOutComeLevel);

  // Replace with your own horizon server URL
  // Replace with the recent ledger number that the user entered
  const recentLedgerNumber = "40861299";
  let memoTransactions = [];
  const accounts = [
    {
      address: "GC4EN3GEKM2SOCIBMW3URTQSPIYCTFNOK5ZWDUBOT3ZSXKHGZKFO76MK",
      label: "nonprofit1",
    },
    {
      address: "GBY6IQU3COE7SPWRNIVX72NSPAIK2X6O3WLFWAS3CXDSMJUJ35JT6HEA",
      label: "nonprofit2",
    },
    {
      address: "GB4ZF5RC42KIKVGODIELXAAXFZM2ZGJTYN37WHFP74WE373ZUKIYOUUP",
      label: "nonprofit3",
    },
    {
      address: "GAWGCWX3VD2MMCNK4KNECPBMNLVNFE4GLB5DV4ZT3YFBS6NWFI7K6THI",
      label: "nonprofit4",
    },
    {
      address: "GCQC3WNP6PG463276UP4B4NKTXGMKMKC2OWVRQOOABMZW7Q6OBAYVTWI",
      label: "nonprofit5",
    },
  ];

  // Replace with the scarcity level that the user entered
  const scarcityLevel1 = 51;
  const scarcityLevel2 = 62;
  const checkreal = 63;

  // Replace with the start time of the 1990s in Unix time
  const startOf1990s = 631152000;
  // const startOf1990s2 = 731170799;

  // Replace with the end time of the 1990s in Unix time
  const endOf1990s = 946684799;

  try {
    let arr = [];
    let arr2 = [];
    let arr3 = [];
    for (let k = 0; k < artOutComeLevel.length; k++) {
      if (artOutComeLevel[k] !== 0) {
        for (let j = 0; j < accounts.length; j++) {
          let tran = await getTransactions(accounts[j].address);
          // Do something with the transactions
          for (let i = 0; i < tran.length; i++) {
            if (checkURL(tran[i].memo)) {
              if (+tran[i].ledger >= +recentLedgerNumber) {
                await server
                  .effects()
                  .forTransaction(tran[i].hash)
                  .limit("1")
                  .call()
                  // eslint-disable-next-line no-loop-func
                  .then(function (resp) {
                    if (flag === 1) {
                      if (
                        tran[i]?.preconditions?.timebounds?.min_time <
                        startOf1990s
                      ) {
                        if (
                          scarcityLevel2 >=
                            resp.records[0].amount * Math.pow(10, 7) &&
                          resp.records[0].amount * Math.pow(10, 7) >=
                            scarcityLevel1
                        ) {
                          if (
                            resp.records[0].amount * Math.pow(10, 7) ===
                            50 + artOutComeLevel[k]
                          ) {
                            memoTransactions.push(tran[i]);
                            console.log(tran[i]);
                          }
                        }
                      }
                    } else {
                      if (
                        tran[i]?.preconditions?.timebounds?.min_time >=
                          startOf1990s &&
                        tran[i]?.preconditions?.timebounds?.min_time <=
                          endOf1990s
                      ) {
                        if (
                          resp?.records[0]?.amount * Math.pow(10, 7) ===
                          checkreal
                        ) {
                          arr2.push(tran[i].memo);
                        } else {
                          if (
                            scarcityLevel2 >=
                              resp.records[0].amount * Math.pow(10, 7) &&
                            resp.records[0].amount * Math.pow(10, 7) >=
                              scarcityLevel1
                          ) {
                            if (
                              resp.records[0].amount * Math.pow(10, 7) ===
                              50 + artOutComeLevel[k]
                            ) {
                              memoTransactions.push(tran[i]);
                              console.log(tran[i]);
                            }
                          }
                        }
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
        let trans = [];
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
        arr3.push(sortedTransactions);
        await Promise.all(
          sortedTransactions.map(async (items, key) => {
            console.log(artcycle % sortedTransactions.length, "ASdfasdf");
            if (key + 1 === +artcycle % sortedTransactions.length) {
              console.log(+artcycle % sortedTransactions.length, "ASdfasdf");
              await layerGifOnImage(items.memo).then((res) => {
                arr.push(res);
              });
            }
          })
        );
      } else {
        arr.push(0);
        arr3.push([]);
      }
    }
    const data = [{ alldata: arr, artlistdata: arr3 }];
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default ArtImage;
