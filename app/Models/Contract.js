'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Contract extends Model {
    static get dates () {
        return super.dates.concat(['finish_date'])
      }
    
    static formatDates (field, value) {
         if (field === 'finish_date') {
            //  return value.format('DD/MM/YYYY')
            }
         return super.formatDates(field, value)
       }
    

      static castDates(field, value) {
        if (field === 'finish_date')  return value ? value.format("DD/MM/YYYY") : value;
        else return value ? value.format("DD/MM/YYYY") : value;
        // {
        //   return value.format('DD-MM-YYYY')
        // }
      }
      user() {
        return this.belongsTo("App/Models/User");
      }
      hired() {
        return this.belongsTo("App/Models/Company",'hired_id', 'id');
      
    }
}

module.exports = Contract
