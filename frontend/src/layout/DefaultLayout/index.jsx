import React from "react";

import { CrudContextProvider } from "@/context/crud";
import { ControlContextProvider } from "@/context/control";

function DefaultLayout({ children }) {
  return <CrudContextProvider>
      <ControlContextProvider>
        {children}
      </ControlContextProvider>
    </CrudContextProvider>;
}

export default DefaultLayout;
