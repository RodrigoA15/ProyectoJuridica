module.exports = {
  apps: [
    {
      name: "Juridica",
      script: "./index.js",
      instances : "max",
      exec_mode : "cluster",
      env: {
        NODE_ENV: "development",
        PORT: 4000,
        HOST: "192.168.28.74"
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
