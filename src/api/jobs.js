import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export const fetchJobs = async (params = {}) => {
    const res = await axios.get(`${API_BASE}/jobs`, { params });
    return res.data;
};

export const fetchJobFilters = async () => {
    const res = await axios.get(`${API_BASE}/jobs/filters`);
    return res.data;
};

export const createJob = async (data) => {
    const res = await axios.post(`${API_BASE}/jobs`, data);
    return res.data;
};



export const getJobById = async (id) => {
    const { data } = await axios.get(`${API_BASE}/jobs/${id}`);
    return data;
};