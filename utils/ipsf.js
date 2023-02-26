import Moralis from "moralis";

export default async function uploadToIpfs(file) {
  await Moralis.start({
    apiKey: "vPDf60qQWPkQG7QWlDrD0cMsPrgWN8UFTzjvFvxaNVNRIo6uxWFYtBmkoaavNvsM",
  });

  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async () => {
    const fileUploads = [
      {
        path: file.name,
        content: reader.result,
      },
    ];
    console.log(fileUploads);
    const res = await Moralis.EvmApi.ipfs.uploadFolder({
      abi: fileUploads,
    });
    return res.toJSON();
  };
}
