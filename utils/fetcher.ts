import axios, { AxiosResponse } from 'axios';

const fetcher = ( url: string ) => {
   return axios
   .get(url)
   .then((response: AxiosResponse<any>) => response.data)
}

export default fetcher;