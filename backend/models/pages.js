const fs = require('fs');

const getSlug = text => {
  let slug = text.toLowerCase();
  slug = slug.replace(/\s/g,"-");
  slug = slug.replace(/[àáâãäå]/g,"a");
  slug = slug.replace(/æ/g,"ae");
  slug = slug.replace(/ç/g,"c");
  slug = slug.replace(/[èéêë]/g,"e");
  slug = slug.replace(/[ìíîï]/g,"i");
  slug = slug.replace(/ñ/g,"n");                
  slug = slug.replace(/[òóôõö]/g,"o");
  slug = slug.replace(/œ/g,"oe");
  slug = slug.replace(/[ùúûü]/g,"u");
  slug = slug.replace(/[ýÿ]/g,"y");
  slug = slug.replace(/\W/g,"-");
  return slug
}

const getPageList = (path = '') => {
  try {
    return JSON.parse(fs.readFileSync('./resources/pages.json'));
  } catch (error) {
    fs.writeFileSync('./resources/pages.json', '{}');
    return {};
  } 
}

const createPage = ({ title, description }) => {
  const list = getPageList();
  const slug = getSlug(title)
  list[slug] = {
    file: `pages/${slug}.html`,
    slug,
    title,
  };
  fs.writeFileSync(`./resources/${list[slug].file}`, description);
  fs.writeFileSync('./resources/pages.json', JSON.stringify(list));
  console.log(JSON.stringify(list))
  return true
  // fs.writeFileSync(`./resources/${title}.md`, description)
}

const getPageActiveList = path => {
  let list = getPageList();
  const folderIndex = list.findIndex(item => path == item.location)
  const activeItem = list[folderIndex];
  const childrens = getPageList(path);
  list[folderIndex] = {
    ...activeItem,
    childrens
  };
  return list;
}

const getPageContent = (page) => {
  const list = getPageList();
  const pageData = list[page]
  pageData.content = fs.readFileSync(`./resources/${pageData.file}`, "utf8");
  return pageData
}

module.exports = {
  createPage,
  getPageList,
  getPageActiveList,
  getPageContent
}
