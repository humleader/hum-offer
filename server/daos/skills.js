const SkillsService = require('services/skills')
const skillsService = new SkillsService()
module.exports = class {
  findAll() {
    return skillsService.findAll()
  }
}
