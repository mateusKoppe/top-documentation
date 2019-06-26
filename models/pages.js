const fs = require('fs');

const Pages = {
  createPage({ title, description }) {
    fs.writeFileSync(`./resources/${title}.md`, description)
  },
  getPageList() {
    const files = fs.readdirSync('./resources');
    return files
  }
};

module.exports = Pages
