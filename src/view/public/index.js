import { Route, Routes } from "react-router-dom";
import { Public_Profix, Public_Pay, Public_Special } from "../../config";
import Pay from "./pay";
import Error from "./404error";
import Special from "./specialnft";

const PublicPage = () => {
  return (
    <>
      <Routes>
        <Route path={Public_Pay} element={<Pay />} />
        <Route path={Public_Special} element={<Special />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  );
};
export default PublicPage;
