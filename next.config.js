/** @type {import('next').NextConfig} */
const nextConfig = {webpack: (config, { isServer }) => {
    // Exclure les fichiers inutiles lors de la compilation du serveur
    if (isServer) {
      config.externals = ['@firebase/app', '@firebase/firestore']
    }

    return config;
  },}

module.exports = nextConfig
