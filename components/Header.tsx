import { useContext } from 'react'
import { AirswapContext } from '../context/AirswapContext'
import { IoMdSettings } from 'react-icons/io'

const Header = () => {
  const { currentAccount, connectWallet, disconnect } =
    useContext(AirswapContext)
  return (
    <div className="min-w-screen flex justify-center space-x-3 px-4 lg:justify-end">
      <div className="mt-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-gray-900 p-2 hover:border-gray-500">
        <IoMdSettings size={25} />
      </div>

      <div className="mt-4 flex h-12 items-center space-x-2 rounded-full border border-gray-900 px-4 py-2 hover:border-gray-500">
        {currentAccount ? (
          <>
            <div className="h-3 w-3 rounded-full bg-green-400" />
            <button className="font-bold" onClick={() => disconnect()}>
              {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
            </button>
          </>
        ) : (
          <>
            <div className="h-3 w-3 rounded-full bg-red-600" />
            <button className="font-bold" onClick={() => connectWallet()}>
              Not Connected
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
