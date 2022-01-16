const rules = ['home', 'company', 'departments']

const modules = import.meta.globEager('../modules/**/routes.js')

let routesModules = rules.map((key) => modules[`../modules/${key}/routes.js`].default)

routesModules = routesModules.flat()

export default routesModules
