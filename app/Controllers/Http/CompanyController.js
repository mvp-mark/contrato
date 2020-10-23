'use strict'

const { validateAll } = use("Validator");
const Company = use("App/Models/Company");

class CompanyController {
    async store({ auth, session, request, response }) {
        const data = request.only([
          "name",
          "company_name",
          "cnpj",
          "address",
          "tel",
          "category",
        ]);
    
        const validation = await validateAll(data, {
          name: "required",
          company_name: "required",
          cnpj: "required",
          address: "required",
          tel: "required",
          category: "required",
        });
    
        if (validation.fails()) {
          session.withErrors(validation.messages()).flashAll();
    
          return response.redirect("back");
        }
        const currentUser = await auth.getUser();
       const company = await currentUser.companys().create(data);
    
        return response.status(200).send(company);
    }
}

module.exports = CompanyController
