import React from "react";

import CrudModule from "@/modules/CrudModule";
import EndpointForm from "@/forms/EndpointForm";

function Endpoint() {
  const entity = "endpoint";
  const searchConfig = {
    displayLabels: ["Endpoint Name"],
    searchFields: "name",
    outputValue: "name",
  };

  const panelTitle = "Endpoint Panel";
  const dataTableTitle = "Endpoints List";
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
  const dataTableColumns = [
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
    // {
    //   title: "Status",
    //   dataIndex: "status",
    // },
  ];

  const ADD_NEW_ENTITY = "Add new Endpoint";
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
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return (
    <CrudModule
      createForm={<EndpointForm />}
      updateForm={<EndpointForm isUpdateForm={true} />}
      config={config}
    />
  );
}

export default Endpoint;
