import { getUser, login, register } from "./service.mjs";

/**
 * @openapi
 * /users/login:
 *   post:
 *     summary: "Logs in the user"
 * 
 *     tags:
 *       - "auth"
 *     
 *     operationId: user_login
 *     x-eov-operation-handler: router
 * 
 *     requestBody:
 *       description: Login information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 minLength: 11
 *                 maxLength: 30
 *                 example: example@example.com
 *               password:
 *                 type: string
 *                 example: mypassword
 * 
 *     responses:
 *       '200':
 *         description: "User logged in"
 *       '400':
 *         description: "Invalid data provided"
 *       '401':
 *         description: "Login failed"
 */
export async function user_login(req, res, _) {
  const user = await login(req.body);
  return user ? res.json(user) : res.sendStatus(401);
}

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: "Return an user by ID"
 * 
 *     tags:
 *       - "profile"
 * 
 *     operationId: get_user
 *     x-eov-operation-handler: router
 * 
 *     parameters: 
 *       -  in: path
 *          name: id 
 *          schema: 
 *            type: integer
 *            minimum: 1
 *          required: true
 *          description: "Numeric ID of the user" 
 *   
 *     responses:
 *       '200': 
 *         description: "Returns the user"
 *       '404':
 *         description: "User not found"    
 */
export async function get_user(req, res, _) {
  let id = parseInt(req.params.id);
  const user = await getUser(id);
  return user ? res.json(user) : res.sendStatus(404);  
}

/**
 * @openapi
 * /users/register:
 *   post:
 *     summary: "Register a new user"
 * 
 *     tags:
 *       - "register"
 * 
 *     operationId: create_user
 *     x-eov-operation-handler: router 
 * 
 *     requestBody:
 *       description: "Informations needed to register a new user"
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *               - age
 *               - city
 *               - state
 *             properties:
 *               email:
 *                 type: string
 *                 minLength: 11
 *                 maxLength: 50
 *                 example: example@example.com
 *                 pattern: '(\S)+@(\w{3,})(.com$)'
 *               password:
 *                 type: string
 *                 example: mypassword
 *               name:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 50
 *                 example: "Vinicius José"
 *               age:
 *                 type: integer
 *                 minimum: 18
 *                 example: 21
 *               city:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 30
 *                 example: "Curitiba"
 *               state:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 2
 *                 example: "PR"
 *                 pattern: '[A-Z]{2}'
 * 
 *     responses:
 *       '200':
 *         description: "Sucessful register"
 */
export async function create_user(req, res, _){
  const user = await register(req.body);
  return user ? res.json(user) : res.sendStatus(400);
}