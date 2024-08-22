import Joi from 'joi';

export const ConvertSchema = Joi.object({
    title: Joi.string().required(),
    questions_about_tale: Joi.array().items(Joi.string()).required(),
    chapters: Joi.array().items(
        Joi.object({
            title: Joi.string().required(),
            text: Joi.string().required(),
            pic_generation: Joi.string().required(),
        })
    ).required(),
});

export type IConvertSchema = {
    title: string;
    questions_about_tale: string[];
    chapters: {
        title: string;
        text: string;
        pic_generation: string;
    }[];
};
