const express = require("express");
const router = express.Router();
const authVerify = require("./authVerify");

module.exports = (db, collectionName) => {
  router.get("/qritemdata", authVerify, async (req, res) => {
    try {
      const startDate = req.query.startDate; // Get the start date from query parameter
      const endDate = req.query.endDate; // Get the end date from query parameter
      const qrCodeData = req.query.qrCodeData; // Get the qrCodeData from the request query

      const productsRef = db.collection(collectionName);

      // Build the query to filter data based on the date range
      let query = productsRef;
      if (startDate && endDate) {
        query = query
          .where("date", ">=", new Date(startDate))
          .where("date", "<=", new Date(endDate));
      }

      if (qrCodeData) {
        // If qrCodeData is provided, add it to the existing query
        if (startDate && endDate) {
          // If startDate and endDate are also provided, filter qrCodeData within the date range
          query = query.where("qrCodeData", "==", qrCodeData);
        } else {
          // If only qrCodeData is provided without date range, simply filter by qrCodeData
          query = query.where("qrCodeData", "==", qrCodeData);
        }
      }

      const snapshot = await query.get();

      if (snapshot.empty) {
        console.log("No products found.");
        return res.status(404).json({ message: "No products found" });
      }

      // Prepare the response data
      const responseData = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        const responseDataItem = {
          qrCodeData: data.qrCodeData,
          description: data.description,
        };

        if (data.date) {
          const timestamp = data.date;
          const date = new Date(
            timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000
          );
          responseDataItem.date = date;
        }

        if (data.quantity !== null) {
          responseDataItem.quantity = data.quantity;
        }

        if (data.note !== null) {
          responseDataItem.note = data.note;
        }

        // Only add the item to the response if it has either a note or quantity
        if (
          responseDataItem.quantity !== undefined ||
          responseDataItem.note !== undefined
        ) {
          responseData.push(responseDataItem);
        }
      });

      res.status(200).json(responseData);
    } catch (error) {
      console.error("Error getting product data: ", error);
      res.status(500).json({ error: "Error getting product data" });
    }
  });

  router.get("/qrcodedata", authVerify, async (req, res) => {
    try {
      const productsRef = db.collection(collectionName);
      const snapshot = await productsRef.get();

      if (snapshot.empty) {
        console.log("No products found.");
        return res.status(404).json({ message: "No products found" });
      }

      const qrcodedataList = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          qrCodeData: data.qrCodeData,
          description: data.description,
        };
      });

      res.status(200).json(qrcodedataList);
    } catch (error) {
      console.error("Error getting qrcodedata: ", error);
      res.status(500).json({ error: "Error getting qrcodedata" });
    }
  });

  return router;
};
