import View from "./view";
import "./App.css";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
};

function App() {
  return (
    <Provider template={AlertTemplate} {...options}>
      <View />
    </Provider>
  );
}

export default App;
