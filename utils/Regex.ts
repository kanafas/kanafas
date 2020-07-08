export class Regex {

    private static _regexp = {
        breakLines: /\r{0,1}\n/g,
        breakTrimedLines: /[[:blank:]]*\r{0,1}\n[[:blank:]]*/g, // TODO: Zkontrolovat platnost výrazu
    };


    static breakLines(trim: boolean = false) {
        if (trim) return Regex._regexp.breakTrimedLines;
        else return Regex._regexp.breakLines;
    }

}