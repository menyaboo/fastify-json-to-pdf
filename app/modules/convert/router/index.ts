import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import {ConvertSchema, IConvertSchema} from "../schemas";
import {html} from "../../../common/static";
import {generatePDF} from "../utils/indes";


export async function PdfConverterRouter(fastify: FastifyInstance) {
    fastify.route({
        method: 'GET',
        url: '',
        handler: async function (this: FastifyInstance, request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
            const pdf = await generatePDF(html);

            return reply
                .code(200)
                .header('Content-Type', 'application/pdf')
                .header('Content-Disposition', 'attachment; filename="document.pdf"')
                .send(pdf);
        },
    })

    fastify.route({
        method: 'GET',
        url: '/html',
        handler: async function (this: FastifyInstance, request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
            const pdf = await generatePDF(html, false);

            return reply.code(201).type('text/html').send(pdf);
        },
    })

    fastify.route({
        method: 'POST',
        url: '',
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

