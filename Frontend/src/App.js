import React from "react";

// src/index.js
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";

//
import { customStore, persistor } from "./Redux/reduxStore";

import AllRoutes from "./Routes";

export default function App() {
  return (
    <Provider store={customStore}>
      <PersistGate loading={null} persistor={persistor}>
        <AllRoutes />
      </PersistGate>
    </Provider>
  );
}
