const regexp = {
    breakLines: /\r{0,1}\n/g,
    breakTrimedLines: /[[:blank:]]*\r{0,1}\n[[:blank:]]*/g,
};
export class Regex {
    static breakLines(trim = false) {
        if (trim)
            return regexp.breakTrimedLines;
        else
            return regexp.breakLines;
    }
}
