import React from "react";

import { useState } from "react";
import { Button, Menu } from "antd";
import { StopOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { useControlContext } from "@/context/control";
import uniqueId from "@/utils/uinqueId";
import ControlTable from "@/components/ControlTable";
import StartServiceModal from "@/components/StartServiceModal";

function ChangeService({ config }) {
  const { controlContextAction } = useControlContext();
  const { selectServiceModal } = controlContextAction;
  const { ADD_NEW_ENTITY } = config;

  const handleClick = () => {
    selectServiceModal.open();
  };

  return (
    <Button onClick={handleClick} type="primary">
      {ADD_NEW_ENTITY}
    </Button>
  );
}


function ToggleButton({ row }) {
  const [isRunning, setIsRunning] = useState(false);
  const dispatch = useDispatch();
  const { controlContextAction } = useControlContext();
  const { startModal } = controlContextAction;

  const handleToggle = async () => {
    try {
      if (!isRunning) {
        startModal.open();
      }
      setIsRunning(!isRunning);
      // Assuming API request changes the state of the endpoint
      // const response = await axios.post(`/api/endpoint/${row._id}/${isRunning ? 'stop' : 'start'}`);
      // if (response.status === 200) {
      //   setIsRunning(!isRunning);
      // }
    } catch (error) {
      console.error("API request failed", error);
    }
  };

  return (
    <Button 
      icon={isRunning ? <StopOutlined /> : <PlayCircleOutlined />} 
      onClick={handleToggle}
    >
      {isRunning ? "Stop" : "Start"}
    </Button>
  );
}

export default function ControlDataTable({ config }) {
  return (
    <>
      <ControlTable
        config={config}
        ActionButton={ToggleButton}
        ChangeService={ChangeService}
      />
      <StartServiceModal config={config}/>
    </>
  );
}
