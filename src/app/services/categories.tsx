import axios from 'axios';
import {strings} from 'app/values/strings';

const baseUrl = strings.API_URL + '/categories.php';

const getAll = (section?: number) => {
  let query = '';
  if (section) {
    query = '?section=' + section;
  }
  const request = axios.get(baseUrl + query);
  return request.then((response: any) => response.data as any);
};

export default { getAll };
