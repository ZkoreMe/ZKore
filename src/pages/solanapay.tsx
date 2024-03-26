import { createQR, encodeURL, TransferRequestURLFields, findReference, validateTransfer, FindReferenceError, ValidateTransferError } from "@solana/pay";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef } from "react";
//import BackLink from "../components/BackLink";
//import PageHeading from "../components/PageHeading";
//import { shopAddress, usdcAddress } from "../lib/addresses";
//import calculatePrice from "../lib/calculatePrice";
import { useState } from "react"
import BigNumber from "bignumber.js";

////////////
import { PublicKey } from "@solana/web3.js"

export default function Checkout() {
  const [value, setValue] = useState('1');
  const [start, setStart] = useState(false);
  const [count, setCount] = useState(0);

  const router = useRouter()
  const qrRef = useRef<HTMLDivElement>(null) // ref to a div where we'll show the QR code
  let amount = new BigNumber(0);// useMemo(() => calculatePrice(router.query), [router.query])
  const reference = useMemo(() => Keypair.generate().publicKey, []) // Unique address that we can listen for payments to
  const network = WalletAdapterNetwork.Devnet // TODO Mainnet
  const endpoint = clusterApiUrl(network)
  const connection = new Connection(endpoint)

  function checkPrice(){
    let new_price = new BigNumber(0);
    new_price = new_price.plus(+amount/+value) 
    return new_price
  }

  const shopAddress = new PublicKey('9DGH6yyCtjkYTM5fWX1e8933kuJz9txwRbNSuT2mR7he') 
  const usdcAddress = new PublicKey('Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr')

  function upgradeData() {
    console.log("count",count)
    let new_amount = new BigNumber(10);
    new_amount = new_amount.plus(+amount/+value)

    const urlParams: TransferRequestURLFields = {
      recipient: shopAddress,
      splToken: usdcAddress,
      amount: new_amount,
      reference,
      label: "ZKore",
      message: "Thank you for your purchase!",
    }

    const url = encodeURL(urlParams)
    const qr = createQR(url, 300, 'transparent')
    
    //alert(qrRef)
    qrRef.current.innerHTML = ''
      qr.append(qrRef.current)
      setStart(true)

    if (qrRef.current && new_amount.isGreaterThan(0)) {
      
    }
  }
  
  useEffect( () => {
    console.log(count)
  }, [count])

  // Check every 0.5s if the transaction is completed
  useEffect(() => {
    if (start) {
      const interval = setInterval(async () => {
        try {
          const signatureInfo = await findReference(connection, reference, { finality: 'confirmed' })
          amount = checkPrice()

          await validateTransfer(
            connection,
            signatureInfo.signature,
            {
              recipient: shopAddress,
              amount,
              splToken: usdcAddress,
              reference,
            },
            { commitment: 'confirmed' }
          )

          if (+count < +value){
            setStart(false)
            setCount(count + 1)
            console.log(count)
            
          }else{
            router.push('/confirmed')
          }
          
        } catch (e) {
          if (e instanceof FindReferenceError) {
            // No transaction found yet, ignore this error
            return;
          }
          if (e instanceof ValidateTransferError) {
            // Transaction is invalid
            console.error('Transaction is invalid', e)
            return;
          }
          console.error('Unknown error', e)
        }
      }, 500)
      return () => {
        clearInterval(interval)
      }
    }
  }, [amount,start,count]) 


  return (
    <div className="flex flex-col items-center gap-8 mt-[50px]">
      

      <button 
        className="w-[300px] h-[50px] bg-[#FDFDFD] rounded-[50px] font-semibold text-[16px] text-[#000000] " 
        onClick={upgradeData}
      >Show QR</button> 


      {/* div added to display the QR code */}
      <div 
        className="w-[300px] h-[300px] bg-[#FDFDFD] rounded-[50px] font-semibold text-[16px] text-[#000000] " 
        ref={qrRef} 
      />
    </div>
  )
}