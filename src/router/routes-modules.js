const rules = ['home', 'company', 'departments']

const modules = import.meta.globEager('../modules/**/routes.js')

const routesModules = rules.map((key) => modules[`../modules/${key}/routes.js`].default)

export default routesModules
