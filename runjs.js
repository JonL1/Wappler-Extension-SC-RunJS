const vm = require('vm')
exports.run = async function (options) {
    var code = `(${options.async_function ? 'async' : ''} function() { ${options.code} } )()`
    let data = this.parse(options.data) || {}
    if (options.import_require) data = { ...data, require: require }
    if (options.forward_console) data = { ...data, console: console }
    vm.createContext(data)
    const timeout = this.parseOptional(options.timeout, 'number', 30000)
    const show_errors = this.parseOptional(options.show_errors, 'boolean', false)
    const throw_errors = this.parseOptional(options.throw_errors, 'boolean', false)
    try {
        const script = new vm.Script(code, "RunJS");
        return await script.runInContext(data, { displayErrors: show_errors, timeout: timeout })
    } catch (e) { 
        if (show_errors) console.error('Failed to execute script.', e);
        if (throw_errors) throw e;
    }
}
