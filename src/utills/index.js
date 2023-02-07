import sha256 from "crypto-js/sha256";
import { read, utils } from "xlsx";
import { Server } from "stellar-sdk";
import {
  onegc,
  fivegc,
  tengc,
  twengc,
  fivtygc,
  hundredgc,
  thougc,
  miliongc,
  hundredthougc,
} from "../config/images";

export const arrayKill = (array, target, name) => {
  const itemToRemoveIndex = array.findIndex((item) => {
    return item[name] === target;
  });

  if (itemToRemoveIndex !== -1) {
    return array.splice(itemToRemoveIndex, 1);
  }
};

export const checkURL = (URL) => {
  const regex = new RegExp(
    "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
  );
  return regex.test(URL);
};

export const artOutCome = async (checkbill) => {
  const server = new Server("https://horizon-testnet.stellar.org");
  return await server
    .transactions()
    .transaction(checkbill)
    .call()
    .then(async (res) => {
      const ledgerhash = res.ledger_attr;
      const memoname = res.memo.split(" ", 3);
      return await server
        .ledgers()
        .ledger(ledgerhash)
        .call()
        .then(function (resp) {
          const hash = sha256(ledgerhash + resp.hash).toString();
          const numbersOnly = "." + hash.replace(/[a-z]/gi, "");
          console.log("level", "1 level");
          const data = {
            numbersOnly: numbersOnly,
            checkbill: checkbill,
            memoname: memoname[0],
          };
          return data;
        })
        .catch(function (err) {
          console.error(err);
        });
    })
    .catch(function (err) {
      console.error(err);
    });
};

export const ImageCheck = (memoname) => {
  console.log(memoname, "memo");
  switch (+memoname) {
    case 1:
      return onegc;
    case 5:
      return fivegc;
    case 10:
      return tengc;
    case 20:
      return twengc;
    case 50:
      return fivtygc;
    case 100:
      return hundredgc;
    case 1000:
      return thougc;
    case 100000:
      return hundredthougc;
    case 1000000:
      return miliongc;
    default:
      break;
  }
};
/* load 'fs' for readFile and writeFile support */

export const layerGifOnImage = async (url) => {
  const f = await (await fetch(url)).arrayBuffer();
  const workbook = read(f);

  const data = utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
  const artlist = data.filter(
    (item) =>
      item["GlobalChange.io"] === "Link to Art" ||
      item["GlobalChange.io"] === "Link to Art or paste image here"
  )[0];
  console.log(artlist, "url data", url, "url by level");
  // artlist.map((item) => {
  console.log(artlist[Object.keys(artlist)["Instructions for Creators"]]);
  return artlist[Object.keys(artlist)["Instructions for Creators"]];
  // });
  // console.log(
  //   Object.keys(artlist)[Object.key  s(artlist).length - 1] +
  //     "---------" +
  //     artlist[Object.keys(artlist)[Object.keys(artlist).length - 1]]
  // );
  // console.log(artlist, "artlist", url);
};

export const ScarcityLevel = (denomination, artOutcome) => {
  const thresholds = {
    1: [
      0.1, 0.01, 0.001, 0.0001, 0.00001, 0.000001, 0.0000001, 0.00000001,
      0.000000001, 0.0000000001, 0.00000000001, 0.000000000000001,
    ],
    5: [
      0.4299855, 0.05146044761, 0.00523951049, 0.00052489501, 0.00005249895,
      0.00000524999, 0.000000525, 0.0000000525, 0.00000000525, 0.00000000053,
      0.00000000005, 0.0000000000000006,
    ],
    10: [
      0.71645371589, 0.10517971749, 0.01095063177, 0.00109950513, 0.00010999505,
      0.00001099995, 0.0000011, 0.00000011, 0.000000011, 0.0000000011,
      0.00000000011, 0.0000000000000012,
    ],
  };
  const billThresholds = thresholds[denomination];
  let scarcityLevel = 0;

  for (let i = 0; i < billThresholds.length; i++) {
    if (+artOutcome > billThresholds[i]) {
      console.log(artOutcome, billThresholds[i]);
      scarcityLevel = i + 1;
      break;
    }
  }

  console.log(`The bill's scarcity level is: Level ${scarcityLevel}`);
  return scarcityLevel;
};
