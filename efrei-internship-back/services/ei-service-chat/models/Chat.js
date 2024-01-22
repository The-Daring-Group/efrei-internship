module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('chat', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    id_sender: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_receiver: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'chat',
  });
  return Chat;
};
