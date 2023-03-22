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
    console.log(url);
    transactionsArray = transactionsArray.concat(data._embedded.records);
    if (!data._links.next || data._links.next.href === data._links.self.href) {
      break;
    }

    url = data._links.next.href;
  }
  return transactionsArray;
};

export const artOutCome = async (checkbill) => {
  const server = new Server("https://horizon.stellar.org");
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
            account: res.source_account,
            numbersOnly: numbersOnly,
            checkbill: checkbill,
            memoname: memoname[0],
            allmemo: res.memo,
            sequence: res.source_account_sequence,
            redger: ledgerhash,
            redgerhash: resp.hash,
            billartseed: hash,
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

export const ImageCheck = (memoname, level) => {
  if (level > 0) {
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
  } else {
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
    const res = await (await fetch(url)).json();
    return res;
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
