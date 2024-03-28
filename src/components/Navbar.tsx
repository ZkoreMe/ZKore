import { FC, useState } from "react";
import { useAutoConnect } from "../contexts/AutoConnectProvider";
import dynamic from "next/dynamic";
import NetworkSwitcher from "../components/NetworkSwitcher";
import Image from "next/image";
import ZKore2 from "../../public/images/Zkore2.svg";
import Link from "next/link";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const Navbar: FC = () => {
  const { autoConnect, setAutoConnect } = useAutoConnect();
  const [toggle, setToggle] = useState<boolean>(false);

  const toggleMenu = () => {
    setToggle(!toggle);
  };

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50">
      <div className=" flex relative h-[69px] w-[340px] justify-between  mt-[36px] border-[2px] border-solid border-[#010100] rounded-[8px] p-[12px] items-center bg-[#FDFDFD]">
        <Link href={"/search"}>
          <div className=" flex flex-col gap-[8px]">
            <span className="flex gap-[8px] items-center">
              <Image src={ZKore2} alt="icon" width={100.72} height={45} />
            </span>
          </div>
        </Link>

        <div className="flex gap-[16px] text-[#65676B]">
          <i className="ri-heart-fill text-[#292824]" style={{ fontSize: "24px" }}></i>
          <i className="ri-user-3-fill text-[#292824]" style={{ fontSize: "24px" }}></i>
          <i
            className="ri-menu-5-line text-[#292824]"
            style={{ fontSize: "24px" }}
            onClick={toggleMenu}
          ></i>
        </div>
      </div>
      {toggle && (
        <div className=" bg-[#F8F4F0] absolute z-10 flex flex-col w-full h-screen items-center pt-[50px] gap-10">
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
          <WalletMultiButtonDynamic className="flex items-center text-[#000000]" />
        </div>
      )}
    </div>
  );
};

export default Navbar;
