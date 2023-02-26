const ContractAbi = require("../../smart-contract/artifacts/contracts/UBB.sol/UBB.json");

const ethers = require("ethers");

//v1: 0x27aA42b45F54503E7Ae5c12b8c1E80C9B1Cd5708
//v2: 0xDe03d8a408eaaCF71303a980c10A2b34aD485cBA last Goerli Contract
const constractAddress = "0x247a7B115A2A48dEab0EB03872b0EaeEECD50c00"

// export const getMyInfo = async (setStudentInfo) => {
//   try {
//     const { ethereum } = window;

//     if (ethereum) {
//       const provider = new ethers.providers.Web3Provider(ethereum);
//       const signer = provider.getSigner();
//       const UBB = new ethers.Contract(
//         constractAddress,
//         ContractAbi.abi,
//         signer
//       );

//       const accounts = await ethereum.request({
//         method: "eth_requestAccounts",
//       });
//       let info = await UBB.verifyByAddress(accounts[0]); //itt

//       let [spec, faculty] = await UBB.getSpecializationWithFaculty(
//         info.studentSpecializationName
//       );
//       let facultyName = await UBB.getFaculty(faculty);

//       setStudentInfo(info);
//       setStudentInfo((values) => ({ ...values, ["address"]: accounts[0] })); //itt
//       setStudentInfo((values) => ({
//         ...values,
//         ["faculty"]: facultyName.facultyName,
//       }));
//     } else {
//       console.log(error);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getStudentByAddress = async (setUser, address) => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const UBB = new ethers.Contract(
        constractAddress,
        ContractAbi.abi,
        signer
      );
      let info = await UBB.verifyByAddress(address);
      let [spec, faculty] = await UBB.getSpecializationWithFaculty(
        info.studentSpecializationName
      );
      let facultyName = await UBB.getFaculty(faculty);

      setUser(info);
      setUser((values) => ({
        ...values,
        ["faculty"]: facultyName.facultyName,
      }));
      setUser((values) => ({ ...values, ["address"]: address }));
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getStudentByCNP = async (setUser, CNP) => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const UBB = new ethers.Contract(
        constractAddress,
        ContractAbi.abi,
        signer
      );
      let info = await UBB.verifyByCNP(CNP);
      let address = await UBB.getAddressByID(CNP);
      let [spec, faculty] = await UBB.getSpecializationWithFaculty(
        info.studentSpecializationName
      );
      let facultyName = await UBB.getFaculty(faculty);
      console.log(info);
      setUser(info);
      setUser((values) => ({
        ...values,
        ["faculty"]: facultyName.facultyName,
      }));
      setUser((values) => ({ ...values, ["address"]: address }));
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};
