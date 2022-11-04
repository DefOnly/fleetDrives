import { useEffect, useState} from 'react';
import axios from 'axios';

const useFetchData = () => {
  const [drivers, setDrivers] = useState({});
  const endPoint = "http://localhost:8000/api";

  useEffect(() => {
    const getAllDrivers = async () =>{
      try {
        const {data: response} = await axios.get(`${endPoint}/drivers/`);
        setDrivers(response);
      } catch (error) {
        console.error(error.message);
      }
    }

    getAllDrivers();
  }, []);

  return {
    drivers
  };
};

export default useFetchData;