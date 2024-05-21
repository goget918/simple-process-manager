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
  const controlTableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, row) => (
        <div style={{ alignItems: "center"}}>
          <div style={{ background: "black", width: "80px"}}>
            <Image
              width={80}
              src={row.image}
              alt={row.name}
              preview={false} // Disable preview if you don't want the preview feature
            />
          </div>
          <p>{row.name}</p>
        </div>
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "GUID",
      dataIndex: "guid",
    }
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
    controlTableColumns,
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
