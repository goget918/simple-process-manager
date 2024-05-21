import React, { useCallback, useEffect } from "react";
import { Dropdown, Button, PageHeader, Table } from "antd";

import { EllipsisOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { crud } from "@/redux/crud/actions";
import { selectListItems } from "@/redux/crud/selectors";

import uniqueId from "@/utils/uinqueId";

export default function ControlTable({ config, ActionButton, ChangeService }) {
  const { entity, controlTableColumns: initialColumns, ControlTableTitle } = config;

  const ControlTableColumns = [
    ...initialColumns,
    {
      title: "Action",
      render: (row) => (
        <ActionButton row={row} />
      ),
    },
  ];

  const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems);
  const { pagination, items } = listResult;

  const dispatch = useDispatch();

  // use dummy value for now
  const channelList = [
    {
      "guid": "b942979b6756473ebb35b015ebe25449",
      "id": "1796",
      "image": "http://p-img.movetv.com/cms/images/e94a99d4306de05773111b7c9c3441e548a95129.png",
      "name": "21 Jump Street"
    },
    {
      "guid": "634a8db32f7046bc93835e3ecece7f8f",
      "id": "1566",
      "image": "http://p-img.movetv.com/images/0913e3f00cc331067a9387ad60d920f3bfaca064",
      "name": "40 y 20"
    },
    {
      "guid": "6f6788bea06243da873b8b3450b4aaa0",
      "id": "1283",
      "image": "http://p-img.movetv.com/cms/images/9c9407a0ce3dc37b64d99077f0088d3f6cb8c4a8.png",
      "name": "ABC News Live"
    },
    {
      "guid": "a1e386e41a604ac684850610c693213b",
      "id": "2176",
      "image": "http://p-img.movetv.com/1280x720/992dee1a4244c1bad093c9039e5f6d20.png",
      "name": "ABP Ananda"
    },
    {
      "guid": "29dd2d3ef052486482f4c74932a9924f",
      "id": "2175",
      "image": "http://p-img.movetv.com/1280x720/ef72d5f41939efb281a9f68950f7dfea.png",
      "name": "ABP Asmita"
    },];

  const handleControlTableLoad = useCallback((pagination) => {
    dispatch(crud.list(entity, pagination.current));
  }, [dispatch, entity]);

  useEffect(() => {
    dispatch(crud.list(entity));
  }, [dispatch, entity]);

  return (
    <>
      <PageHeader
        onBack={() => window.history.back()}
        title={ControlTableTitle}
        ghost={false}
        extra={[
          <Button onClick={handleControlTableLoad} key={`${uniqueId()}`}>
            Refresh
          </Button>,
          <ChangeService key={`${uniqueId()}`} config={config} />,
        ]}
        style={{ padding: "20px 0px" }}
      />
      <Table
        columns={ControlTableColumns}
        rowKey={(item) => item.guid}
        dataSource={channelList}
        pagination={pagination}
        loading={listIsLoading}
        onChange={handleControlTableLoad}
      />
    </>
  );
}
