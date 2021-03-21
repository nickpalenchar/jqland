/** Build the worlds into their JSON files
 *
 * node build.js
 * node build.js [worldfile] - build a specific world file - NOT DONE
 *
 * **/
const fs = require('fs');
const path = require('path')

async function main(inputdir='.', outputdir='../game/') {
    for (const file of (await fs.promises.readdir(process.cwd())).filter(f => f.startsWith('W'))) {
        const worlddata = require('./' + path.join(inputdir, file));
        const world = buildWorldFromObject(worlddata);
        await fs.promises.writeFile(path.join(outputdir, worlddata.filename), JSON.stringify(world, null, 2));
    }
}

function buildWorldFromObject(worlddata) {
    let result = createWorld(worlddata.header || {});

    for (let i = 0; i < worlddata.quests.length; i++) {
        const {quest, hints} = worlddata.quests[i];
        addQuestToWorld({quest, hints}, result);
    }

    result.data = worlddata.data;
    const footer = worlddata.footer || {};
    result = {...result, ...footer};
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
    world.quests.push(questdata.quest);
    world.hints.push(questdata.hints || null);
}


const [OUTPUT='../game'] = process.argv.slice(2);


main();
console.log("Remember to run `cat W00-0.json | jq . > answers/00-1.json to update that answer!");
