'use strict'
module.exports = function(sequelize, DataTypes) {
  const Candidate = sequelize.define(
    'Candidate',
    {
      id: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      canName: {
        type: DataTypes.STRING(50),
        field: 'can_name'
      },
      canSex: {
        type: DataTypes.STRING(10),
        field: 'can_sex'
      },
      canBirthday: {
        type: DataTypes.STRING(50),
        field: 'can_birthday'
      },
      canCity: {
        type: DataTypes.STRING(30),
        field: 'can_city'
      },
      canEmail: {
        type: DataTypes.STRING(100),
        field: 'can_email'
      },
      canPhone: {
        type: DataTypes.STRING(20),
        field: 'can_phone'
      },
      canLocal: {
        type: DataTypes.STRING(100),
        field: 'can_local'
      },
      canSalary: {
        type: DataTypes.STRING(50),
        field: 'can_salary'
      },
      canPosition: {
        type: DataTypes.STRING(50),
        field: 'can_position'
      },
      canTags: {
        type: DataTypes.INTEGER(20),
        field: 'can_tags'
      },
      canEnName: {
        type: DataTypes.STRING(50),
        field: 'can_en_name'
      },
      canEducation: {
        type: DataTypes.STRING(20),
        field: 'can_education'
      },
      canCompany: {
        type: DataTypes.STRING(50),
        field: 'can_company'
      },
      canAttachment: {
        type: DataTypes.TEXT,
        field: 'can_attachment'
      },
      addUserId: {
        type: DataTypes.INTEGER(20),
        field: 'add_user_id'
      },
      lastUpdateUserId: {
        type: DataTypes.INTEGER(20),
        field: 'last_update_user_id'
      },
      recycleStatus: {
        type: DataTypes.INTEGER(8),
        field: 'recycle_status'
      },
      createTime: {
        type: DataTypes.DATE,
        field: 'create_time'
      },
      updateTime: {
        type: DataTypes.DATE,
        field: 'update_time'
      }
    },
    {
      tableName: 'candidate'
    }
  )

  Candidate.associate = function(models) {
    models.Candidate.hasMany(models.OperationLog, {
      as: 'OperationLog',
      foreignKey: 'candidateId'
    })
    models.Candidate.belongsTo(models.Skills, {
      as: 'Skills',
      foreignKey: 'canTags'
    })
    models.Candidate.belongsToMany(models.Project, {
      as: 'Project',
      through: 'ProCanAss',
      foreignKey: 'candidateId'
    })
  }

  return Candidate
}
