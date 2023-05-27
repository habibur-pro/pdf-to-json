import fs from 'fs';
import PDFParser from 'pdf2json';

// Path to the PDF file you want to convert
const pdfFilePath = './result_6th_2016_regulation.pdf';

// Create a new instance of PDFParser
const pdfParser = new PDFParser();

// Register callback functions for events emitted by the PDFParser
pdfParser.on('pdfParser_dataReady', pdfData => {
    // Convert the parsed PDF data to JSON
    const jsonData = JSON.stringify(pdfData);

    // Write the JSON data to a file
    fs.writeFileSync('output.json', jsonData);

    console.log('Conversion complete. JSON file saved as output.json');
});

pdfParser.on('pdfParser_dataError', err => {
    console.error('Error during PDF parsing:', err);
});

// Load the PDF file and start the parsing process
pdfParser.loadPDF(pdfFilePath);
