import axios from "axios";

const url = 'https://rickandmortyapi.com/api/character';

const getAllCharacters = async (params) => {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    throw Error(error);
  }
};

const getOneCharacter = async (id) => {
  try {
    const response = await axios.get(`${url}/${id}`);
    return response.data;
  } catch (error) {
    throw Error(error)
  }
}

export { getAllCharacters, getOneCharacter }