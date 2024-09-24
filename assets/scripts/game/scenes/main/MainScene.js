import { Scene } from "../../classes/Scene.js";
import { SongList } from "./_elements/SongList.js";

class MainScene extends Scene {
    constructor(game) {
        super(game);

        this.elementHolder.addElement("songList", new SongList(game));
    }
}

export { MainScene };
