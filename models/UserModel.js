exports.UserModel = (serielize, DataTypes) => {
  const User = serielize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
        field: "id",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "email",
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "username",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "password",
      },
      avatarUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "avatar_url",
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
      resetPasswordToken: {
        type: DataTypes.STRING,
        field: "password_reset_token",
      },
      resetPasswordExpiry: {
        type: DataTypes.DATE,
        field: "reset_password_expiry",
      },
    },
    { tableName: "user" }
  );
  return User;
};
