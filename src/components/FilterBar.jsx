import { useState, useEffect } from "react";
import { FaTimes, FaUndo } from "react-icons/fa";

function FilterBar({ filters, setFilters, resetFilters, metadata }) {
    const { titles = [], locations = [], types = [] } = metadata;
    const [searchText, setSearchText] = useState(filters.keyword || "");

    useEffect(() => {
        const timer = setTimeout(() => {
            setFilters("keyword", searchText.trim());
        }, 500);
        return () => clearTimeout(timer);
    }, [searchText]);

    const clearSearch = () => {
        setSearchText("");
        setFilters("keyword", "");
    };


    const noFiltersApplied =
        !filters.title &&
        !filters.location &&
        !filters.type;

    return (
        <div className="bg-white shadow-sm p-4 mb-6 rounded-lg flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 flex-1">
                <div className="relative min-w-[200px] flex-1">
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => {
                            const rawValue = e.target.value;
                            const cleanedValue = rawValue.replace(/\s+/g, ' ').trimStart();
                            setSearchText(cleanedValue);
                        }} placeholder="Search jobs, companies or locations..."
                        className="w-full border px-4 py-2 rounded pr-10"
                    />
                    {searchText && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-2 top-1/2 cursor-pointer -translate-y-1/2 text-gray-500 hover:text-black"
                        >
                            <FaTimes />
                        </button>
                    )}
                </div>

                <select
                    value={filters.title}
                    onChange={(e) => setFilters("title", e.target.value)}
                    className="border px-3 py-2 rounded w-full sm:w-[160px]"
                >
                    <option value="">All Titles</option>
                    {titles.map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                </select>

                <select
                    value={filters.location}
                    onChange={(e) => setFilters("location", e.target.value)}
                    className="border px-3 py-2 rounded w-full sm:w-[160px]"
                >
                    <option value="">All Locations</option>
                    {locations.map((l) => (
                        <option key={l} value={l}>
                            {l}
                        </option>
                    ))}
                </select>

                <select
                    value={filters.type}
                    onChange={(e) => setFilters("type", e.target.value)}
                    className="border px-3 py-2 rounded w-full sm:w-[140px]"
                >
                    <option value="">All Types</option>
                    {types.map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                </select>
            </div>

            <button
                onClick={resetFilters}
                disabled={noFiltersApplied}
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded mt-2 sm:mt-0
                    ${noFiltersApplied
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-red-100 cursor-pointer hover:bg-red-200 text-red-700"}
                `}            >
                <FaUndo />
                Reset Filters
            </button>
        </div>
    );
}

export default FilterBar;
