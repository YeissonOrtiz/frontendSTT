import axios from "axios";
async function handleSubmit(data) {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
    
    const response = await axios.post(
      'http://localhost:3000/api/comments/create', 
      JSON.stringify(data),
      config
    );
    
    return response
  } catch (error) {
    throw new Error(error);
  }
};

export { handleSubmit }