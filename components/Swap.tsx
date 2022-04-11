import { useEffect, useState, useContext } from 'react'
import { HiChevronDown } from 'react-icons/hi'
import Image from 'next/image'
import PulseLoader from 'react-spinners/PulseLoader'

import { AirswapContext } from '../context/AirswapContext'
import ethLogo from '../assets/ethLogo.svg'
import solLogo from '../assets/solLogo.png'
import dogeLogo from '../assets/dogeLogo.png'
import btcLogo from '../assets/btcLogo.png'

const fakeTokens = [
  {
    name: 'Ether',
    symbol: 'ETH',
    balance: '2.33326',
    image: ethLogo,
    address: '0x0',
  },
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    balance: '0.8',
    image: btcLogo,
    address: '0x123',
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    balance: '101.09',
    image: solLogo,
    address: '0x124',
  },
  {
    name: 'Dogecoin',
    symbol: 'DOGE',
    balance: '1000.01',
    image: dogeLogo,
    address: '0x125',
  },
]

interface Token {
  name: string
  symbol: string
  balance: string
  image: string
  address: string
}

interface Props {
  coins: Token[]
}

const Swap = () => {
  const {
    coins,
    setCoins,
    setToCoin,
    toCoin,
    setFromCoin,
    fromCoin,
    swap,
    currentAccount,
    isLoading,
  } = useContext(AirswapContext)
  const [amountInput, setAmountInput] = useState<string>('')
  const [componentState, setComponentState] = useState<string>('swap')
  const [searchCoin, setSearchCoin] = useState<string>('')
  const [currentRate, setCurrentRate] = useState<number>(0.0)

  const getButtonLabel = () => {
    if (!toCoin || !fromCoin) return 'Please select coin'
    else if (!currentAccount) return 'Please connect your metamask'
    else if (!amountInput) return 'Please type in the transfer amount'
    else if (fromCoin.symbol === toCoin.symbol)
      return "You can't transfer between same coins"
    else return 'Swap'
  }

  useEffect(() => {
    if (searchCoin) {
      const filteredCoins = coins.filter(
        (coin: Token) =>
          coin.symbol.toLowerCase().includes(searchCoin.toLowerCase()) ||
          coin.address.toLowerCase().includes(searchCoin.toLowerCase())
      )
      setCoins(filteredCoins)
    } else {
      setCoins(fakeTokens)
    }
  }, [searchCoin])

  useEffect(() => {
    setAmountInput(amountInput.replace(',', '.'))
    if (fromCoin.symbol === 'ETH') setCurrentRate(Number(amountInput) * 10000)
    else setCurrentRate(Number(amountInput))
  }, [amountInput])

  useEffect(() => {
    if (fromCoin) setCurrentRate(0.0)
    if (fromCoin.symbol === 'ETH') setCurrentRate(Number(amountInput) * 10000)
    else setCurrentRate(Number(amountInput))
  }, [fromCoin])

  return (
    <div
      className="absolute top-1/2 right-1/2 flex h-[450px] w-[480px] translate-x-1/2 -translate-y-1/2 flex-col rounded-md px-8 py-5"
      style={{ boxShadow: '0 0 100px 10px #3b82f6' }}
    >
      {componentState === 'swap' ? (
        <>
          <div className="text-2xl font-bold">Swap</div>
          <div className="mt-8">
            {/* From */}
            <div className="mb-2 flex items-center justify-between rounded-sm bg-[rgb(16,18,23)] px-4 py-4 hover:border hover:border-blue-600">
              <div className="flex items-center space-x-3">
                <div className="relative h-9 w-9">
                  <img src={fromCoin.image} />
                </div>
                <div className="">
                  <div className="text-xs font-bold text-gray-400">FROM</div>
                  <div className="flex items-center font-bold">
                    {fromCoin?.symbol}
                    <HiChevronDown
                      className="ml-1"
                      onClick={() => setComponentState('fromCoin')}
                    />
                  </div>
                </div>
              </div>
              <div>
                <input
                  type="number"
                  className="input-text bg-transparent text-right text-xl outline-none"
                  placeholder="0.00"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                />
              </div>
            </div>
            {/* To Coin */}
            <div className="flex items-center justify-between bg-[rgb(16,18,23)] px-4 py-4 hover:border hover:border-blue-600">
              <div className="flex items-center space-x-3">
                <div className="relative h-9 w-9">
                  <img src={toCoin.image} />
                </div>
                <div className="">
                  <div className="text-xs font-bold text-gray-400">TO</div>
                  <div className="flex items-center font-bold">
                    {toCoin.symbol}
                    <HiChevronDown
                      className="ml-1"
                      onClick={() => setComponentState('toCoin')}
                    />
                  </div>
                </div>
              </div>
              <div>
                <input
                  type="text"
                  className="input-text bg-transparent text-right text-xl outline-none"
                  placeholder="0.00"
                  value={currentRate}
                  readOnly
                />
              </div>
            </div>
            <div className="my-8 mt-14 text-center">
              <p className="text-md font-bold">
                Secure and efficient P2P swaps. These coins are not real!
              </p>
              <p className="font-extralight text-gray-500">
                Decentralized trading with zero slippage
              </p>
            </div>
          </div>

          {!isLoading ? (
            <button
              className="bg-blue-600 py-3 text-sm font-bold disabled:text-gray-400/90"
              disabled={
                !amountInput ||
                !fromCoin ||
                !toCoin ||
                fromCoin === toCoin ||
                !currentAccount
              }
              onClick={() => swap(fromCoin, toCoin, amountInput, currentRate)}
            >
              {getButtonLabel()}
            </button>
          ) : (
            <PulseLoader
              loading={true}
              size={30}
              color="white"
              // @ts-ignore
              css={{ styles: `text-align: center ` }}
            />
          )}
        </>
      ) : (
        <>
          <div className="flex justify-between">
            <div className="text-2xl font-bold">Swap</div>
            <div className="flex h-8 w-8 items-center justify-center border border-gray-900 p-2 hover:border-gray-600">
              <HiChevronDown
                size={15}
                onClick={() => setComponentState('swap')}
              />
            </div>
          </div>

          <input
            className="mt-4 rounded-md border border-gray-900 bg-transparent p-2 outline-none placeholder:text-slate-600 hover:border-gray-600 focus:border-gray-600"
            placeholder="Search name or paste address"
            type="text"
            value={searchCoin}
            onChange={(e) => setSearchCoin(e.target.value)}
          />

          <div className="mt-5">
            <div className="flex justify-between">
              <p className="text-xs text-gray-500">TOKEN</p>
              <p className="text-xs text-gray-500">BALANCE</p>
            </div>
            <div className="mt-4 space-y-4">
              {coins.map((token: Token) => (
                <div
                  key={token.symbol}
                  className="flex justify-between"
                  onClick={() => {
                    if (componentState === 'fromCoin') {
                      setFromCoin(token)
                      setComponentState('swap')
                    } else {
                      setToCoin(token)
                      setComponentState('swap')
                    }
                  }}
                >
                  {/* Symbol and Image */}
                  <div className="group flex cursor-pointer space-x-8">
                    <div className="flex cursor-pointer items-center space-x-2 font-bold">
                      <div className="relative h-6 w-6">
                        <Image
                          src={token.image}
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                      <div>{token.symbol}</div>
                    </div>

                    {/* Name */}
                    <div className="text-left text-gray-600 group-hover:text-white">
                      {token.name}
                    </div>
                  </div>

                  <div>TBA</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Swap
