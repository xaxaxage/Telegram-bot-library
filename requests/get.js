import axios from "axios";

async function get(url) {
   try {
     const response = await axios.get(url)
     return response
   } catch (error) {
     console.error(error);
   }
}

export default get