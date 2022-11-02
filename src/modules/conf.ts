// const HOST = '192.168.0.159:8000';
// const HOST = '192.168.1.41:8000';
// const HOST = 'localhost:8000';
const HOST = '192.168.1.71:8000';

export default {
    hostname: `http://${HOST}`,
    wsHost: `ws://${HOST}/private`,
    restApiPath: '/api/v1',
};


const colorScheme = {
    A: "#272643",
    B: "#ffffff",
    C: "#e3f6f5",
    D: "#bae8e8",
    E: "#2c698d",
}

export {
    colorScheme,
}
