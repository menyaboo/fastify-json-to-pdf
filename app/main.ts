import {fastify, FastifyInstance} from 'fastify';
import {consoleColor} from './common/constants';
import {errorHandler, validatorCompiler} from "./common/handler/validations";
import {PdfConverterRouter} from "./modules/convert/router";
import fastifyStatic from "@fastify/static";
import * as path from "node:path";

async function app(): Promise<void> {
    const app: FastifyInstance = fastify();
    const port: number = Number(process.env.APP_PORT || 3000);
    const host: string = String(process.env.APP_HOST || 'localhost');

    app.setValidatorCompiler(validatorCompiler);
    app.setErrorHandler(errorHandler);

    app.register(fastifyStatic, {
        root: path.join(__dirname, '../public'),
        prefix: '/',
    });

    app.register(PdfConverterRouter, { prefix: '/converter' });

    app.listen({ port, host }, (err, address) => {
        if (err) {
            console.error(consoleColor.FG.RED, '[ERROR] Error starting server:', err);
            process.exit(1);
        }
        console.log(consoleColor.FG.BLUE, `[INFO] Server listening on ${address}`);
    });
}

void app();
