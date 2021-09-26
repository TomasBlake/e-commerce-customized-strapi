const { sanitizeEntity } = require('strapi-utils');
'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    snipcartParser: async (ctx) => {
        let products = await strapi.services.product.find(ctx.query);
        strapi.log.debug("TESTTTTTT", products);

        return products.map(product => {
            return {
            id: product.id,
            name: product.Name,
            description: product.Description,
            price: product.Price,
            url: "https://snipcart-strapi.herokuapp.com/snipcartParser"
            }
        })
    },
    delete: async (ctx) => {
        const { id } = ctx.params;
        strapi.log.debug("TESTT!!!!!", id);
        const response = await axios.delete(`${env(SNIPCARD_MAIN_API_ENDPOINT)}/products/${id}`,{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Basic${Buffer.from(env(SNIPCART_SECRETE_API_KEY), 'base64')}`
            }
        });
        strapi.log.debug("RESPONSE:", response);
        const entity = await strapi.services.restaurant.delete({ id });
        return sanitizeEntity(entity, { model: strapi.models.restaurant });
      }
};
