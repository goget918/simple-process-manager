import React from "react";
import { Image } from 'antd';

import ControlModule from "@/modules/ControlModule";

function Service() {
  const entity = "endpoint";
  const searchConfig = {
    displayLabels: ["Endpoint Name"],
    searchFields: "name",
    outputValue: "name",
  };

  const panelTitle = "Service Panel";
  const dataTableTitle = "Available Channels";
  const entityDisplayLabels = ["Endpoint Name"];

  const readColumns = [
    {
      title: "Endpoint Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "comment",
    },
    {
      title: "URL",
      dataIndex: "url",
    },
  ];

  const ADD_NEW_ENTITY = "Change service";
  const DATATABLE_TITLE = "Endpoints List";
  const ENTITY_NAME = "Endpoint";
  const CREATE_ENTITY = "Create Endpoint";
  const UPDATE_ENTITY = "Update Endpoint";
  const config = {
    entity,
    panelTitle,
    dataTableTitle,
    ENTITY_NAME,
    CREATE_ENTITY,
    ADD_NEW_ENTITY,
    UPDATE_ENTITY,
    DATATABLE_TITLE,
    readColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return (
    <ControlModule
      config={config}
    />
  );
}

export default Service;
