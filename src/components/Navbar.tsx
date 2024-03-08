import { FC } from "react";
import { useAutoConnect } from "../contexts/AutoConnectProvider";
import dynamic from "next/dynamic";
import NetworkSwitcher from "../components/NetworkSwitcher";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const Navbar: FC = () => {
  const { autoConnect, setAutoConnect } = useAutoConnect();

  return (
    <div className="flex gap-10 flex-col md:flex-row md:justify-evenly justify-evenly items-center mt-5">
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
  );
};

export default Navbar;
