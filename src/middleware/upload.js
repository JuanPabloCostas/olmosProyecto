const { BlobServiceClient } = require("@azure/storage-blob");
const fs = require("fs");
const generateName = require('./randomname')
const { Readable } = require('stream');

// Replace these with your Azure Storage account credentials
const accountName = "olmos";
const accountKey = "rjMfNvw5fCvlR4JbZ/2noZVdzWDL4YOsOlvN2e0Fwt7Aa+1eVC1LzM0/f58lZjHJRoVLu+/+yC5c+AStVDnjmg==";
const containerName = "files";

// Local path to the file you want to upload
const filePath = "path/to/your/file.txt";


const uploadToAzureStorage = async (file) => {
  // Create BlobServiceClient
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    // `DefaultEndpointsProtocol=https;AccountName=${accountName};AccountKey=${accountKey};EndpointSuffix=core.windows.net`
    `DefaultEndpointsProtocol=https;AccountName=olmos;AccountKey=rjMfNvw5fCvlR4JbZ/2noZVdzWDL4YOsOlvN2e0Fwt7Aa+1eVC1LzM0/f58lZjHJRoVLu+/+yC5c+AStVDnjmg==;EndpointSuffix=core.windows.net`
  );

  // Get a reference to a container
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Get a block blob client
//   const blobName = "yourBlobName"; // specify a name for your blob
  const blobName = file.originalname;
  console.log(blobName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  // Upload the file
//   const stream = fs.createReadStream(filePath);
    // const stream = fs.createReadStream(file.buffer);
    const stream = Readable.from(file.buffer);
  const uploadOptions = {
    bufferSize: 4 * 1024 * 1024, // 4MB buffer size
    maxBuffers: 20, // 20 parallel uploads
  };

  const blobHTTPHeaders = {
    blobContentType: 'application/pdf', // Set the Content-Type
  };

  await blockBlobClient.uploadStream(stream, uploadOptions.bufferSize, uploadOptions.maxBuffers, { blobHTTPHeaders });

  console.log("File uploaded successfully");
}

// Call the function to upload the file
module.exports = uploadToAzureStorage;
