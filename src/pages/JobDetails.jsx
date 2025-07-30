import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../api/jobs";
import { toast } from "react-hot-toast";
import { FaArrowLeft, FaBuilding, FaMapMarkerAlt } from "react-icons/fa";

function JobDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const data = await getJobById(id);
                setJob(data);
            } catch (err) {
                toast.error("Failed to fetch job");
            }
            setLoading(false);
        };
        fetchJob();
    }, [id]);

    if (loading) {
        return (
            <div className="p-6 max-w-4xl mx-auto">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="h-32 bg-gray-200 rounded" />
                </div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="p-6 max-w-4xl mx-auto text-center text-gray-500">
                Job not found.
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <button
                onClick={() => navigate("/")}
                className="flex items-center cursor-pointer text-sm text-gray-600 hover:text-black mb-6"
            >
                <FaArrowLeft className="mr-2" />
                Back to Jobs
            </button>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">{job.title}</h1>

            <div className="flex items-center text-gray-600 gap-6 mb-2 text-sm">
                <span className="flex items-center gap-2">
                    <FaBuilding className="text-gray-500" />
                    {job.company}
                </span>
                <span className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gray-500" />
                    {job.location}
                </span>
            </div>

            <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium mt-2">
                {job.type}
            </span>

            <div className="mt-6 border-t pt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Job Description</h2>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">{job.description}</p>
            </div>
        </div>
    );
}

export default JobDetail;
