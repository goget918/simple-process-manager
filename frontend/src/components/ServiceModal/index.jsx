import React, { useEffect, useState } from "react";
import { Modal, Select } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { crud } from "@/redux/crud/actions";
import { useCrudContext } from "@/context/crud";
import { useControlContext } from "@/context/control";
import { selectListItems } from "@/redux/crud/selectors";
import { valueByString } from "@/utils/helpers";

export default function ServiceModal({ config }) {
  let {
    entity,
    entityDisplayLabels,
    deleteMessage = "Please select services to manage per channel",
    modalTitle = "Change service",
  } = config;
  const dispatch = useDispatch();
  const { crudContextAction } = useCrudContext();
  const { state, controlContextAction } = useControlContext();
  const { isSelectModalOpen } = state;
  const { selectServiceModal } = controlContextAction;
  const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems);
  const { pagination, items } = listResult;
  const [selectedItem, setSelectedItem] = useState(null);
  const [displayItem, setDisplayItem] = useState("");

  useEffect(() => {
    dispatch(crud.list(entity));
  }, []);

  // useEffect(() => {
  //   if (isSuccess) {
  //     modal.close();
  //     dispatch(crud.list(entity));
  //     dispatch(crud.resetAction(entity));
  //   }
  //   if (current) {
  //     let labels = entityDisplayLabels
  //       .map((x) => valueByString(current, x))
  //       .join(" ");

  //     setDisplayItem(labels);
  //   }
  // }, [isSuccess, current]);

  const handleOk = () => {
    // const id = current._id;
    // dispatch(crud.delete(entity, id));
    if (selectedItem) {
      console.log('Selected Item:', selectedItem);
      // You can perform additional actions with the selected item here
    }
    selectServiceModal.close();
  };

  const handleCancel = () => {
    selectServiceModal.close();
  };

  const handleSelectChange = (value) => {
    setSelectedItem(value);
    const selected = items.find(item => item._id === value);
    if (selected) {
      let labels = entityDisplayLabels
        .map((x) => valueByString(selected, x))
        .join(" ");
      setDisplayItem(labels);
    }
  };

  return (
    <Modal
      title={modalTitle}
      visible={isSelectModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={false}
    >
      <p>
        {deleteMessage}
        {displayItem}
      </p>
        <Select
          style={{ width: '100%', marginTop: "20px" }}
          placeholder="Select an endpoint of service"
          onChange={handleSelectChange}
          value={selectedItem}
          loading={listIsLoading}
        >
          {items.map(item => (
            <Select.Option key={item._id} value={item._id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      
    </Modal>
  );
}
