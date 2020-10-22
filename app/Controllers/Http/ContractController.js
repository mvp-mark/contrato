'use strict'
const Contract = use("App/Models/Contract");
const { validateAll } = use("Validator");

class ContractController {
    async index({response}){
        const contracts = await Contract.query().with('hired').with('user').fetch();
        return response.status(200).json({contracts})

    }
    async store({ auth, jwt, request, response }) {
        const data = request.only([
          "hired_id",
          "contract",
          "object",
          "value_monthly",
          "finish_date",
          "value_global",
          "modality",
          "supervisor",
          "status",
          "additive",
        ]);
    
        const validation = await validateAll(data, {
          hired_id: "required",
          contract: "required",
          object: "required",
          value_monthly: "required",
          finish_date: "required",
          value_global: "required",
          modality: "required",
          supervisor: "required",
          status: "required",
          // additive: "",
        });
    
        if (validation.fails()) {
          jwt.withErrors(validation.messages()).flashAll();
    
          return response.redirect("back");
        }
    
        /**
         * Creating a new post through the logged in user
         * into the database.
         *
         * ref: http://adonisjs.com/docs/4.1/lucid#_create
         */
        const currentUser = await auth.getUser();
        await currentUser.contracts().create(data);
    
        return response.redirect("/");
    }

    async edit({ params, request, response, view }) {
        const contract = await Contract.find(params.id)
        const company = await Company.all();
    console.log({contract:contract.toJSON()});
    console.log(contract)
    
        return view.render("contracts.edit", { contract:contract.toJSON(),  company: company.toJSON() });
      }
    
      async info({ params, request, response, view }) {
        const contract = await  Contract.query().with('hired').with('user').where('id', params.id).first();
    
    
        console.log({contracts:contract});
    
        return view.render("contracts.info", { contracts:contract.toJSON()});
      }
    
      /**
       * Update contract details.
       * PUT or PATCH contracts/:id
       *
       * @param {object} ctx
       * @param {Request} ctx.request
       * @param {Response} ctx.response
       */
      async update({ params, request, response,  jwt }) {
        const data = request.only([
          "hired_id",
          "contract",
          "object",
          "value_monthly",
          "finish_date",
          "value_global",
          "modality",
          "supervisor",
          "status",
          "additive",
        ]);
    
        /**
         * Validating our data.
         *
         * ref: http://adonisjs.com/docs/4.1/validator
         */
        const validation = await validateAll(data, {
          hired_id: "required",
          contract: "required",
          object: "required",
          value_monthly: "required",
          finish_date: "required",
          value_global: "required",
          modality: "required",
          supervisor: "required",
          status: "required",
          additive: "required",
        });
    
        /**
         * If validation fails, early returns with validation message.
         */
    
        if (validation.fails()) {
          jwt.withErrors(validation.messages()).flashAll();
    
          return response.redirect("back");
        }
        const contract = await Contract.findOrFail(params.id);
        contract.merge(data);
        await contract.save();
    
        return response.redirect("/");
      }
    
      /**
       * Delete a contract with id.
       * DELETE contracts/:id
       *
       * @param {object} ctx
       * @param {Request} ctx.request
       * @param {Response} ctx.response
       */
      async destroy({ params, request, response }) {
        const contract = await Contract.findOrFail(params.id);
        await contract.delete();
    
        return response.redirect("/");
      }

}

module.exports = ContractController
