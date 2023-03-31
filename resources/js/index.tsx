import React from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import {store} from "./store";
import {Provider} from "react-redux";
import {router} from "./routes";

const root = ReactDOM.createRoot(
  document.getElementById("senpai") as HTMLElement
);

root.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
);
