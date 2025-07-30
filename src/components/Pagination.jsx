function Pagination({ page, totalPages, limit, onPageChange, onLimitChange }) {
    return (
        <div className="flex flex-wrap justify-between items-center gap-4 mt-6">
            <div className="flex items-center gap-2 text-sm">
                <label htmlFor="pageSize" className="text-gray-600">
                    Show:
                </label>
                <select
                    id="pageSize"
                    value={limit}
                    onChange={(e) => onLimitChange(Number(e.target.value))}
                    className="border px-2 py-1 rounded text-sm"
                >
                    {[5, 10, 20, 50].map((val) => (
                        <option key={val} value={val}>
                            {val}
                        </option>
                    ))}
                </select>
                <span className="text-gray-600">per page</span>
            </div>

            <div className="flex items-center gap-4">
                <button
                    className="px-3 py-1 border cursor-pointer rounded disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => onPageChange(page - 1)}
                    disabled={page <= 1}
                >
                    Prev
                </button>
                <span className="text-sm text-gray-700">
                    Page {page} of {totalPages}
                </span>
                <button
                    className="px-3 py-1 border cursor-pointer disabled:cursor-not-allowed rounded disabled:opacity-50"
                    onClick={() => onPageChange(page + 1)}
                    disabled={page >= totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Pagination;
