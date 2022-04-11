import { ethers } from 'ethers'
import { useEffect, useState, createContext } from 'react'
import toast from "react-hot-toast"

let metamask;
if (typeof window !== 'undefined') {
  metamask = window.ethereum
}

import { bitcoinABI, bitcoinAddress, solanaABI, solanaAddress, usdcABI, usdcAddress, dogecoinABI, dogecoinAddress } from "../lib/constants"

export const AirswapContext = createContext()

export const AirswapProvider = ({ children }) => {
  const [coins, setCoins] = useState([])
  const [fromCoin, setFromCoin] = useState({})
  const [toCoin, setToCoin] = useState({})
  const [currentAccount, setCurrentAccount] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const getCoins = async () => {
    try {
      const response = await fetch('/api/getTokens')
      const data = await response.json()
      setCoins(data.data)
      setFromCoin(data.data[0])
      setToCoin(data.data[1])

    } catch (error) {
      toast.error("Oops, we couln't fetch coins from database refresh the page or try later.")
    }
  }

  const getContract = (symbol) => {
    if (!symbol) return

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    switch (symbol) {
      case 'BTC':
        return new ethers.Contract(bitcoinAddress, bitcoinABI, signer)

      case 'USDC':
        return new ethers.Contract(usdcAddress, usdcABI, signer)

      case 'DOGE':
        return new ethers.Contract(dogecoinAddress, dogecoinABI, signer)

      case 'SOL':
        return new ethers.Contract(solanaAddress, solanaABI, signer)

      default:
        return
    }
  }

  useEffect(() => {
    getCoins()
  }, [])


  const swap = async (fromCoin, toCoin, amount, rate) => {
    setIsLoading(true)
    try {
      if (fromCoin.symbol === 'ETH') {
        const contract = getContract(toCoin.symbol)
        const tx = await metamask.request({
          method: 'eth_sendTransaction',
          params: [{
            from: currentAccount,
            to: contract.address,
            value: ethers.utils.parseEther(amount)._hex,
            gas: '0x5710',
          }]
        })
        const tx2 = await contract.mint(currentAccount, ethers.utils.parseUnits(String(rate), toCoin.decimals || 18))
        saveTransaction(tx2.hash, currentAccount, contract.address, currentAccount)
        toast.success("Successfully transfered your coins.")
      } else {
        const toContract = getContract(toCoin.symbol)
        const fromContract = getContract(fromCoin.symbol)
        const tx = await fromContract.transfer(fromContract.address, ethers.utils.parseUnits(String(rate), fromCoin.decimals || 18))
        const tx2 = await toContract.mint(currentAccount, ethers.utils.parseUnits(String(rate), toCoin.decimals || 18))
        saveTransaction(tx2.hash, currentAccount, toContract.address, currentAccount)
        toast.success("Successfully transfered your coins.")
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.error("Oops, your transaction was declined.")
    }
  }

  const saveTransaction = async (hash, from, to, walletAddress) => {
    try {
      await fetch('/api/saveTx', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from,
          to,
          hash,
          walletAddress
        })
      })
    } catch (error) {
      console.error(error)
      toast.error("Oops, we couln't save your transaction to databse.Dont' worry your transaction was still approved.")
    }
  }

  const createUser = async (walletAddress) => {
    try {
      await fetch('/api/createUser', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          walletAddress
        })
      })

    } catch (error) {
      toast.error("Oops, we couln't create you an account, please refresh the page or try again.")
    }
  }

  const checkIfWalletIsConnected = async () => {
    if (!metamask) return
    try {
      const accountsArray = await metamask.request({
        method: 'eth_accounts'
      })

      if (accountsArray.length) {
        setCurrentAccount(accountsArray[0])
        toast.success("Successfully connected with metamask.")
        createUser(accountsArray[0].toLowerCase())
      }
    } catch (error) {
      toast.error("Oops, we could't find your metamask please try again.")
      console.error(error)
    }
  }

  const connectWallet = async () => {
    if (!metamask) return
    try {
      const accountsArray = await metamask.request({
        method: 'eth_requestAccounts'
      })

      if (accountsArray.length) {
        setCurrentAccount(accountsArray[0])
        toast.success("Successfully connected with metamask.")
        createUser(accountsArray[0].toLowerCase())
      }
    } catch (error) {
      toast.error("Oops, we could't find your metamask please try again.")
      console.error(error)
    }
  }

  const disconnect = () => {
    setCurrentAccount("")
    toast.success("Successfully disconnected.")
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  return (
    <AirswapContext.Provider value={{
      coins,
      setCoins,
      fromCoin,
      toCoin,
      setToCoin,
      setFromCoin,
      swap,
      currentAccount,
      connectWallet,
      disconnect,
      isLoading
    }}>
      {children}
    </AirswapContext.Provider>
  )
}
