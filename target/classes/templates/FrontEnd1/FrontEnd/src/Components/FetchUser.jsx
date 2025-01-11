import React, { useState } from 'react';
import axios from 'axios';

const FetchUser = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [userData, setUserData] = useState(null);

    const handleSearch = async (searchType) => {
        if (!searchTerm.trim()) {
            setErrorMessage('Please enter a search term');
            return;
        }
        setErrorMessage('');

        try {
            let url;
            if (searchType === 'id') {
                url = `http://localhost:1234/api/users/${encodeURIComponent(searchTerm)}`;
            } else {
                url = `http://localhost:1234/api/users/${searchType}/${encodeURIComponent(searchTerm)}`;
            }

            const response = await axios.get(url, {
                auth: {
                    username: 'shivumg',
                    password: 'Shivu@1973'
                },
                validateStatus: function (status) {
                    return status >= 200 && status < 400; // Accept 302 as valid
                }
            });

            // Extract user data from response
            if (response.data && response.data.user) {
                setUserData(response.data.user);
            } else if (Array.isArray(response.data)) {
                setUserData(response.data);
            } else {
                setUserData(response.data);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            if (error.response && error.response.data && error.response.data.user) {
                setUserData(error.response.data.user);
            } else {
                setErrorMessage(error.response.data.error);
            }
        }
    };

    return (
        <div className="bg-black min-h-screen flex flex-col items-center justify-start p-8">
            <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md mb-8">
                <h1 className="text-center text-2xl font-bold mb-6 text-gray-700">Fetch User Details</h1>
                {errorMessage && (
                    <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
                )}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter search term..."
                    className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => handleSearch('userName')}
                        className="bg-black text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    >
                        Search by Username
                    </button>
                    <button
                        onClick={() => handleSearch('firstName')}
                        className=" text-white py-2 px-4 rounded-lg hover:bg-green-600"
                    >
                        Search by First Name
                    </button>
                    <button
                        onClick={() => handleSearch('lastName')}
                        className="bg-black text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
                    >
                        Search by Last Name
                    </button>
                    <button
                        onClick={() => handleSearch('email')}
                        className="bg-black text-white py-2 px-4 rounded-lg hover:bg-indigo-600"
                    >
                        Search by Email
                    </button>
                    <button
                        onClick={() => handleSearch('id')}
                        className="bg-black text-white py-2 px-4 rounded-lg hover:bg-red-600"
                    >
                        Search by ID
                    </button>
                    <button
    onClick={() => {
        axios.get('http://localhost:1234/api/users', {
            auth: {
                username: 'shivumg',
                password: 'Shivu@1973'
            }
        })
        .then(response => {
            if (response.data && response.data.users) {
                setUserData(response.data.users);
            }
        })
        .catch(error => {
            console.error('Error fetching all users:', error);
            setErrorMessage(error.response?.data?.error || 'Failed to fetch users');
        });
    }}
    className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 col-span-2"
>
    Fetch All Users
</button>


                </div>
            </div>

            {userData && (
                <div className="w-full max-w-4xl overflow-x-auto">
                    <table className="min-w-full bg-white shadow-lg rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {Array.isArray(userData) ? (
    userData.map((user) => (
        <tr key={user.id}>
            <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.userName}</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.firstName}</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.lastName}</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
        </tr>
    ))
) : (
    <tr>
        <td className="px-6 py-4 whitespace-nowrap">{userData.id}</td>
        <td className="px-6 py-4 whitespace-nowrap">{userData.userName}</td>
        <td className="px-6 py-4 whitespace-nowrap">{userData.firstName}</td>
        <td className="px-6 py-4 whitespace-nowrap">{userData.lastName}</td>
        <td className="px-6 py-4 whitespace-nowrap">{userData.email}</td>
    </tr>
)}

                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default FetchUser;
