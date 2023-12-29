import { FaHome } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { Link } from 'react-router-dom';


const Navbar = () => (
    <div className="bg-slate-100 shadow flex relative mx-auto p-2 text-xl w-[100px] justify-around">
        <Link to={'/'}>
            <FaHome className='hover:text-blue-500' />
        </Link>
        <Link to={'/create'}>
            <IoIosCreate className='hover:text-blue-500' />
        </Link>
    </div>

)

export default Navbar