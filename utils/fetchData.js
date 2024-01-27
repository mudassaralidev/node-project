import axios from 'axios';
import { handleRequestError } from './loggingError.js';

export const fetchData = async (url) => {
  try {
    const response = await axios.get(url)

    return response.data
  } catch (err) {
    handleRequestError(err)
  }
}