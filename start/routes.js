'use strict'

// const AuthController = require('../app/Controllers/Http/AuthController');

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.post('/cadastrar', 'AuthController.cadastrar');
Route.post('/login', 'AuthController.login');

Route.post('/api/v1/contract', 'ContractController.store');
Route.get('/table', 'ContractController.index');
Route.post('/api/v1/company', 'CompanyController.store');