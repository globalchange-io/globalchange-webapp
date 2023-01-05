// import fs from "fs";
// import { read, write } from "xlsx";
// import Image, { createCanvas } from "canvas";

// export default async function layerGifOnImage(url, fixedImageUrl) {
//   console.log(url, fixedImageUrl);
//   // Read the Excel file from the specified URL
//   const workbook = read(await fs.promises.readFile(url), {
//     type: "buffer",
//   });

//   // Get the first sheet in the workbook
//   const sheet = workbook.Sheets[workbook.SheetNames[0]];

//   // Get the list of media objects in the sheet
//   const media = sheet["!media"];

//   // Find the media object with the GIF image
//   const gifMedia = Object.values(media).find((m) => m.Type === "gif");

//   // Extract the GIF image from the media object
//   const gifBuffer = write.buffer.decode(gifMedia.Content);

//   // Load the GIF image into an image object
//   const gifImage = new Image();
//   gifImage.src = gifBuffer;

//   // Load the fixed image into an image object
//   const fixedImage = new Image();
//   fixedImage.src = await fs.promises.readFile(fixedImageUrl);

//   // Create a canvas to draw the layered image on
//   const canvas = createCanvas(fixedImage.width, fixedImage.height);
//   const ctx = canvas.getContext("2d");

//   // Draw the fixed image on the canvas
//   ctx.drawImage(fixedImage, 0, 0);

//   // Calculate the x and y coordinates to center the GIF image on the canvas
//   const x = (fixedImage.width - gifImage.width) / 2;
//   const y = (fixedImage.height - gifImage.height) / 2;

//   // Draw the GIF image on the canvas
//   ctx.drawImage(gifImage, x, y);

//   // Convert the canvas to a buffer
//   const layeredImageBuffer = canvas.toBuffer();

//   // Save the layered image to a file
//   await fs.promises.writeFile("layered-image.png", layeredImageBuffer);
// }
