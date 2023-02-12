import axios from "axios";

async function post(data, url) {
   try {
     const response = await axios.post(url, data);
   } catch (error) {
     console.error(error);
   }
}

export default post