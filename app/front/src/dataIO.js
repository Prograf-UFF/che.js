import axios from "axios";

export class DataIO {
  static async readMesh(filename) {
      const data = await axios.get(filename);
      console.log(data);
      return data;
    }
}
