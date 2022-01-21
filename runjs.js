const vm = require('vm')
exports.run = async function (options) {
    const code = options.code
    const data = this.parse(options.data) || {}
    const timeout = this.parseOptional(options.timeout, 'number', 30000)
    const show_errors = this.parseOptional(options.show_errors, 'boolean', false)
    vm.createContext(data)
    try {
        const script = new vm.Script(code, "RunJS");
        return await script.runInContext(data, { displayErrors: show_errors, timeout: timeout });
    } catch (e) { if (show_errors) console.error('Failed to execute script.', e); }
}