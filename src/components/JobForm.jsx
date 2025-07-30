import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { jobSchema } from "../utils";

function JobForm({ initialValues = {}, onSubmit, isSubmitting }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(jobSchema),
        defaultValues: initialValues,
        mode: "onChange",
    });

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow-md rounded px-6 py-6 space-y-4 max-w-2xl mx-auto"
        >
            <div>
                <label className="block font-medium mb-1">Job Title</label>
                <input
                    {...register("title")}
                    className="w-full border px-3 py-2 rounded"
                />
                <p className="text-sm text-red-500">{errors.title?.message}</p>
            </div>

            <div>
                <label className="block font-medium mb-1">Company</label>
                <input
                    {...register("company")}
                    className="w-full border px-3 py-2 rounded"
                />
                <p className="text-sm text-red-500">{errors.company?.message}</p>
            </div>

            <div>
                <label className="block font-medium mb-1">Location</label>
                <input
                    {...register("location")}
                    className="w-full border px-3 py-2 rounded"
                />
                <p className="text-sm text-red-500">{errors.location?.message}</p>
            </div>

            <div>
                <label className="block font-medium mb-1">Type</label>
                <select
                    {...register("type")}
                    className="w-full border px-3 py-2 rounded"
                >
                    <option value="">Select Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                </select>
                <p className="text-sm text-red-500">{errors.type?.message}</p>
            </div>

            <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                    {...register("description")}
                    className="w-full border px-3 py-2 rounded h-32"
                />
                <p className="text-sm text-red-500">{errors.description?.message}</p>
            </div>

            <div className="text-right">
                <button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className="bg-blue-600 cursor-pointer text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </div>
        </form>
    );
}

export default JobForm;
