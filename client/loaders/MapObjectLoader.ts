export interface MapObjectData {
    name?: string,
    hp: number,
    speed: number,
    jump: number,
    standing: {
        frames: number,
        interval: number
    },
    walking: {
        frames: number,
        interval: number
    },
    jumping: {
        frames: number,
        interval: number
    }
}

interface MapObjectDataType {
    [key: string]: MapObjectData;
}

export default class MapObjectLoader {

    private static cache: MapObjectDataType = {};

    public static async loadObject(path: string): Promise<MapObjectData> {

        if (MapObjectLoader.cache[path]) {
            return Promise.resolve(MapObjectLoader.cache[path]);
        }

        const response = await fetch("/assets/data/" + path + ".json");
        const data: MapObjectData = await response.json();

        MapObjectLoader.cache[path] = data;

        return data;
    }
}
