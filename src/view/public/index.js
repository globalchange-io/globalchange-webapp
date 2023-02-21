import { Route, Routes } from "react-router-dom";
import {
  Public_Pay,
  Public_Send,
  Public_Special,
  Public_Upload,
} from "../../config";
import Pay from "./pay";
import Error from "./404error";
import Special from "./specialnft";
import Sendart from "./sendart";
import Upload from "./upload";

const PublicPage = () => {
  return (
    <>
      <Routes>
        <Route path={Public_Pay} element={<Pay />} />
        <Route path={Public_Special} element={<Special />} />
        <Route path={Public_Upload} element={<Upload />} />
        <Route path={Public_Send} element={<Sendart />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  );
};
export default PublicPage;
