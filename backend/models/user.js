const crypto = require('crypto');
const bcrypt = require('bcrypt')
const fs = require('fs')

class User {
  constructor(email) {
    this.email = email
    this.level = 2;
    this.token = ''
  }

  static getList(path = '') {
    try {
      return JSON.parse(fs.readFileSync('./resources/user.json'));
    } catch (error) {
      return {};
    } 
  }

  static getRandomToken() {
    const current_date = (new Date()).valueOf().toString();
    const random = Math.random().toString();
    const token = crypto.createHash('sha1').update(current_date + random).digest('hex');
    return token
  }

  static checkPassword(password, hash) {
    return bcrypt.compareSync(password, hash)
  }

  static login(email, password) {
    const list = User.getList()
    const data = list[email]
    if (!data || !User.checkPassword(password, data.password)) return false
    const user = new User(data.email)
    user.level = data.level
    user.token = User.getRandomToken()
    user.save()
    return user
  }

  encryptPassword(password) {
    const hashPassword = bcrypt.hashSync(password, 10)
    this._password = hashPassword
  }

  generateToken() {
    this.token = User.getRandomToken()
  }

  save() {
    const data = {
      email: this.email,
      password: this._password,
      token: this.token,
      level: this.level
    }
    const list = User.getList()
    list[this.email] = data
    fs.writeFileSync('./resources/user.json', JSON.stringify(list));
  }
}

module.exports = User
