import axios from 'axios'
import {strings} from 'app/values/strings';

const baseUrl = strings.API_URL + "/sections.php"; 

const getAll = () =>{
    const request = axios.get(baseUrl);
    return request.then((response: any) => response.data as any);
  };

export default { getAll};