// TBD if requiring additional modules is a need for this custom extension
// const { NodeVM } = require('vm2')
// exports.run = async function (options) {
//     options = this.parse(options)
//     const data = options.data
//     const vm = new NodeVM({ sandbox: { data } })
//     try {
//         return vm.run('module.exports =' + options.code)
//     } catch (e) { console.error('Failed to execute script.', e); }
// }
const vm = require('vm')
exports.run = async function (options) {
    options = this.parse(options)
    data = options.data || {}
    vm.createContext(data)
    try {
        const script = new vm.Script(options.code, "RunJS");
        return script.runInContext(data);
    } catch (e) { console.error('Failed to execute script.', e); }
}