const fs = require('fs');

const Pages = {
  createPage({ title, description }) {
    fs.writeFileSync(`./resources/${title}.md`, description)
  },
  getPageList() {
    const files = fs.readdirSync('./resources');
    const excludeFiles = ['.gitignore'];
    const pages = files
      .filter(file => !excludeFiles.includes(file))
      .map(file => {
        parts = file.split(/\./g);
        parts.pop();
        return parts.join(".");
      })
    return pages;
  }
};

module.exports = Pages
