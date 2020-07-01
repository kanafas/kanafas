export namespace Strings {

    export const padLeft = (s: string, length: number, pad: string): string => {
        if (s.length > length) return s;

        const repeat = Math.ceil((length - s.length) / pad.length);
        const full = Array(repeat + 1).join(pad) + s;

        return full.substring(full.length - length, full.length);
    }
    
    export const padRight = (s: string, length: number, pad: string): string => {
        if (s.length > length) return s;

        const repeat = Math.ceil((length - s.length) / pad.length);
        const full = s + Array(repeat + 1).join(pad);

        return full.substring(0, length);
    }

}
