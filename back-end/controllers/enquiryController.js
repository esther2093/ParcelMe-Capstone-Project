"use strict";
const Models = require("../models");

const getEnquiries = (res) => {
  Models.Enquiry.findAll({})
    .then(function (data) {
      res.status(200).json({ result: "Enquiry data fetched successfully", data: data });
    })
    .catch((err) => {
      res.status(500).json({ result: err.message });
    });
};

const createEnquiry = (data, res) => {
  Models.Enquiry.create(data)
    .then(function (data) {
      res.status(200).json({ result: "Enquiry created successfully", data: data });
    })
    .catch((err) => {
      res.status(500).json({ result: err.message });
    });
};

const registerEnquiry = async (req, res) => {
  try {
    const { tripId, userId, comments, accepted } = req.body;

    if (!comments) {
      res.status(400).json({ result: "Please fill in your enquiry" });
      return;
    }

    const enquiryMetadata = await Models.Enquiry.create({
      tripId,
      userId,
      comments,
      accepted: null,
    });
    const enquiry = enquiryMetadata.get({ plain: true });

    res.status(201).json({ result: "Your enquiry has been successfully sent!", data: enquiry });
  } catch (err) {
    console.log(err); 
    res.status(500).json({ result: err.message });
  }
};

const getEnquiryById = (req, res) => {
  Models.Enquiry.findOne({ where: { id: req.params.id } })
    .then(function (Enquiry) {
      res.status(200).json({ result: "Enquiry data fetched successfully", data: Enquiry });
    })
    .catch((err) => {
      res.status(500).json({ result: "Unable to find enquiry" + err.message });
    });
};

const updateEnquiry = (req, res) => {
  Models.Enquiry.update(req.body, { where: { id: req.params.id } })
    .then(function (data) {
      res.status(200).json({ result: "Enquiry updated successfully", data: data });
    })
    .catch((err) => {
      res.status(500).json({ result: err.message });
    });
};

const deleteEnquiry = (req, res) => {
  Models.Enquiry.destroy({ where: { id: req.params.id } })
    .then(function (data) {
      res.status(200).json({ result: "Enquiry deleted successfully", data: data });
    })
    .catch((err) => {
      res.status(500).json({ result: err.message });
    });
};

module.exports = {
    getEnquiries,
  createEnquiry,
  registerEnquiry,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
};
