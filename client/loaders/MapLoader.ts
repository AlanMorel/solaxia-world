export interface MapData {
    id: number,
    width: number,
    height: number,
    floor: number,
    portals: [MapPortalsData],
    tilers: [MapTilersData]
}

export interface MapPortalsData {
    id: number,
    x: number,
    y: number,
    destMap: number,
    destPortal: number
}

export interface MapTilersData {
    tile: string,
    height: number,
    y: number
}

interface MapDataType {
    [key: number]: MapData;
}

export default class MapLoader {

    public static cache: MapDataType = [];

    public static async loadMap(id: number): Promise<MapData> {
        if (MapLoader.cache[id]) {
            return new Promise(resolve => {
                resolve(MapLoader.cache[id]);
            });
        }

        const response = await fetch("/assets/data/maps/" + id + ".json");
        const data: MapData = await response.json();

        MapLoader.cache[id] = data;

        return data;
    }
}
