import express from 'express';
import PDFParser from 'pdf2json';
import cors from 'cors'
import fs from 'fs'


const app = express();
const port = 3000;

// Express middleware to parse JSON request bodies
app.use(express.json());
app.use(cors())

app.get('/convert', (req, res) => {
    // Retrieve the base64 encoded PDF data from the request body
    const pdfPath = './result_6th_2016_regulation.pdf';
    const pdfData = fs.readFileSync(pdfPath);

    // Convert the binary data to base64 encoding
    const base64Data = pdfData.toString('base64');

    // Convert the base64 data to a Buffer
    const pdfBuffer = Buffer.from(base64Data, 'base64');

    // Create a new instance of PDFParser
    const pdfParser = new PDFParser();

    // Register callback functions for events emitted by the PDFParser
    pdfParser.on('pdfParser_dataReady', pdfData => {
        // Convert the parsed PDF data to JSON
        const jsonData = JSON.stringify(pdfData);

        res.json(jsonData);
    });

    pdfParser.on('pdfParser_dataError', err => {
        console.error('Error during PDF parsing:', err);
        res.status(500).json({ error: 'Error during PDF parsing' });
    });

    // Load the PDF data and start the parsing process
    pdfParser.parseBuffer(pdfBuffer);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});