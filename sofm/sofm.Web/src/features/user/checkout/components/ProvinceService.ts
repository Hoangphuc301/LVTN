import axios from "axios";

const API =
  "https://provinces.open-api.vn/api/v1";

export const getProvinces =
  async () => {
    const response =
      await axios.get(
        `${API}/p`
      );

    return response.data;
  };

export const getDistricts =
  async (
    provinceCode: number
  ) => {
    const response =
      await axios.get(
        `${API}/p/${provinceCode}?depth=2`
      );

    return response.data.districts;
  };

export const getWards =
  async (
    districtCode: number
  ) => {
    const response =
      await axios.get(
        `${API}/d/${districtCode}?depth=2`
      );

    return response.data.wards;
  };