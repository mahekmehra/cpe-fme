import API from "./api";

export const getHealth =
  async () => {

    const response =
      await API.get(
        "/health"
      );

    return response.data;
};

export const getVersion =
  async () => {

    const response =
      await API.get(
        "/version"
      );

    return response.data;
};