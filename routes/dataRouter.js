const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Data = require("../models/data");

const dataRouter = express.Router();
dataRouter.use(express.json());

dataRouter
  .route("/")
  .get((req, res) => {
    Data.find({})
      .then((data) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ message: "All Data successfully retrieved", data });
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  })
  .post((req, res) => {
    Data.create(req.body)
      .then((data) => {
        console.log("Data created ", data);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ message: "Data successfully created", data });
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.json({ message: "PUT operation not supported on /data" });
  })
  .delete((req, res) => {
    Data.remove({})
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ message: "All Data fields successfully deleted", resp });
      })
      .catch((err) => res.status(400).json({ message: err.message }));
  });

dataRouter
  .route("/:dataId")
  .get((req, res) => {
    Data.findById(req.params.dataId)
      .then((data) => {
        if (data != null) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({
            message: `Data with ${req.params.dataId} retrieved successfully`,
            data,
          });
        } else {
          return res
            .status(404)
            .json({ message: `Data ${req.params.dataId} not found` });
        }
      })
      .catch((err) => res.status(400).json({ message: err }));
  })
  .post((req, res) => {
    res.status(403).json({
      message: "Post operation not supported on /data/" + req.params.dataId,
    });
  })
  .put((req, res) => {
    Data.findByIdAndUpdate(req.params.dataId, { $set: req.body }, { new: true })
      .then((data) => {
        if (data != null) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ message: "Data successfully updated", data });
        } else {
          return res
            .status(404)
            .json({ message: `Data ${req.params.dataId} not found` });
        }
      })
      .catch((err) => res.status(400).json({ message: err.message }));
  })
  .delete((req, res, next) => {
    Data.findByIdAndRemove(req.params.dataId)
      .then((resp) => {
        if (resp != null) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({
            message: `Data with id ${req.params.dataId} deleted successfully`,
            resp,
          });
        } else {
          //err = new Error(`Data ${req.params.dataId} not found`);
          // err.status = 404;
          return res
            .status(404)
            .json({ message: `Data ${req.params.dataId} not found` });
        }
      })
      .catch((err) => {
        res.status = 400;
        res.json({ message: err.message });
      });
  });

module.exports = dataRouter;
