import React from "react";

import { Button, Menu } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { crud } from "@/redux/crud/actions";
import { selectItemById } from "@/redux/crud/selectors";
import { useCrudContext } from "@/context/crud";
import uniqueId from "@/utils/uinqueId";
import DataTable from "@/components/DataTable";

function AddNewItem({ config }) {
  const { crudContextAction } = useCrudContext();
  const { collapsedBox, panel } = crudContextAction;
  const { ADD_NEW_ENTITY } = config;

  const handleClick = () => {
    panel.open();
    collapsedBox.close();
  };

  return (
    <Button onClick={handleClick} type="primary">
      {ADD_NEW_ENTITY}
    </Button>
  );
}

function DropDownRowMenu({ row }) {
  const dispatch = useDispatch();
  const { crudContextAction } = useCrudContext();
  const { panel, collapsedBox, modal, readBox, editBox } = crudContextAction;
  const item = useSelector(selectItemById(row._id));

  const handleShow = () => {
    dispatch(crud.currentItem(item));
    panel.open();
    collapsedBox.open();
    readBox.open();
  };

  const handleEdit = () => {
    dispatch(crud.currentAction("update", item));
    editBox.open();
    panel.open();
    collapsedBox.open();
  };

  const handleDelete = () => {
    dispatch(crud.currentAction("delete", item));
    modal.open();
  };

  return (
    <Menu style={{ width: 130 }}>
      <Menu.Item key={`${uniqueId()}`} icon={<EyeOutlined />} onClick={handleShow}>
        Show
      </Menu.Item>
      <Menu.Item key={`${uniqueId()}`} icon={<EditOutlined />} onClick={handleEdit}>
        Edit
      </Menu.Item>
      <Menu.Item key={`${uniqueId()}`} icon={<DeleteOutlined />} onClick={handleDelete}>
        Delete
      </Menu.Item>
    </Menu>
  );
}
export default function CrudDataTable({ config }) {
  return (
    <DataTable
      config={config}
      DropDownRowMenu={DropDownRowMenu}
      AddNewItem={AddNewItem}
    />
  );
}
