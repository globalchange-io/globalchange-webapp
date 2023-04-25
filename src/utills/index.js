import sha256 from "crypto-js/sha256";
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
  Card10,
  Card11,
  Card12,
  Card13,
  Card14,
} from "../config/images";
import { read, utils } from "xlsx";
const server = new Server("https://horizon.stellar.org");

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

export const getTransactions = async (account) => {
  let url = `https://horizon.stellar.org/accounts/${account}/transactions?order=desc&limit=200`;
  let transactionsArray = [];
  while (true) {
    const response = await fetch(url);
    const data = await response.json();
    transactionsArray = transactionsArray.concat(data._embedded.records);
    if (!data._links.next || data._links.next.href === data._links.self.href) {
      break;
    }

    url = data._links.next.href;
  }
  return transactionsArray;
};

export const artOutCome = async (checkbill) => {
  return await server
    .transactions()
    .transaction(checkbill)
    .call()
    .then(async (res) => {
      let flag = 0;
      const ledgerhash = res.ledger_attr;
      const memoname = res.memo.split(" ", 3);

      return await server
        .ledgers()
        .ledger(ledgerhash)
        .call()
        .then(function (resp) {
          const hash = sha256(
            res.source_account_sequence + resp.hash
          ).toString();
          console.log(
            resp,
            "ledgerhash + resp.hash)",
            res.source_account_sequence + resp.hash,
            res
          );
          const numbersOnly = "0." + hash.replace(/[a-z]/gi, "");
          // let formattedNum = numbersOnly.replace(/0$/, "");
          console.log(res, "resp");
          if (new Date(res.created_at).getFullYear() < 2023) {
            flag = 1;
          }
          const data = {
            account: res.source_account,
            numbersOnly: numbersOnly,
            checkbill: checkbill,
            memoname: memoname[0],
            allmemo: res.memo,
            created_at: res.created_at,
            redger: ledgerhash,
            redgerhash: resp.hash,
            billartseed: hash,
            sequence: res.source_account_sequence,
            flag: flag,
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
export const getOperation = async (transactionHash) => {
  return await server
    .effects()
    .forTransaction(transactionHash)
    .call()
    .then((response) => {
      console.log(response);
      const data = response.records.filter(
        (item) => item.type === "account_credited" && item.account
      );
      console.log(data, "Data");
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};
export const ImageCheck = (memoname, level) => {
  console.log(memoname, "memo", level, "Level");
  if (level === 99) {
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
  }
  if (level === 0) {
    switch (+memoname) {
      case 0.01:
        return Card10;
      case 0.05:
        return Card11;
      case 0.1:
        return Card12;
      case 0.25:
        return Card13;
      case 0.5:
        return Card14;
      case 1:
        return "https://i.ibb.co/Nnnfwmx/GC-Billy.png";
      case 5:
        return "https://i.ibb.co/PZwtbNd/GC-Fiyive.png";
      case 10:
        return "https://i.ibb.co/mDBZdwq/GC-Decker.png ";
      case 20:
        return "https://i.ibb.co/X7R1NmP/GC-Twinda.png";
      case 50:
        return "https://i.ibb.co/37Mq4Vd/GC-Fighty.png";
      case 100:
        return "https://i.ibb.co/Vqy7cwy/GC-Centaur.png";
      case 1000:
        return "https://i.ibb.co/Nt1KH8Z/GC-Sen-say.png";
      case 100000:
        return "https://i.ibb.co/3smBng5/GC-Gee-whiz.png";
      case 1000000:
        return "https://i.ibb.co/kMkwTpF/GC-milliam.png ";
      default:
        break;
    }
  }
};

export const layerGifOnImage = async (url) => {
  try {
    const res = await fetch(url);
    const contentType = res.headers.get("Content-Type");
    if (contentType.includes("application/json")) {
      return await res.json();
    } else {
      const f = await res.arrayBuffer();
      const workbook = read(f);
      const data = utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
      console.log(data);
      const artlist = data.filter(
        (item) =>
          item["GlobalChange.io"] === "Link to Art" ||
          item["GlobalChange.io"] === "Link to Art or paste image here"
      )[0];
      const createdBy = data.filter(
        (item) => item["GlobalChange.io"] === "Created by"
      )[0];
      const title = data.filter(
        (item) => item["GlobalChange.io"] === "Art title"
      )[0];
      console.log(artlist, "url data", url, "url by level");
      const artData = {
        jpgfile: artlist["Instructions for Creators"],
        title: title["Instructions for Creators"],
        artistname: createdBy["Instructions for Creators"],
      };
      console.log(artData);
      return artData;
    }
  } catch (error) {
    console.error(error);
  }
};

export const ScarcityLevel = (denomination, artOutcome) => {
  const denomination2 = denomination.replace(/[a-z]/gi, "");

  const thresholds = {
    1: [
      0.1, 0.01, 0.001, 0.0001, 0.00001, 0.000001, 0.0000001, 0.00000001,
      0.000000001, 0.0000000001, 0.00000000001, 0.000000000000001,
    ],
    2: [
      0.1938, 0.020298, 0.00203898, 0.0002039898, 0.0000203999, 0.00000204,
      0.000000204, 0.0000000204, 0.00000000204, 0.0000000002, 0.00000000002,
      0.0000000000000002,
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
    20: [
      1.05410801449, 0.21851167488, 0.0237733622, 0.00239772137, 0.0002399772,
      0.00002399977, 0.0000024, 0.00000024, 0.000000024, 0.0000000024,
      0.00000000024, 0.0000000000000027,
    ],
    50: [
      1.49226933719, 0.59249089929, 0.0731915577, 0.00748165437, 0.00074981628,
      0.00007499816, 0.00000749998, 0.00000075, 0.000000075, 0.0000000075,
      0.00000000075, 0.0000000000000083,
    ],
    100: [
      1.9999468772, 1.26793531745, 0.19041570577, 0.01990132262, 0.00199901032,
      0.0001999901, 0.0000199999, 0.000002, 0.0000002, 0.00000002, 0.000000002,
      0.0000000000000222,
    ],
    1000: [
      11.0, 10.99952511628, 6.95535032752, 1.04683817086, 0.10945237329,
      0.01099450733, 0.00109994506, 0.00010999945, 0.00001099999, 0.0000011,
      0.00000011, 0.0000000000012212,
    ],
    100000: [
      1001.0, 1001.0, 1001.0, 1000.95457738881, 632.75452062999, 95.25778983575,
      9.96011690739, 1.00049967682, 0.10009499239, 0.01000995078, 0.00100099958,
      0.0000000111133325,
    ],
    1000000: [
      10001.0, 10001.0, 10001.0, 10001.0, 10000.5459780042, 6321.83954853211,
      951.72102699245, 99.51161366717, 9.99600088885, 1.00005007946,
      0.10000950823, 0.0000011103340469,
    ],
    1000000000: [
      10000001.0, 10000001.0, 10000001.0, 10000001.0, 10000001.0, 10000001.0,
      10000001.0, 9999547.00070249, 6321206.11820211, 951625.989714819,
      99501.6806506907, 1.11022307347496,
    ],
  };

  const billThresholds = thresholds[+denomination2];
  let scarcityLevel = 0;
  if (billThresholds) {
    for (let i = 1; i < billThresholds.length; i++) {
      if (billThresholds[i - 1] > +artOutcome > billThresholds[i]) {
        scarcityLevel = i;
        break;
      }
    }
  }

  return scarcityLevel;
};

export const digits_count = (n) => {
  var count = 0;
  if (n >= 1) ++count;

  while (n / 10 >= 1) {
    n /= 10;
    ++count;
  }

  return count;
};
