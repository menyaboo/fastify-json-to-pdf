import {fastify, FastifyInstance} from 'fastify';
import {consoleColor, host, port} from './common/constants';
import {errorHandler, validatorCompiler} from "./common/handler/validations";
import {PdfConverterRouter} from "./modules/convert/router";
import fastifyStatic from "@fastify/static";
import * as path from "node:path";

async function app(): Promise<void> {
    const app: FastifyInstance = fastify();

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
