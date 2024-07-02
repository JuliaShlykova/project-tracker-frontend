import imageCompression from 'browser-image-compression';

const compressedImg = async (file) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 900,
    useWebWorker: true,
  }

  const compressedFile = await imageCompression(file, options);

  return compressedFile;
};

export default compressedImg;