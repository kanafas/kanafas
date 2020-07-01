const regexp = {
    breakLines: /\r{0,1}\n/g,
    breakTrimedLines: /[[:blank:]]*\r{0,1}\n[[:blank:]]*/g,
};
export var Regex;
(function (Regex) {
    Regex.breakLines = (trim = false) => {
        if (trim)
            return regexp.breakTrimedLines;
        else
            return regexp.breakLines;
    };
})(Regex || (Regex = {}));
