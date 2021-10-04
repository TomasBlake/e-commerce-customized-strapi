const { sanitizeEntity } = require('strapi-utils');
'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    snipcartParser: async (ctx) => {
        let products = await strapi.services.product.find(ctx.query);

        return products.map(product => {
            return {
            id: product.id,
            name: product.Name,
            description: product.Description,
            price: product.Price,
            url: "https://snipcart-strapi.herokuapp.com/snipcartParser"
            }
        })
    }
};
