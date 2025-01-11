const axiosInstance = axios.create({
    baseURL: "http://localhost:1234/api/users",
    headers: {
        "Content-Type": "application/json"
    },
    auth: {
        username: "keshav",
        password: "Keshav@123"
    },
    withCredentials: true
});

// Add interceptor to handle errors
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.log('Error:', error.response);
        return Promise.reject(error);
    }
);
