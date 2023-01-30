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
    (item) => item["GlobalChange.io"] === "Link to Art"
  )[0];
  console.log(
    Object.keys(artlist)[3] + "---------" + artlist[Object.keys(artlist)[3]]
  );
  console.log(artlist, "artlist", url);
};
