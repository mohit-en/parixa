import axios from "axios";
const DomainName = "localhost";
const port = "8000";
axios.defaults.baseURL = `http://${DomainName}:${port}`;
