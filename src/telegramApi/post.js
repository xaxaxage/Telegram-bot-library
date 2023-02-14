import axios from "axios";

async function post(url, data=null) {
   try {
     const response = await axios.post(url, data);
   } catch (error) {
     console.error(error);
   }
}

export default post