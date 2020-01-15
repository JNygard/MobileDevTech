import axios from 'axios'
import {strings} from 'app/values/strings';

const baseUrl = strings.API_URL + '/techs.php'; 

/*
const getById = (id) => {
  const request = axios.get(baseUrl+ '/' + id)
  return request.then(response => response.data)  
};
*/

const getAll = (section?: number) => {

    let query = "";
    if (section) {
      query = "?section=" + section;
    }
    const request = axios.get(baseUrl + query);
    return request.then((response: any) => response.data as any);
  };


export default { getAll};

