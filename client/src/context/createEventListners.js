import { ethers } from "ethers";
import { ABI } from "../contract";
import { providers } from "web3modal";

const AddNewEvent = (eventFilter, provider, cb) => {
  provider.removeListener(eventFilter); // not have mltiple lstnrs for the same event
  provider.on(eventFilter, (logs) => {
    const parseLog = new ethers.utils.Interface(ABI).parseLog(logs);

    cb(parseLog);
  });
};

export const createEventListeners = ({navigate, contract, provider, walletAddress, setShowAlert}) => {
  const NewPlayerEventFilter = contract.filters.NewPlayer();

  AddNewEvent(NewPlayerEventFilter, provider, ({ args }) => {
    console.log("New player created", args);

    if (walletAddress === args.owner) {
      setShowAlert({
        status: true,
        type: success,
        message: "Player has been successfully registered",
      });
    }
  });
};
