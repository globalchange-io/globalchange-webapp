import { Route, Routes } from "react-router-dom";
import {
  Public_Pay,
  Public_Send,
  Public_Special,
  Public_Upload,
  Public_Visualizer,
  Public_Wallet,
} from "../../config";
import Pay from "./pay";
import Error from "./404error";
import Special from "./specialnft";
import Sendart from "./sendgc";
import Upload from "./upload";
import Visualizer from "./visualizer";
import SmartWallet from "./smartwallet";
const PublicPage = () => {
  return (
    <>
      <Routes>
        <Route path={Public_Pay} element={<Pay />} />
        <Route path={Public_Special} element={<Special />} />
        <Route path={Public_Upload} element={<Upload />} />
        <Route path={Public_Send} element={<Sendart />} />
        <Route path={Public_Visualizer} element={<Visualizer />} />
        <Route path={Public_Wallet} element={<SmartWallet />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  );
};
export default PublicPage;
