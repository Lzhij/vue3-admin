const components = import.meta.globEager('./**.vue')
const myComponents = Object.keys(components).map((item) => components[item].default)

export default {
  install(vue) {
    myComponents.forEach((item) => {
      vue.component(item.name, item)
    })
  }
}
