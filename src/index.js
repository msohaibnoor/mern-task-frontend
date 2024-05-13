import "./index.css";
import App from "./App";
import React from "react";
import { Provider } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import ReactDOM from "react-dom/client";
import { store, persistor } from "./Redux/configureStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
