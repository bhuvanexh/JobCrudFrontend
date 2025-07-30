import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiOutlineEye } from "react-icons/hi";

function JobTableRow({ job, last }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef();
    const navigate = useNavigate();

    const toggleMenu = () => setOpen((prev) => !prev);

    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const goToJob = () => navigate(`/job/${job._id}`);

    return (
        <tr className={`${!last && "border-b border-amber-100"} hover:bg-gray-50 relative`}>
            <td className="p-3 font-medium">
                <button
                    onClick={goToJob}
                    className="text-blue-600 cursor-pointer hover:underline hover:text-blue-800 transition text-left"
                >
                    {job.title}
                </button>
            </td>
            <td className="p-3">{job.company}</td>
            <td className="p-3">{job.location}</td>
            <td className="p-3">{job.type}</td>
            <td className="p-3 text-right relative">
                <button
                    className="p-2 text-gray-600 hover:text-black cursor-pointer"
                    onClick={toggleMenu}
                >
                    <BsThreeDotsVertical size={18} />
                </button>

                {open && (
                    <div
                        ref={menuRef}
                        className="absolute right-3 top-10 z-10 bg-white border shadow-md rounded-md min-w-[140px]"
                    >
                        <button
                            onClick={goToJob}
                            className="flex items-center cursor-pointer gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 text-left"
                        >
                            <HiOutlineEye className="text-gray-600" size={16} />
                            View Job
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
}

export default JobTableRow;
