const admin = require("firebase-admin");
const serviceAccount = require("./key.json"); // Replace with the actual path to your service account key JSON file

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Get a reference to the Firestore database
const db = admin.firestore();

// Define the name of the collection you want to retrieve data from
const collectionName = "products";

// Create an Express.js server to listen for requests
const express = require("express");
const app = express();
const port = 4003;

app.use(express.json());

// Define a route to retrieve data from Firestore
app.get("/products", async (req, res) => {
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
            const note = data.note;

            if (!dataByQrCodeData[qrCodeData]) {
                dataByQrCodeData[qrCodeData] = {
                    quantity: 0,
                    note: note,
                };
            }

            dataByQrCodeData[qrCodeData].quantity += quantity;
        });

        // Convert the data to the desired format
        const response = Object.keys(dataByQrCodeData).map((qrCodeData) => ({
            qrCodeData,
            quantity: dataByQrCodeData[qrCodeData].quantity,
            note: dataByQrCodeData[qrCodeData].note,
        }));

        res.status(200).json(response);
    } catch (error) {
        console.error("Error getting products: ", error);
        res.status(500).json({ error: "Error getting products" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
