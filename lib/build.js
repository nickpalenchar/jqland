/** Build the worlds into their JSON files
 *
 * node build.js
 * node build.js [worldfile] - build a specific world file - NOT DONE
 *
 * **/
const fs = require('fs');
const path = require('path')

async function main(inputdir='.', outputdir='../') {
    for (const file of (await fs.promises.readdir(process.cwd())).filter(f => f.startsWith('W'))) {
        const worlddata = require('./' + path.join(inputdir, file));
        const world = buildWorldFromObject(worlddata);
        await fs.promises.writeFile(path.join(outputdir, worlddata.filename), JSON.stringify(world, null, 2));
    }
}

function buildWorldFromObject(worlddata) {
    const result = createWorld(worlddata.header || {});

    for (let i = 0; i < worlddata.quests.length; i++) {
        const {quest, hints} = worlddata.quests[i];
        addQuestToWorld({quest, hints}, result);
    }

    return result;
}

function createWorld(header={}) {
    return {...header,
        quests: [],
        hints: [],
        data: null
    }
}

function addQuestToWorld(questdata, world) {
    console.log(questdata)
    world.quests.push(questdata.quest);
    world.hints.push(questdata.hints || null);
}


const [OUTPUT='../game'] = process.argv.slice(2);


main();
