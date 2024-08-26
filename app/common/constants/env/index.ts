const port: number = Number(process.env.APP_PORT || 3000);
const host: string = String(process.env.APP_HOST || 'localhost');
const fullHost = `http://${host}:${port}`;

export {
    fullHost,
    host,
    port
}
