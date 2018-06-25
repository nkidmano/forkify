import axios from 'axios';
import { key, proxy } from '../config';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResult() {
    try {
      const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
      const data = JSON.parse(res.data.body);
      this.result = data.recipes;
    } catch (error) {
      console.error(error);
    }
  }
}
