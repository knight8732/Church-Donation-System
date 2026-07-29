/**
 * @file Axios.jsx
 * @description Centralized HTTP networking client provider.
 * Sets up base URL pathways, network execution timeouts, and global request payload rules.
 */

import axios from "axios";

/**
 * Root host directory endpoint URL for the backend database system.
 * Modify this variable to point to staging or live cloud services during deployment.
 * @type {string}
 */
const baseUrl = "http://localhost:8000/";

/**
 * Shared Application Networking Pipeline Instance
 * Custom configured Axios orchestrator ensuring all outgoing application tasks
 * maintain identical transaction standards and safety limits.
 * 
 * @type {import('axios').AxiosInstance}
 */
const AxiosInstance = axios.create({
  baseURL: baseUrl,
  
  // Terminates tasks hanging over 5 seconds to clear main browser resources safely
  timeout: 5000, 
  
  headers: {
    "Content-Type": "application/json",
    accept: "application/json"
  },
});

export default AxiosInstance;
