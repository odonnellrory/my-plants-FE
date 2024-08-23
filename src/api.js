import axios from "axios";

const api = axios.create({ baseURL: "https://my-plants-be.onrender.com" });

const getPlantById = (username, plant_id) => {
  return api
    .get(`/api/users/${username}/${plant_id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getPlantList = () => {
  return api
    .get(`/api/user/${username}/plants`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getUserInfo = (username) => {
  api
    .get(`/api/users/${username}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

const changeUsername = (username) => {
  const newUsername = { username: username };

  return api
    .patch(`/api/users/${username}`, newUsername)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

const changeNickname = (username, plant_id, nickname) => {
  const newNickname = { nickname: nickname };

  api
    .patch(`/api/users/${username}/plants/${plant_id}`, newNickname)
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
};

const postPlantByUser = (username) => {
  return api
    .post(`/users/${username}/plants`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

const registerNewUser = (username, name, email, password) => {
  const newUser = {
    username: username,
    name: name,
    email: email,
    password: password,
  };

  api
    .post(`/api/login`, newUser)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

const loginUser = (username, password) => {
  const logInInfo = { username: username, password: password };

  api
    .post(`/api/login`, logInInfo)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

const deletePlantById = (username, plant_id) => {
  return api
    .delete(`/api/users/${username}/plants/${plant_id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

const fetchPlants = async (username) => {
  try {
    const response = await api.get(`/api/users/${username}/plants`);
    return response.data.plants;
  } catch (error) {
    console.error("Error fetching plants:", error);
    throw error;
  }
};

export {
  getPlantById,
  getPlantList,
  postPlantByUser,
  deletePlantById,
  changeUsername,
  changeNickname,
  registerNewUser,
  loginUser,
  getUserInfo,
  fetchPlants,
};
