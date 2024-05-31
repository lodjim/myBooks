// This file is auto-generated by @hey-api/openapi-ts

export const $Body_addNewBooks_add_new_book_post = {
    properties: {
        file: {
            type: 'string',
            format: 'binary',
            title: 'File'
        }
    },
    type: 'object',
    required: ['file'],
    title: 'Body_addNewBooks_add_new_book_post'
} as const;

export const $HTTPValidationError = {
    properties: {
        detail: {
            items: {
                '$ref': '#/components/schemas/ValidationError'
            },
            type: 'array',
            title: 'Detail'
        }
    },
    type: 'object',
    title: 'HTTPValidationError'
} as const;

export const $HealthResponse = {
    properties: {
        state: {
            type: 'string',
            title: 'State',
            default: 'good'
        }
    },
    type: 'object',
    title: 'HealthResponse'
} as const;

export const $Response = {
    properties: {
        message: {
            type: 'string',
            title: 'Message'
        }
    },
    type: 'object',
    required: ['message'],
    title: 'Response'
} as const;

export const $ValidationError = {
    properties: {
        loc: {
            items: {
                anyOf: [
                    {
                        type: 'string'
                    },
                    {
                        type: 'integer'
                    }
                ]
            },
            type: 'array',
            title: 'Location'
        },
        msg: {
            type: 'string',
            title: 'Message'
        },
        type: {
            type: 'string',
            title: 'Error Type'
        }
    },
    type: 'object',
    required: ['loc', 'msg', 'type'],
    title: 'ValidationError'
} as const;