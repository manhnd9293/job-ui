import axios from 'axios';


function createAxiosInstance(serverUrl) {
    const axiosInstance = axios.create({
        baseURL: `${serverUrl}/api/v1`,
    });

// Add a request interceptor
    axiosInstance.interceptors.request.use(
        function (config) {
            // Do something before request is sent
            const accessToken = localStorage.getItem("accessToken");
            config.headers['x-access-token'] = `${accessToken}` ;
            return config;
        },
        function (error) {
            // Do something with request error
            return Promise.reject(error);
        }
    );

//handle case access token is invalid or expired
    axiosInstance.interceptors.response.use(
        function (response) {
            return response;
        },

        function (error) {
          /*  if (!response) {
                console.log(error);
                return;
            }

            if (response.status === '403') {
                console.log('fail to load data');
            }
*/
            return Promise.reject(error);
        }
    )
    return axiosInstance;
}

const baseAxios = createAxiosInstance(process.env.REACT_APP_SERVER_URL);

export {baseAxios};
