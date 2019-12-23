/* eslint-disable */
let config;

if (process.env.NODE_ENV === "production") {
  config = {
    apiUrl: location.origin,
    authApiUrl: location.origin
  }
} else {
  config = {
    apiUrl: `http://localhost:8081`,
    authApiUrl: `http://localhost:8082`
  }
}

export default config