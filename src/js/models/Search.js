import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResult() {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const key = 'f113dd479656adb7ce65780cd2d236cd';
    try {
      const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
      this.result = res.data.recipes;
      // console.log(this.result);
    } catch (error) {
      console.error(error);
    }
  }
}
