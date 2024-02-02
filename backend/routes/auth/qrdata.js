const express = require("express");
const router = express.Router();
const authVerify = require("./authVerify");
module.exports = (db, collectionName) => {
  router.get("/products", authVerify, async (req, res) => {
    try {
      const startDate = req.query.startDate; // Get the start date from query parameter
      const endDate = req.query.endDate; // Get the end date from query parameter
      const productsRef = db.collection(collectionName);

      // Build the query to filter data based on the date range
      let query = productsRef;
      if (startDate && endDate) {
        query = query
          .where("date", ">=", new Date(startDate))
          .where("date", "<=", new Date(endDate));
      }

      const snapshot = await query.get();

      if (snapshot.empty) {
        console.log("No products found.");
        return res.status(404).json({ message: "No products found" });
      }

      // Create an object to store the total quantity and note for each qrCodeData
      const dataByQrCodeData = {};

      snapshot.forEach((doc) => {
        const data = doc.data();
        const qrCodeData = data.qrCodeData;
        const quantity = data.quantity;
        const description = data.description;

        if (!dataByQrCodeData[qrCodeData]) {
          dataByQrCodeData[qrCodeData] = {
            quantity: 0,
            description: description,
          };
        }

        dataByQrCodeData[qrCodeData].quantity += quantity;
      });

      // Convert the data to the desired format
      const response = Object.keys(dataByQrCodeData).map((qrCodeData) => ({
        qrCodeData,
        quantity: dataByQrCodeData[qrCodeData].quantity,
        description: dataByQrCodeData[qrCodeData].description,
      }));

      res.status(200).json(response);
    } catch (error) {
      console.error("Error getting products: ", error);
      res.status(500).json({ error: "Error getting products" });
    }
  });

  router.post("/products", authVerify, async (req, res) => {
    try {
      const { qrCodeData, description } = req.body;

      // Validate required fields
      if (!qrCodeData || !description) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const productsRef = db.collection(collectionName);

      // Create a new document with the provided data
      await productsRef.add({
        qrCodeData,
        description,
      });

      res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
      console.error("Error adding product: ", error);
      res.status(500).json({ error: "Error adding product" });
    }
  });

  router.delete("/productsdelete/:qrCodeData", authVerify, async (req, res) => {
    try {
      const qrCodeDataToDelete = req.params.qrCodeData;

      if (!qrCodeDataToDelete) {
        return res
          .status(400)
          .json({ message: "Missing qrCodeData parameter" });
      }

      const productsRef = db.collection(collectionName);

      // Query the database for the document that matches the qrCodeDataToDelete
      const snapshot = await productsRef
        .where("qrCodeData", "==", qrCodeDataToDelete)
        .get();

      if (snapshot.empty) {
        console.log(`No product found for qrCodeData: ${qrCodeDataToDelete}`);
        return res.status(404).json({
          message: `No product found for qrCodeData: ${qrCodeDataToDelete}`,
        });
      }

      // Delete the document
      snapshot.docs[0].ref.delete();

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product: ", error);
      res.status(500).json({ error: "Error deleting product" });
    }
  });

  return router;
};
