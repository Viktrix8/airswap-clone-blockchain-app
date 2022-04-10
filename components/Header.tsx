import { IoMdSettings } from 'react-icons/io'

const currentAccount = '0x0B8A9b8a76d56932f3eeEcf4e83B300cf8Dd02c8'

const Header = () => {
  return (
    <div className="flex w-full justify-end space-x-3 px-4">
      <div className="mt-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-gray-900 p-2">
        <IoMdSettings size={25} />
      </div>

      <div className="mt-4 flex h-12 items-center space-x-2 rounded-full border border-gray-900 px-4 py-2">
        {currentAccount ? (
          <>
            <div className="h-3 w-3 rounded-full bg-green-400" />
            <button className="font-bold">
              {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
            </button>
          </>
        ) : (
          <>
            <div className="h-3 w-3 rounded-full bg-red-600" />
            <button className="font-bold">Not Connected</button>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
