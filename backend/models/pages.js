const fs = require('fs');

const createPage = ({ title, description }) => {
  fs.writeFileSync(`./resources/${title}.md`, description)
}

const formatPath = param => {
  if (!param) return '';
  return param.replace(/\./g, '/');
}

const getPageList = (path = '') => {
  const folder = formatPath(path)
  const files = fs.readdirSync(`./resources/${folder}`);
  const excludeFiles = ['.gitignore'];
  const pages = files
    .filter(file => !excludeFiles.includes(file))
    .map(file => {
      parts = file.split(/\./g);
      if (parts.length > 1) parts.pop();
      const title = parts.join(".");
      const isDirectory = fs.statSync(`./resources/${folder}/${file}`).isDirectory();
      const location = `${path ? path + '.' : ''}${title}`;
      return {
        title,
        path,
        location,
        isDirectory
      }
    })
  return pages;
}

const getPageActiveList = path => {
  let list = getPageList();
  console.log(list, 'path', path)
  const folderIndex = list.findIndex(item => path == item.location)
  const activeItem = list[folderIndex];
  const childrens = getPageList(path);
  console.log(activeItem)
  list[folderIndex] = {
    ...activeItem,
    childrens
  };
  return list;
}

const getPageContent = (page) => {
  const content = fs.readFileSync(`./resources/${page}.md`, "utf8");
  return content
}

module.exports = {
  createPage,
  formatPath,
  getPageList,
  getPageActiveList,
  getPageContent
}
