import React, { useCallback, useEffect, useState } from "react";
import { Button, PageHeader, Table, Pagination, Image } from "antd";

import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { crud } from "@/redux/crud/actions";
import { request } from "@/request";

import uniqueId from "@/utils/uinqueId";

export default function ControlTable({ config, ActionButton, ChangeService, StartAllService, currentService }) {
  const { entity } = config;
  const [channelList, setChannelList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentServiceName, setCurrentServiceName] = useState("Please select service to see all channels");
  const pageSize = 10;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentPageData = channelList.slice(startIndex, endIndex);

  const dynamicKey = channelList.length == 0 ? "GUID" : Object.keys(channelList[0]).find(key => key !== "name" && key !== "id" && key !== "image");

  const controlTableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, row) => (
        <div style={{ alignItems: "center"}}>
          <div style={{ background: "black", width: "80px"}}>
            <Image
              width={80}
              height={40}
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
      title: dynamicKey,
      dataIndex: dynamicKey,
    },
    {
      title: "Action",
      render: (row) => (
        <ActionButton row={row} />
      ),
    },
  ];

  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  useEffect(async () => {
    dispatch(crud.list(entity));
    if (currentService) {
      const response = await request.post("channel/list", { id: currentService});
      const listResult = response.result;

      if (listResult) {
        setCurrentServiceName(listResult.service);
        setChannelList(listResult.channels);
      }
      setIsLoading(false);
    }
  }, [dispatch, entity, currentService]);

  return (
    <>
      <PageHeader
        onBack={() => window.history.back()}
        title={currentServiceName}
        ghost={false}
        extra={[
          <StartAllService key={`${uniqueId()}`} />,
          <ChangeService key={`${uniqueId()}`} config={config} setIsLoading={setIsLoading} />
        ]}
        style={{ padding: "20px 0px" }}
      />
      <Table
        columns={controlTableColumns}
        rowKey={(item) => item.id}
        dataSource={currentPageData}
        pagination={false}
        loading={isLoading}
      />
      <Pagination
        current={currentPage}
        total={channelList.length}
        pageSize={pageSize}
        onChange={handlePageChange}
        showSizeChanger={false} // Hide page size changer
        style={{ marginTop: '16px', textAlign: 'right' }}
      />
    </>
  );
}
