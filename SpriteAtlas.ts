import { ImageSliceObject } from "./renderables/ImageSliceObject.js";


// TODO: dodělat
export class SpriteAtlas {

    readonly source: HTMLImageElement;

    readonly slices: ImageSliceObject[] = [];

    constructor(sourceImage: HTMLImageElement, data: IAtlasData) {
        if (sourceImage.naturalWidth == 0 || sourceImage.naturalHeight == 0) {
            throw new Error("The image is not fully loaded.");
        }

        this.source = sourceImage;

        for (const name in data) {
            if (data.hasOwnProperty(name)) {
                const item = data[name];

                const imageSlice = new ImageSliceObject(this.source, item.x, item.y, item.width, item.height);
                this.slices.push(imageSlice);
            }
        }
    }
}



export interface IAtlasData {
    [name: string]: {
        x: number,
        y: number,
        width: number,
        height: number,
    }
}