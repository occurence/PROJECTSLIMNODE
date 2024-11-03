import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const { PORT } = process.env;
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Products API',
            version: '1.0.0',
            description: 'API documentation for managing contacts and users',
        },
        servers: [
            {url: [`http://localhost:${PORT}`],},
            {url: [`https://nodebackend-bymv.onrender.com/api`],},
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    required: ['name', 'password', 'email'],
                    properties: {
                        _id: {type:'string', description:'The auto-generated ID of the user'},
                        name: {type:'string', description:'The name of the user'},
                        password: {type:'string', description:'The password of the user'},
                        email: {type:'string', unique: true, description:'The email of the user'},
                        accessToken: {type:'string', default:null, description:'The access token of the user'},
                        refreshToken: {type:'string', default:null, description:'The refresh token of the user'},
                    },
                },
                Product: {
                    type: 'object',
                    required: ['categories', 'weight', 'title'],
                    properties: {
                        _id: {type:'string', description:'The auto-generated ID of the product'},
                        categories: {type:'string', description:'The category of the product'},
                        weight: {type:'number', description:'The weight of the product'},
                        title: {type:'string', description:'The title of the product'},
                        calories: {type:'number', description:'The calories of the product'},
                        groupBloodNotAllowed: {
                            type: 'object', additionalProperties: { type: 'boolean' },
                            description: 'A map indicating which food are not allowed for each blood groups'
                        },
                    },
                },
                Today: {
                    type: 'object',
                    required: ['user', 'date', 'height', 'age', 'weight', 'weightDesired', 'blood', 'dailyRate'],
                    properties: {
                        _id: {type:'string', description:'The auto-generated ID of the today'},
                        user: {type:'string', index: true, description:'The user of today'},
                        date: {type:'string', index: true, description:'The date of today'},
                        height: {type:'number', description:'The height of user for today'},
                        age: {type:'number', description:'The age of user for today'},
                        weight: {type:'number', description:'The weight of user for today'},
                        weightDesired: {type:'number', description:'The desired weight of user for today'},
                        blood: {type:'number', description:'The blood of user for today'},
                        dailyRate: {type:'number', description:'The daily rate calorie intake of user for today'},
                        consumed: {type:'number', description:'The consumed calories of user for today'},
                        left: {type:'number', description:'The left calories of user for today'},
                        percentage: {type:'number', description:'The percentage or calories of user for today'},
                        products: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                productId:{type: 'string', description: 'The ID of the product'},
                                productName:{type: 'string', description: 'The name of the product'},
                                grams:{type: 'number', description: 'The amount of product in grams'},
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    apis: ['./routes/api/*.js', './models/*.js'],
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);

export { swaggerSpecs, swaggerUi };