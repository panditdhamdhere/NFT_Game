import React, { useState } from "react";
import { PageHOC, CustomInput, CustomButton } from "../components";
import { useGlobalContext } from "../context";

const Home = () => {
  const { contract, walletAddress, setShowAlert } = useGlobalContext();
  const [playerName, setPlayerName] = useState("");

  const handleClick = async () => {
    try {
      const playerExist = await contract.isPlayer(walletAddress);

      if (!playerExist) {
        await contract.registerPlayer(playerName, playerName);

        setShowAlert({
          status: true,
          type: "info",
          message: `${playerName} is being summoned!`,
        });
      }
    } catch (error) {
      setShowAlert({
        status: true,
        type: "failure",
        message: "something went wrong!"
      });
    }
  };

  return (
    <div className="flex flex-col">
      <CustomInput
        label="Name"
        placeHolder="Enter your Player Name eg: pandit"
        value={playerName}
        handleValueChange={setPlayerName}
      />
      <CustomButton
        title="Register"
        handleClick={handleClick}
        restStyles="mt-6"
      />
    </div>
  );
};

export default PageHOC(
  Home,
  <>
    Welcome to Avax Gods <br /> a web3 NFT card game!
  </>,
  <>
    Connect your wallet to start playing <br /> the ultimate battlecard game
  </>
);
