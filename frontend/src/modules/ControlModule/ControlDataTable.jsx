import React, { useEffect, useState, memo, useCallback } from "react";
import { Button, Menu } from "antd";
import { StopOutlined, PlayCircleOutlined, FileTextOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { crud } from "@/redux/crud/actions";
import { useCrudContext } from "@/context/crud";
import { selectListItems } from "@/redux/crud/selectors";
import { useControlContext } from "@/context/control";
import uniqueId from "@/utils/uinqueId";
import ControlTable from "@/components/ControlTable";
import StartServiceModal from "@/components/StartServiceModal";
import ServiceModal from "@/components/ServiceModal";
import StartAllServiceModal from "@/components/StartAllServiceModal";
import LogModal from "@/components/LogModal";

export default function ControlDataTable({ config }) {
  const { entity } = config;
  const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems);
  const { pagination, items } = listResult;
  const dispatch = useDispatch();
  const { crudContextAction } = useCrudContext();
  const [currentService, setCurrentService] = useState(null);
  const [currentChannel, setCurrentChannel] = useState(null);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [channelLogs, setChannelLogs] = useState({});

  const ChangeService = ({ config, setIsLoading }) => {
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
  
  const ActionButton = ({ row, currentService }) => {
    const [isRunning, setIsRunning] = useState(false);
    const { controlContextAction } = useControlContext();
    const { startModal } = controlContextAction;
  
    const handleToggle = async () => {
      try {
        if (!isRunning) {
          setCurrentChannel(row);
          startModal.open();
        }
      } catch (error) {
        console.error("API request failed", error);
      }
    };

    useEffect(() => {
      const channelLog = channelLogs[row.id];
      if (channelLog && channelLog.length > 0) {
        channelLog.forEach(log => {
          if (log.includes('started')) {
            setIsRunning(true);
          } else if (log.includes('completed')) {
            setIsRunning(false);
          }
        });
      }
    }, [channelLogs, row.id]);
  
    return (
      <Button 
        icon={isRunning ? <StopOutlined /> : <PlayCircleOutlined />} 
        onClick={handleToggle}
        style={{ width: "100px"}}
      >
        {isRunning ? "Running" : "Start"}
      </Button>
    );
  }

  // Memoize the ViewLogButton component
  const MemoizedViewLogButton = memo(({ row, setCurrentChannel, setIsLogModalOpen }) => {
    const handleToggle = useCallback(() => {
      setCurrentChannel(row);
      setIsLogModalOpen(true);
      console.log("view log button clicked");
    }, [row, setCurrentChannel, setIsLogModalOpen]);
  
    return (
      <Button
        icon={<FileTextOutlined />}
        onClick={handleToggle}
      >
        View Console Log
      </Button>
    );
  });

  useEffect(() => {
    dispatch(crud.list(entity));
  }, [dispatch, entity]);

  useEffect(() => {
    // Set the first service by default for service modal
    if (items.length > 0) {
      setCurrentService(items[0]._id);
    }
  }, [items]);

  return (
    <>
      <ControlTable
        config={config}
        ActionButton={ActionButton}
        ViewLogButton={({ row }) => (
          <MemoizedViewLogButton
            row={row}
            setCurrentChannel={setCurrentChannel}
            setIsLogModalOpen={setIsLogModalOpen}
          />
        )}
        ChangeService={ChangeService}
        StartAllService={StartAllService}
        currentService={currentService}
      />
      <StartServiceModal
        config={config}
        currentService={currentService}
        currentChannel={currentChannel}
      />
      <ServiceModal
        config={config}
        setCurrentService={setCurrentService}
      />
      <StartAllServiceModal
        config={config}
        currentService={currentService}
      />
      <LogModal
        isLogModalOpen={isLogModalOpen}
        setIsLogModalOpen={setIsLogModalOpen}
        currentService={currentService}
        currentChannel={currentChannel}
        channelLogs={channelLogs}
        setChannelLogs={setChannelLogs}
      />
    </>
  );
}
