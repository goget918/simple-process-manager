import React from "react";

import { useState, useEffect } from "react";
import { Button, Menu } from "antd";
import { StopOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { crud } from "@/redux/crud/actions";
import { useCrudContext } from "@/context/crud";
import { selectListItems } from "@/redux/crud/selectors";
import { useControlContext } from "@/context/control";
import uniqueId from "@/utils/uinqueId";
import ControlTable from "@/components/ControlTable";
import StartServiceModal from "@/components/StartServiceModal";
import ServiceModal from "@/components/ServiceModal";
import StartAllServiceModal from "@/components/StartAllServiceModal";

export default function ControlDataTable({ config }) {
  const { entity } = config;
  const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems);
  const { pagination, items } = listResult;
  const dispatch = useDispatch();
  const { crudContextAction } = useCrudContext();
  const [currentService, setCurrentService] = useState(null);


  const ChangeService = ({ config, setIsLoading }) => {
    const { controlContextAction } = useControlContext();
    const { selectServiceModal } = controlContextAction;
    const { ADD_NEW_ENTITY } = config;
  
    const handleClick = () => {
      selectServiceModal.open();
      setIsLoading(true);
    };
  
    return (
      <Button onClick={handleClick} type="primary">
        {ADD_NEW_ENTITY}
      </Button>
    );
  }
  
  const StartAllService = () => {
    const { controlContextAction } = useControlContext();
    const { startAllModal } = controlContextAction;
  
    const handleClick = () => {
      startAllModal.open();
    };
  
    return (
      <Button onClick={handleClick} type="primary">
        Start for all channels
      </Button>
    );
  }
  
  
  const ToggleButton = ({ row }) => {
    const [isRunning, setIsRunning] = useState(false);
    // const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(crud.list(entity));
  }, []);

  useEffect(() => {
    // Set the first 
    if (items.length > 0) {
      setCurrentService(items[0]._id);
    }
  }, [items]);

  return (
    <>
      <ControlTable
        config={config}
        ActionButton={ToggleButton}
        ChangeService={ChangeService}
        StartAllService={StartAllService}
        currentService={currentService}
      />
      <StartServiceModal config={config}/>
      <ServiceModal config={config} setCurrentService={setCurrentService} />
      <StartAllServiceModal config={config} />
    </>
  );
}
