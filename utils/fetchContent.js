import axios from 'axios';

export const fetchContent = async (urls) => {
  if (!Array.isArray(urls)) {
    throw new Error('Parameter must be an array of URLs');
  }

  try {
    const responses = await Promise.all(urls.map(url => axios.get(url)));
    const contents = responses.map(response => response.data);
    console.log(contents)
    return contents;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log('Could not get the content, Invalid URL');
    } else {
      console.log('Could not get the content, Unknown error occurred');
    }
  }
};

