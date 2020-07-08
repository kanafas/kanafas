export class Regex {
    static breakLines(trim = false) {
        if (trim)
            return Regex._regexp.breakTrimedLines;
        else
            return Regex._regexp.breakLines;
    }
}
Regex._regexp = {
    breakLines: /\r{0,1}\n/g,
    breakTrimedLines: /[[:blank:]]*\r{0,1}\n[[:blank:]]*/g,
};
