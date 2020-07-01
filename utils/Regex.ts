const regexp = {
    breakLines: /\r{0,1}\n/g,
    breakTrimedLines: /[[:blank:]]*\r{0,1}\n[[:blank:]]*/g,
};


export namespace Regex {

    export const breakLines = (trim: boolean = false) => {
        if (trim) return regexp.breakTrimedLines;
        else return regexp.breakLines;
    }

}