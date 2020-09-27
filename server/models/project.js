'use strict'
module.exports = function(sequelize, DataTypes) {
  const Project = sequelize.define(
    'Project',
    {
      id: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      proName: {
        type: DataTypes.STRING(100),
        field: 'pro_name'
      },
      proStatus: {
        type: DataTypes.INTEGER(8),
        field: 'pro_status'
      },
      proJd: {
        type: DataTypes.TEXT,
        field: 'pro_jd'
      },
      proCity: {
        type: DataTypes.STRING(20),
        field: 'pro_city'
      },
      proHc: {
        type: DataTypes.INTEGER(8),
        field: 'pro_hc'
      },
      proStartTime: {
        type: DataTypes.DATE,
        field: 'pro_start_time'
      },
      proEndTime: {
        type: DataTypes.DATE,
        field: 'pro_end_time'
      },
      proSalary: {
        type: DataTypes.STRING(100),
        field: 'pro_salary'
      },
      proBilling: {
        type: DataTypes.STRING(50),
        field: 'pro_billing'
      },
      proGuarantee: {
        type: DataTypes.STRING(50),
        field: 'pro_guarantee'
      },
      proCompany: {
        type: DataTypes.INTEGER(20),
        field: 'pro_company'
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
      tableName: 'project'
    }
  )

  Project.associate = function(models) {
    models.Project.hasMany(models.OperationLog, {
      as: 'OperationLog',
      foreignKey: 'proId'
    })
    models.Project.hasMany(models.ProCanAss, {
      as: 'ProAss',
      foreignKey: 'proId'
    })
    models.Project.belongsToMany(models.Candidate, {
      as: 'Candidate',
      through: 'ProCanAss',
      foreignKey: 'proId'
    })
  }

  return Project
}
