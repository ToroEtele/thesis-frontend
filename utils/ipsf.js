import Moralis from "moralis";

export default async function uploadToIpfs(file) {
  if (!Moralis.Core.isStarted) {
    await Moralis.start({
      apiKey:
        "vPDf60qQWPkQG7QWlDrD0cMsPrgWN8UFTzjvFvxaNVNRIo6uxWFYtBmkoaavNvsM",
    });
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const fileUploads = [
        {
          path: file.name,
          content: reader.result,
        },
      ];
      try {
        const res = await Moralis.EvmApi.ipfs.uploadFolder({
          abi: fileUploads,
        });
        resolve(res.toJSON());
      } catch (error){
        reject(error)
      }
    };
    reader.onerror = (error) => {
      reject(error)
    };
  })
}
