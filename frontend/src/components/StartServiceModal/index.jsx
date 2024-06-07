import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/config/serverApiConfig";
import { Modal, Input, notification } from "antd";
import { useDispatch } from "react-redux";
import { useControlContext } from "@/context/control";
import { valueByString } from "@/utils/helpers";

export default function StartServiceModal({
  config,
  currentService,
  currentChannel
}) {
  let {
    entity,
    entityDisplayLabels,
    descriptionText = "Start parser with this channel using following parameters(optional):",
    modalTitle = "Start service",
  } = config;
  const dispatch = useDispatch();
  const { state, controlContextAction } = useControlContext();
  const { isStartModalOpen } = state;
  const { startModal } = controlContextAction;
  const [additionalParams, setAdditionalParams] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const current = null; // This appears to be unused and unnecessary
  const isSuccess = false; // This appears to be unused and unnecessary

  useEffect(() => {
    if (isSuccess) {
      startModal.close();
    }
    if (current) {
      let labels = entityDisplayLabels
        .map((x) => valueByString(current, x))
        .join(" ");
      // setDisplayItem(labels); // Ensure you have setDisplayItem in your component state if needed
    }
  }, [isSuccess, current, entityDisplayLabels, startModal]);

  const handleOk = async () => {
    if (!currentService || !currentChannel) {
      notification.error({
        message: "Missing Information",
        description: "Service or channel information is missing. Please select both."
      });
      return;
    }

    setIsLoading(true);
    console.log(`Starting service ${currentService} with channel ${currentChannel.id} and params ${additionalParams}`);

    try {
      const response = await axios.post(`${API_BASE_URL}parser/start`, {
        serviceId: currentService,
        channelId: currentChannel.id,
        params: additionalParams
      });
      console.log("API response:", response);
      notification.success({
        message: "Success",
        description: "Service started successfully"
      });
    } catch (err) {
      console.error("API error:", err);
      notification.error({
        message: "Error",
        description: "Failed to start the service"
      });
    }

    setIsLoading(false);
    startModal.close();
  };

  const handleCancel = () => {
    if (!isLoading) startModal.close();
  };

  const handleInputChange = (e) => {
    setAdditionalParams(e.target.value);
  };

  return (
    <Modal
      title={modalTitle}
      visible={isStartModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={isLoading}
    >
      <div>
        <p>{descriptionText}</p>
        <div style={{ marginTop: "20px" }}>
          <Input
            value={additionalParams}
            onChange={handleInputChange}
            placeholder="EX: --proxy sling=http://proxy_domain.com/ -p /out/1808"
          />
        </div>
      </div>
    </Modal>
  );
}
