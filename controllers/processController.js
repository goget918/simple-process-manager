const { spawn } = require('child_process');
const axios = require('axios');
const Process = require('../models/Process');
const Endpoint = require('../models/Endpoint');

exports.startProcess = async (req, res) => {
    try {
        const { serviceId, channelId, params } = req.body;

        // Validate and sanitize inputs
        if (!serviceId || !channelId ) {
            return res.status(400).json({ error: 'Invalid request parameters' });
        }

        const endpoint = await Endpoint.findById(serviceId);
        if (!endpoint) {
            return res.status(404).json({ error: 'Service not found' });
        }

        const endpointUrl = endpoint.url;
        const parts = endpointUrl.split('/');
        const serviceName = parts[parts.length - 2];

        // Check for existing process with the same channelid and serviceid
        let existingProcess = await Process.findOne({ serviceid: serviceId, channelid: channelId });

        let processId;

        if (existingProcess) {
            // Overwrite the existing process
            existingProcess.status = 'running';
            existingProcess.params = params;
            existingProcess.logs = [];
            await existingProcess.save();
            processId = existingProcess._id;
        } else {
            // Create a new process
            const newProcess = new Process({
                status: 'running',
                params,
                serviceid: serviceId,
                channelid: channelId,
                logs: []
            });
            await newProcess.save();
            processId = newProcess._id;
        }

        const updateLog = async (processId, log) => {
            await Process.updateOne({ _id: processId }, { $push: { logs: log } });
            global.io.emit('log', { processId, channelId, log });
        };

        const child = spawn('bash', ['./parser/parser.sh', '-s', serviceName, '-i', channelId, ...params.split(' ')]);

        child.stdout.on('data', async (data) => {
            await updateLog(processId, data.toString());
        });

        child.stderr.on('data', async (data) => {
            await updateLog(processId, data.toString());
        });

        child.on('close', async (code) => {
            const status = code === 0 ? 'completed' : 'error';
            await Process.updateOne({ _id: processId }, { status });
            global.io.emit('status', { processId, channelId, status });
            console.log(`Process ${processId} finished with status: ${status}`);
        });

        res.status(200).json({ _id: processId });
    } catch (error) {
        console.log('Error starting process:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.startAllChannels = async (req, res) => {
    try {
        const { serviceId, params } = req.body;

        // Validate and sanitize inputs
        if (!serviceId) {
            return res.status(400).json({ error: 'Invalid request parameters' });
        }

        const endpoint = await Endpoint.findById(serviceId);
        if (!endpoint) {
            return res.status(404).json({ error: 'Service not found' });
        }

        const endpointUrl = endpoint.url;
        const parts = endpointUrl.split('/');
        const serviceName = parts[parts.length - 2];

        // Fetch channels from the endpoint
        const response = await axios.get(endpoint.url, {
            headers: {
                'Accept': 'application/json'
            }
        });

        res.status(200).json({ message: 'Starting all process channels...' });

        const channels = response.data;

        // Throttle or limit the number of concurrent processes
        const maxConcurrentProcesses = 1; // Adjust based on your system capacity
        const delayBetweenSpawns = 3000; // Delay in milliseconds to prevent overwhelming the system

        const updateLog = async (processId, channelId, log) => {
            await Process.updateOne({ _id: processId }, { $push: { logs: log } });
            global.io.emit('log', { processId, channelId, log });
        };

        // Function to handle each channel processing
        const handleChannel = async (channel) => {
            const channelId = channel.id;
            let processId;

            let existingProcess = await Process.findOne({ serviceid: serviceId, channelid: channelId });

            if (existingProcess) {
                if (existingProcess.status == 'running') {
                    return;
                }
                // Overwrite the existing process
                existingProcess.status = 'running';
                existingProcess.params = params;
                existingProcess.logs = [];
                await existingProcess.save();
                processId = existingProcess._id;
            } else {
                // Create a new process
                const newProcess = new Process({
                    status: 'running',
                    params,
                    serviceid: serviceId,
                    channelid: channelId,
                    logs: []
                });
                await newProcess.save();
                processId = newProcess._id;
            }

            const child = spawn('bash', ['./parser/parser.sh', '-s', serviceName, '-i', channelId, ...params.split(' ')]);

            child.stdout.on('data', async (data) => {
                await updateLog(processId, channelId, data.toString());
            });

            child.stderr.on('data', async (data) => {
                await updateLog(processId, channelId, data.toString());
            });

            child.on('close', async (code) => {
                const status = code === 0 ? 'completed' : 'error';
                await Process.updateOne({ _id: processId }, { status });
                global.io.emit('status', { processId, channelId, status });
            });
        };

        // Function to process channels with throttling
        const processChannels = async () => {
            for (let i = 0; i < channels.length; i++) {
                await handleChannel(channels[i]);
                if ((i + 1) % maxConcurrentProcesses === 0) {
                    // Introduce a delay to throttle the process spawning
                    await new Promise(resolve => setTimeout(resolve, delayBetweenSpawns));
                }
            }
        };

        // Start processing channels
        await processChannels();

    } catch (error) {
        console.log('Error starting process:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getProcessStatus = async (req, res) => {
    const { id } = req.params;
    const process = await Process.findById(id);
    res.status(200).json(process);
};
