"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("User", {
      id: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(50),
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM("Admin", "Member"),
        defaultValue: "Member",
        allowNull: false,
      },
      emailVerified: {
        type: Sequelize.DATE,
      },
      image: { type: Sequelize.STRING },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
    await queryInterface.createTable("Session", {
      id: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      sessionToken: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.STRING(50),
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      expires: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
    await queryInterface.createTable("Account", {
      id: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.STRING(50),
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      provider: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      providerAccountId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      refresh_token: { type: Sequelize.STRING },
      access_token: { type: Sequelize.STRING },
      expires_at: { type: Sequelize.INTEGER },
      token_type: { type: Sequelize.STRING },
      scope: { type: Sequelize.STRING },
      id_token: { type: Sequelize.STRING },
      session_state: { type: Sequelize.STRING },
    });
    await queryInterface.createTable("VerificationToken", {
      identifier: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expires: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
    await queryInterface.addIndex("Account", {
      fields: ["provider", "providerAccountId"],
    });
    await queryInterface.addIndex("Session", { fields: ["sessionToken"] });
    await queryInterface.addIndex("User", { fields: ["email"] });
    await queryInterface.addIndex("VerificationToken", { fields: ["token"] });
    await queryInterface.addIndex("VerificationToken", {
      fields: ["identifier", "token"],
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("VerificationToken");
    await queryInterface.dropTable("Session");
    await queryInterface.dropTable("Account");
    await queryInterface.dropTable("User");
    await queryInterface.removeIndex("Account", [
      "provider",
      "providerAccountId",
    ]);
    await queryInterface.removeIndex("Session", ["sessionToken"]);
    await queryInterface.removeIndex("User", ["email"]);
    await queryInterface.removeIndex("VerificationToken", ["token"]);
    await queryInterface.removeIndex("VerificationToken", [
      "identifier",
      "token",
    ]);
  },
};
