import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  MdSwapHoriz,
  MdOutlineHowToVote,
  MdOutlinePeopleOutline,
} from 'react-icons/md'
import { IoIosStats, IoMdCode } from 'react-icons/io'
import { HiOutlineBookOpen } from 'react-icons/hi'

import logo from '../assets/logo.ico'

const navbarItems = [
  { name: 'OTC', icon: <MdSwapHoriz size={40} /> },
  { name: 'STATS', icon: <IoIosStats size={40} /> },
  { name: 'VOTE', icon: <MdOutlineHowToVote size={40} /> },
  { name: 'BUILD', icon: <IoMdCode size={40} /> },
  { name: 'LEARN', icon: <HiOutlineBookOpen size={40} /> },
  { name: 'JOIN', icon: <MdOutlinePeopleOutline size={40} /> },
]

const Navbar = () => {
  const router = useRouter()

  return (
    <div className="flex h-screen w-32 flex-col items-center space-y-16 border-r border-gray-900 px-4 py-12">
      <div
        className="relative flex h-16 w-16 cursor-pointer items-center justify-center"
        onClick={() => router.push('/')}
      >
        <Image src={logo} layout="fill" />
      </div>
      <div className="flex flex-col space-y-5">
        {navbarItems.map((item, index) => (
          <div
            key={index}
            className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center space-y-2 rounded-sm border border-gray-900 hover:border-gray-600"
          >
            <div className="h-18">{item.icon}</div>
            <div className="text-xs font-bold">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Navbar
