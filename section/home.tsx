import React from "react";

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-[#1F2937] text-gray-200 flex items-center justify-between px-4 py-2">
                    <div className="flex space-x-3">
                        <span className="text-red-500">●</span>
                        <span className="text-yellow-500">●</span>
                        <span className="text-green-500">●</span>
                    </div>
                    <div className="flex space-x-4">
                        <button className="hover:text-white">File</button>
                        <button className="hover:text-white">Edit</button>
                        <button className="hover:text-white">Special</button>
                    </div>
                </div>

                <div className="p-6">
                    <h1 className="text-xl font-bold text-center border-b pb-2 mb-4">The Password Generator</h1>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span>Password Length:</span>
                            <span className="bg-[#E5E7EB] px-2 py-1 rounded">24</span>
                        </div>

                        <label className="flex items-center justify-between">
                            <span>Lowercase letters (a-z)</span>
                            <input type="checkbox" className="w-4 h-4"/>
                        </label>
                        <label className="flex items-center justify-between">
                            <span>Uppercase letters (A-Z)</span>
                            <input type="checkbox" className="w-4 h-4"/>
                        </label>
                        <label className="flex items-center justify-between">
                            <span>Numbers (0-9)</span>
                            <input type="checkbox" className="w-4 h-4"/>
                        </label>
                        <label className="flex items-center justify-between">
                            <span>Special symbols</span>
                            <input type="checkbox" className="w-4 h-4"/>
                        </label>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-[#E5E7EB]">Generate</button>
                    </div>
                    <div className="mt-6 pt-4 border-t">
                        <div className="mb-1">Generated Password</div>
                        <div className="bg-[#E5E7EB] rounded p-3 break-all text-gray-600"> kshdsieu@154</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;


