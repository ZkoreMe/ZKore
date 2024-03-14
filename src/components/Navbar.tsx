import { FC, useState } from "react";
import { useAutoConnect } from "../contexts/AutoConnectProvider";
import dynamic from "next/dynamic";
import NetworkSwitcher from "../components/NetworkSwitcher";
import Image from "next/image";
import ZKore from "../../public/ZKoreIcon.svg";
import { TruckIcon } from "@heroicons/react/outline";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const Navbar: FC = () => {
  const { autoConnect, setAutoConnect } = useAutoConnect();
  const [toggle, setToggle] = useState<boolean>(false);
  6556655;

  const toggleMenu = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      {/*<div className="flex gap-10 flex-col md:flex-row md:justify-evenly justify-evenly items-center mt-5">
      
    </div> */}
      <div className=" flex justify-between mr-[25px] ml-[25px] mt-[36px]">
        <div className=" flex flex-col gap-[8px]">
          <span className="flex gap-[8px] items-center">
            <Image src={ZKore} alt="icon" />
            <h1 className="text-[21px] font-semibold">ZKore</h1>
          </span>
          <span className="text-[10px] text-[#777E90] font-normal">
            <h1>Discover, Review, Earn</h1>
          </span>
        </div>
        <div className="flex gap-[16px] text-[#65676B]">
          <i className="ri-heart-fill" style={{ fontSize: "24px" }}></i>
          <i className="ri-user-3-fill" style={{ fontSize: "24px" }}></i>
          <i className="ri-menu-5-line" style={{ fontSize: "24px" }} onClick={toggleMenu}></i>
        </div>
      </div>
      {toggle && (
        <div className=" bg-[#F0F0F0] absolute flex flex-col w-full h-screen items-center justify-evenly" >
          <label className="flex flex-col items-center gap-2">
            <span>Autoconnect</span>
            <input
              type="checkbox"
              checked={autoConnect}
              onChange={(e) => setAutoConnect(e.target.checked)}
              className="toggle"
            />
          </label>
          <NetworkSwitcher />
          <WalletMultiButtonDynamic className="flex items-center" />
        </div>
      )}
    </div>
  );
};

export default Navbar;
