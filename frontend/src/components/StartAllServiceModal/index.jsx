import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/config/serverApiConfig";

import { Modal, Input, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useControlContext } from "@/context/control";
import { valueByString } from "@/utils/helpers";

export default function StartAllServiceModal({ config, currentService }) {
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
  }, [isSuccess, current]);

  const handleOk = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}parser/startall`,
        {
          serviceId: currentService,
          params: additionalParams
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    notification.success({
      message: "Success",
      description: "Starting for all channels..."
    });
    setIsLoading(false);
    startAllModal.close();
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
