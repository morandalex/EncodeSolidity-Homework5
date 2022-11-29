
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useProvider } from 'wagmi'
import { useSigner } from 'wagmi'

export default function Home() {

  const provider = useProvider()
  const signer = useSigner()

  return (<>
 <ConnectButton></ConnectButton>
  
  </>
  
  )
}
