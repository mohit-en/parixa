import React, { useEffect } from "react";
import axios from "axios";

import AllRoutes from "./Routes";

export default function App() {
  const c = async () => {
    try {
      let reqOptions = {
        url: "https://parixa-api.000webhostapp.com/public/api",
        method: "GET",
      };

      let response = await axios.request(reqOptions);
      console.log(response.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  c();

  return <>{/* <AllRoutes /> */}</>;
}
