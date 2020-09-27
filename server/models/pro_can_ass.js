'use strict'
module.exports = function(sequelize, DataTypes) {
  const ProCanAss = sequelize.define(
    'ProCanAss',
    {
      id: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      status: {
        type: DataTypes.INTEGER(20),
        field: 'status'
      },
      candidateId: {
        type: DataTypes.INTEGER(20),
        field: 'candidate_id'
      },
      proId: {
        type: DataTypes.INTEGER(20),
        field: 'pro_id'
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
      tableName: 'pro_can_ass'
    }
  )

  return ProCanAss
}
