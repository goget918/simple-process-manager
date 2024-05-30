import React, { useEffect, useState } from "react";
import { Modal, Input } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { useControlContext } from "@/context/control";
import { valueByString } from "@/utils/helpers";

export default function StartAllServiceModal({ config }) {
  let {
    entity,
    entityDisplayLabels,
    descriptionText = "Start parser with all channels of the current service, using following parameters(optional):",
    modalTitle = "Start service",
  } = config;
  const dispatch = useDispatch();
  const { state, controlContextAction } = useControlContext();
  const { isStartAllModalOpen } = state;
  const { startAllModal } = controlContextAction;
  const [additionalParams, setAdditionalParams] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const current = null;
  const isSuccess = false;

  useEffect(() => {
    if (isSuccess) {
      startAllModal.close();
    }
    if (current) {
      let labels = entityDisplayLabels
        .map((x) => valueByString(current, x))
        .join(" ");

      // setDisplayItem(labels);
    }
  }, [isSuccess, current]);

  const handleOk = () => {
    setIsLoading(true);
    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
      startAllModal.close();
    }, 2000);
  };
  const handleCancel = () => {
    if (!isLoading) startAllModal.close();
  };

  const handleInputChange = (e) => {
    setAdditionalParams(e.target.value);
  };

  return (
    <Modal
      title="Start parser for all channels"
      visible={isStartAllModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={isLoading}
    >
      <p>
        {descriptionText}
      </p>

      <div style={{ marginTop: "20px" }}>
        <Input
          value={additionalParams}
          onChange={handleInputChange}
          placeholder="EX: --proxy sling=http://proxy_domain.com/ -p /out/1808"
        />
      </div>
      
    </Modal>
  );
}
