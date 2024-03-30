const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Herramienta = sequelize.define('Herramienta', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    usaCookies: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    nombreUsuario: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cookies: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    direccionWeb: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    duracionTipo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    duracionNumero: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fechaVencimiento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    // Nuevo campo para indicar si la herramienta está activa o no
    estaActiva: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
  
    tipo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  module.exports = Herramienta;