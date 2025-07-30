import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import JobCard from "../components/JobCard";
import JobTableRow from "../components/JobRow";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import { fetchJobs, fetchJobFilters } from "../api/jobs";
import { FaTh, FaThList } from "react-icons/fa";

function Home() {
    const [jobs, setJobs] = useState([]);
    const [metadata, setMetadata] = useState({ titles: [], locations: [], types: [] });
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const view = searchParams.get("view") || "table";
    const keyword = searchParams.get("keyword") || "";
    const title = searchParams.get("title") || "";
    const location = searchParams.get("location") || "";
    const type = searchParams.get("type") || "";
    const pageParam = searchParams.get("page");
    let page = parseInt(pageParam) || 1;


    const limitParam = searchParams.get("limit");
    let limit = parseInt(limitParam) || 6;


    // Fix invalid page
    if (pageParam != null && (isNaN(page) || page < 1 || !Number.isInteger(page))) {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", "1");
        setSearchParams(newParams);
        page = 1;
    }

    const updateFilter = (key, value) => {
        const params = new URLSearchParams(searchParams);
        if (value) params.set(key, value);
        else params.delete(key);
        if (pageParam != null) {
            params.set("page", "1");
        }
        setSearchParams(params);
    };

    const resetFilters = () => {
        const params = new URLSearchParams(searchParams);
        ["keyword", "title", "location", "type"].forEach((key) => params.delete(key));
        params.set("page", "1");
        setSearchParams(params);
    };

    const updatePage = (newPage) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", newPage);
        setSearchParams(params);
    };

    const toggleView = (targetView) => {
        const params = new URLSearchParams(searchParams);
        params.set("view", targetView);
        setSearchParams(params);
    };


    const updateLimit = (newLimit) => {
        const params = new URLSearchParams(searchParams);
        params.set("limit", newLimit);
        params.set("page", "1"); // reset to page 1
        setSearchParams(params);
    };



    useEffect(() => {
        const getFilters = async () => {
            try {
                const data = await fetchJobFilters();
                setMetadata(data);

                const validParams = new URLSearchParams(searchParams);
                let modified = false;

                if (title && !data.titles.includes(title)) {
                    validParams.delete("title");
                    modified = true;
                }
                if (location && !data.locations.includes(location)) {
                    validParams.delete("location");
                    modified = true;
                }
                if (type && !data.types.includes(type)) {
                    validParams.delete("type");
                    modified = true;
                }

                if (modified) {
                    setSearchParams(validParams);
                }
            } catch {
                toast.error("Failed to fetch filter options");
            }
        };
        getFilters();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchJobs({
                    page,
                    limit,
                    keyword: keyword || undefined,
                    title: title || undefined,
                    location: location || undefined,
                    type: type || undefined,
                });
                setJobs(data.jobs || []);
                setTotalPages(data.totalPages || 1);
            } catch {
                toast.error("Failed to fetch job listings");
            }
            setLoading(false);
        };
        fetchData();
    }, [searchParams]);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold">Available Jobs</h1>
                </div>
                <button
                    onClick={() => navigate("/add-job")}
                    className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-2 text-sm rounded"
                >
                    + Add Job
                </button>
            </div>

            <FilterBar
                filters={{ keyword, title, location, type }}
                setFilters={updateFilter}
                resetFilters={resetFilters}
                metadata={metadata}
            />
            <div className="flex gap-2 pb-4 pt-5">
                <button
                    onClick={() => toggleView("table")}
                    className={`flex items-center px-3 cursor-pointer py-1 rounded text-sm border ${view === "table"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-600 border-gray-300"
                        }`}
                >
                    <FaThList className="mr-1" /> Table
                </button>
                <button
                    onClick={() => toggleView("card")}
                    className={`flex items-center px-3 py-1 cursor-pointer rounded text-sm border ${view === "card"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-600 border-gray-300"
                        }`}
                >
                    <FaTh className="mr-1" /> Card
                </button>
            </div>
            {loading ? (
                <div className="text-center py-8 text-gray-500">
                    <div className="w-6 h-6 border-4 border-dashed border-gray-300 rounded-full animate-spin mx-auto mb-2"></div>
                    Loading jobs...
                </div>
            ) : jobs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No jobs found.</div>
            ) : view === "card" ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {jobs.map((job) => (
                        <JobCard key={job._id || job.id} job={job} />
                    ))}
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
                    <table className="w-full text-left mb-6 border-b-0">
                        <thead className="bg-gray-100 text-gray-700 text-sm">
                            <tr>
                                <th className="p-3">Title</th>
                                <th className="p-3">Company</th>
                                <th className="p-3">Location</th>
                                <th className="p-3">Type</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job, i) => (
                                <JobTableRow key={job._id} job={job} last={i === jobs.length - 1} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {!loading && jobs.length > 0 && (
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    limit={limit}
                    onPageChange={updatePage}
                    onLimitChange={updateLimit}
                />
            )}
        </div>
    );
}

export default Home;
