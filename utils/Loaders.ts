export class Loaders {

    static async getImageFormFile(file: File): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            const img = new Image();

            reader.addEventListener('load', async () => {
                img.src = reader.result as string;

                resolve(await Loaders.waitToImageLoad(img));
            }, false);
        });
    }


    static async getImageByPath(path: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = path;

            img.addEventListener('load', () => {
                resolve(img);
            });
            img.addEventListener('error', () => {
                reject(`Image „${path}“ cannot be loaded.`);
            });
        });
    }


    static async waitToImageLoad(img: HTMLImageElement): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const src = img.src;
            img.src = src;
            img.addEventListener('load', () => {
                resolve(img);
            })
        });
    }
}