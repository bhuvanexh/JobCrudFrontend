import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import JobForm from "../components/JobForm";
import { createJob } from "../api/jobs";

function AddJob() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            await createJob(data);
            toast.success("Job added successfully");
            navigate("/");
        } catch (err) {
            toast.error("Failed to add job");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-blue-600 hover:underline mb-4"
            >
                <FaArrowLeft />
                Back to Jobs
            </button>

            <h2 className="text-2xl font-bold mb-4">Add New Job</h2>

            <JobForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
    );
}

export default AddJob;
