const CONTENT = {
    '0': 'success',
    '-9999': 'failure'
}

const Result = function(code, data) {
    this.code = code;
    this.msg = CONTENT['' + code];
    this.result = data;
}

Result.success = function(data) {

}

module.exports = Result;