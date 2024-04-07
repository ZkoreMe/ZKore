import { FC } from 'react';
import dynamic from 'next/dynamic';
import { useNetworkConfiguration } from '../contexts/NetworkConfigurationProvider';

const NetworkSwitcher: FC = () => {
  const { networkConfiguration, setNetworkConfiguration } = useNetworkConfiguration();

  console.log(networkConfiguration);

  return (
    <label className="flex flex-col items-center font-bold gap-2">
      <a>Network</a>
      <select             
        value={networkConfiguration}
        onChange={(e) => setNetworkConfiguration(e.target.value)} 
        className="w-[120px] rounded-md bg-[#FA5D31] h-[50px] text-center"
      > 
        <option value="mainnet-beta">MAIN</option>
        <option value="devnet">DEV</option>
        <option value="testnet">TEST</option>
      </select>
    </label>
  );
};

export default dynamic(() => Promise.resolve(NetworkSwitcher), {
  ssr: false
})