import React, { useCallback, useEffect } from "react";
import { Dropdown, Button, PageHeader, Table } from "antd";

import { EllipsisOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { crud } from "@/redux/crud/actions";
import { selectListItems } from "@/redux/crud/selectors";

import uniqueId from "@/utils/uinqueId";

export default function DataTable({ config, DropDownRowMenu, AddNewItem }) {
  const { entity, dataTableColumns: initialColumns, dataTableTitle } = config;

  const dataTableColumns = [
    ...initialColumns,
    {
      title: "",
      render: (row) => (
        <Dropdown overlay={<DropDownRowMenu row={row} />} trigger={["click"]}>
          <EllipsisOutlined style={{ cursor: "pointer", fontSize: "24px" }} />
        </Dropdown>
      ),
    },
  ];

  const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems);
  const { pagination, items } = listResult;

  const dispatch = useDispatch();

  const handleDataTableLoad = useCallback((pagination) => {
    dispatch(crud.list(entity, pagination.current));
  }, [dispatch, entity]);

  useEffect(() => {
    dispatch(crud.list(entity));
  }, [dispatch, entity]);

  return (
    <>
      <PageHeader
        onBack={() => window.history.back()}
        title={dataTableTitle}
        ghost={false}
        extra={[
          <Button onClick={handleDataTableLoad} key={`${uniqueId()}`}>
            Refresh
          </Button>,
          <AddNewItem key={`${uniqueId()}`} config={config} />,
        ]}
        style={{ padding: "20px 0px" }}
      />
      <Table
        columns={dataTableColumns}
        rowKey={(item) => item._id}
        dataSource={items}
        pagination={pagination}
        loading={listIsLoading}
        onChange={handleDataTableLoad}
      />
    </>
  );
}
