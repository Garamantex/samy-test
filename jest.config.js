export default {
    preset: 'ts-jest',
    "testEnvironment": "jest-environment-jsdom",
    transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest', // Usa Babel para transformar TypeScript y JSX
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Para manejar estilos CSS
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Archivo de configuración para Jest
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'], // Ignora los directorios node_modules y dist
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Extensiones de archivos a considerar
}