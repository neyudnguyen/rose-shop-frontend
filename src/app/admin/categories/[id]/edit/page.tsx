import React from 'react';

export default async function EditCategoryPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Edit Category #{id}</h1>

            <div className="bg-white rounded-lg shadow-md p-6">
                <form>
                    <div className="mb-4">
                        <label
                            htmlFor="categoryName"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Category Name
                        </label>
                        <input
                            type="text"
                            id="categoryName"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter category name"
                            defaultValue="Category Name"
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="categoryImage"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Category Image
                        </label>
                        <input
                            type="file"
                            id="categoryImage"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">Current image: None</p>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                        >
                            Update Category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
