const fs = require("fs");
const axios = require("axios");
const Endpoint = require("../models/Endpoint");

async function readFile(filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, function (error, data) {
      if (error) return reject(error);
      resolve(data.toString("base64"));
    });
  });
}

class channelController {
  static ChannelList = async (req, res, next) => {
  try {
    const endpoint = await Endpoint.findById(req.body.id);
    if (!endpoint) {
        return res.status(404).json({
            success: false,
            result: [],
            message: "No registered endpoint data, please add new one.",
      });
    }

    const channelList = await axios.get(endpoint.url , {
        headers: {
          'Accept': 'application/json'
        }
      });
        
    return res.status(200).json({
        success: true,
        result: {
            service: endpoint.name,
            channels: channelList.data
        },
        message: "Successfully found all documents",
      });

    //  Query the database for a list of all results
    // const resultsPromise = Model.find()
    //   .skip(skip)
    //   .limit(limit)
    //   .sort({ created: "desc" })
    //   .populate();
    // // Counting the total documents
    // const countPromise = Model.countDocuments();
    // // Resolving both promises
    // const [result, count] = await Promise.all([resultsPromise, countPromise]);
    // // Calculating total pages
    // const pages = Math.ceil(count / limit);

    // // Getting Pagination Object
    // const pagination = { page, pages, count };
    // if (count > 0) {
    
    // } else {
    //   return res.status(203).json({
    //     success: true,
    //     result: [],
    //     pagination,
    //     message: "No registered data, please add new one.",
    //   });
    // }
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .json({ success: false, result: [], message: "Oops there is an Error" });
  }
  };
}

module.exports = channelController;
