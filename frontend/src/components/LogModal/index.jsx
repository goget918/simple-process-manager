import React, { useEffect, useState, useCallback } from "react";
import io from 'socket.io-client';
import { Modal, Button } from "antd";
import { SERVER_URL } from "@/config/serverApiConfig";
import _ from 'lodash';

export default function LogModal({
  isLogModalOpen,
  setIsLogModalOpen,
  currentChannel,
  channelLogs,
  setChannelLogs
}) {
  const [logBuffer, setLogBuffer] = useState({});

  // Throttled function to update logs
  const updateLogs = useCallback(_.throttle((logs) => {
    setChannelLogs((prevLogs) => {
      const updatedLogs = { ...prevLogs };

      // Accumulate logs for each channel
      Object.keys(logs).forEach(channelId => {
        if (!updatedLogs[channelId]) {
          updatedLogs[channelId] = [];
        }
        updatedLogs[channelId] = [...updatedLogs[channelId], ...logs[channelId]];
      });

      return updatedLogs;
    });
  }, 500), [setChannelLogs]); // Throttle to update every 500ms

  useEffect(() => {
    const socket = io(SERVER_URL);

    socket.on('connect', () => {
      console.log('WebSocket connection opened');
    });

    socket.on('log', (message) => {
      setLogBuffer((prevBuffer) => {
        const updatedBuffer = { ...prevBuffer };
        if (!updatedBuffer[message.channelId]) {
          updatedBuffer[message.channelId] = [];
        }
        updatedBuffer[message.channelId].push(message.log);
        return updatedBuffer;
      });
    });

    socket.on('status', (message) => {
      setLogBuffer((prevBuffer) => {
        const updatedBuffer = { ...prevBuffer };
        if (!updatedBuffer[message.channelId]) {
          updatedBuffer[message.channelId] = [];
        }
        updatedBuffer[message.channelId].push(`Process finished with status: ${message.status}`);
        return updatedBuffer;
      });
    });

    socket.on('disconnect', () => {
      console.log('WebSocket connection closed');
    });

    return () => {
      socket.disconnect();
    };
  }, [updateLogs]);

  // Effect to apply buffered logs using throttled function
  useEffect(() => {
    if (Object.keys(logBuffer).length > 0) {
      updateLogs(logBuffer);
      setLogBuffer({}); // Clear the buffer after applying updates
    }
  }, [logBuffer, updateLogs]);

  const handleOk = () => {
    setIsLogModalOpen(false);
  };

  return (
    <Modal
      title={"Log"}
      visible={isLogModalOpen}
      onOk={handleOk}
      onCancel={handleOk} // Added onCancel to close the modal
      footer={[
        <Button key="ok" type="primary" onClick={handleOk}>
          Confirm
        </Button>,
      ]}
      confirmLoading={false}
    >
      <div
        style={{
          maxHeight: '300px',
          overflowY: 'auto',
          background: '#f5f5f5',
          padding: '10px',
        }}
      >
        <pre>
          {(channelLogs[currentChannel?.id] || []).map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </pre>
      </div>
    </Modal>
  );
}
