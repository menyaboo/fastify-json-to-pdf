import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import {ConvertSchema, IConvertSchema} from "../schemas";
import {expHtml} from "../../../common/static";
import {generateHTML, generatePDF} from "../utils";


export async function PdfConverterRouter(fastify: FastifyInstance) {
    fastify.route({
        method: 'GET',
        url: '/html',
        handler: async function (this: FastifyInstance, request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
            const html = generateHTML(expHtml);

            return reply.code(200).type('text/html').send(html);
        },
    });

    fastify.route({
        method: 'POST',
        url: '/html',
        schema: {
            body: ConvertSchema,
        },
        handler: async function (this: FastifyInstance, request: FastifyRequest<{ Body: IConvertSchema }>, reply: FastifyReply): Promise<FastifyReply> {
            const html = generateHTML(request.body);

            return reply.code(200).type('text/html').send(html);
        },
    })

    fastify.route({
        method: 'GET',
        url: '/pdf',
        handler: async function (this: FastifyInstance, request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
            const html = await generatePDF(expHtml);

            return reply
                .code(200)
                .header('Content-Type', 'application/pdf')
                .header('Content-Disposition', 'attachment; filename="document.pdf"')
                .send(html);
        },
    });

    fastify.route({
        method: 'POST',
        url: '/pdf',
        schema: {
            body: ConvertSchema,
        },
        handler: async function (this: FastifyInstance, request: FastifyRequest<{ Body: IConvertSchema }>, reply: FastifyReply): Promise<FastifyReply> {
            const html = await generatePDF(request.body);

            return reply
                .code(200)
                .header('Content-Type', 'application/pdf')
                .header('Content-Disposition', 'attachment; filename="document.pdf"')
                .send(html);
        },
    });
}

