// routes/api.js
const express = require("express");
const { catchErrors } = require("../handlers/errorHandlers");

const router = express.Router();

const adminController = require("../controllers/adminController");
const clientController = require("../controllers/clientController");
const endpointController = require("../controllers/endpointController");
const channelController = require("../controllers/channelController");
const processController = require("../controllers/processController");
const leadController = require("../controllers/leadController");
const productController = require("../controllers/productController");

module.exports = () => {
    //_______________________________ Admin management_______________________________

    router.route("/admin/create").post(catchErrors(adminController.create));
    router.route("/admin/read/:id").get(catchErrors(adminController.read));
    router.route("/admin/update/:id").patch(catchErrors(adminController.update));
    router.route("/admin/delete/:id").delete(catchErrors(adminController.delete));
    router.route("/admin/search").get(catchErrors(adminController.search));
    router.route("/admin/list").get(catchErrors(adminController.list));

    router
      .route("/admin/password-update/:id")
      .patch(catchErrors(adminController.updatePassword));
    //list of admins ends here

    //_____________________________________ API for Endpoints __________________________
    router.route("/endpoint/create").post(catchErrors(endpointController.create));
    router.route("/endpoint/read/:id").get(catchErrors(endpointController.read));
    router.route("/endpoint/update/:id").patch(catchErrors(endpointController.update));
    router.route("/endpoint/delete/:id").delete(catchErrors(endpointController.delete));
    router.route("/endpoint/search").get(catchErrors(endpointController.search));
    router.route("/endpoint/list").get(catchErrors(endpointController.list));

    //____________________________________ API for channels _____________________________
    router.route("/channel/list").post(catchErrors(channelController.ChannelList));

    //____________________________________ API for Parser _____________________________
    router.route("/parser/start").post((req, res) => processController.startProcess(req, res));
    router.route("/parser/startall").post((req, res) => processController.startAllChannels(req, res));
    router.route("/parser/:id/status").get(processController.getProcessStatus);

    //_____________________________________ API for clients __________________________
    router.route("/client/create").post(catchErrors(clientController.create));
    router.route("/client/read/:id").get(catchErrors(clientController.read));
    router.route("/client/update/:id").patch(catchErrors(clientController.update));
    router.route("/client/delete/:id").delete(catchErrors(clientController.delete));
    router.route("/client/search").get(catchErrors(clientController.search));
    router.route("/client/list").get(catchErrors(clientController.list));

    //_____________________________________ API for leads ___________________________
    router.route("/lead/create").post(catchErrors(leadController.create));
    router.route("/lead/read/:id").get(catchErrors(leadController.read));
    router.route("/lead/update/:id").patch(catchErrors(leadController.update));
    router.route("/lead/delete/:id").delete(catchErrors(leadController.delete));
    router.route("/lead/search").get(catchErrors(leadController.search));
    router.route("/lead/list").get(catchErrors(leadController.list));

    //_____________________________________ API for products ___________________________
    router.route("/product/create").post(catchErrors(productController.create));
    router.route("/product/read/:id").get(catchErrors(productController.read));
    router
      .route("/product/update/:id")
      .patch(catchErrors(productController.update));
    router
      .route("/product/delete/:id")
      .delete(catchErrors(productController.delete));
    router.route("/product/search").get(catchErrors(productController.search));
    router.route("/product/list").get(catchErrors(productController.list));

    return router;
};
