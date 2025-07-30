import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBuilding, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiOutlineEye } from "react-icons/hi";

function JobCard({ job }) {
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

    const goToJob = () => navigate(`/job/${job.id}`);

    return (
        <div className="border rounded-xl shadow-sm p-4 bg-white relative hover:shadow-md transition">
            {/* Action Menu Button */}
            <div className="absolute top-3 right-3">
                <button
                    onClick={toggleMenu}
                    className="p-1 text-gray-600 hover:text-black"
                >
                    <BsThreeDotsVertical size={18} />
                </button>

                {open && (
                    <div
                        ref={menuRef}
                        className="absolute right-0 top-8 z-10 bg-white border shadow-md rounded-md min-w-[140px]"
                    >
                        <button
                            onClick={goToJob}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 text-left"
                        >
                            <HiOutlineEye className="text-gray-600" size={16} />
                            View Job
                        </button>
                        {/* Add Edit/Delete later */}
                    </div>
                )}
            </div>

            {/* Job Content */}
            <h2 className="text-lg font-semibold mb-1">{job.title}</h2>
            <p className="flex items-center gap-2 text-sm text-gray-600">
                <FaBuilding /> {job.company}
            </p>
            <p className="flex items-center gap-2 text-sm text-gray-600">
                <FaMapMarkerAlt /> {job.location}
            </p>
            <p className="flex items-center gap-2 text-sm text-gray-600">
                <FaClock /> {job.type}
            </p>
        </div>
    );
}

export default JobCard;
