import React from 'react'
import ConnectWallet from './components/ConnectWallet'
import MintButton from './components/MintButton'

function page() {
  return (
    <main>
       <ConnectWallet/> 
       <MintButton/>
    </main>
  )
}

export default page