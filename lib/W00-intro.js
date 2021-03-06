const chalk = require('chalk');
const {DOQUEST_COMMAND} = require('./constants.json');
const FILENAME = 'W00-intro.json';

const header = {
    "     ██╗ ██████╗      ██╗      █████╗ ███╗   ██╗██████╗ ": "",
    "     ██║██╔═══██╗     ██║     ██╔══██╗████╗  ██║██╔══██╗": "",
    "     ██║██║   ██║ ██║ ██║     ███████║██╔██╗ ██║██║  ██║": "",
    "██   ██║██ ▄▄ ██║     ██║     ██╔══██║██║╚██╗██║██║  ██║": "",
    "╚█████╔╝╚█████ ╔╝     ███████╗██║  ██║██║ ╚████║██████╔╝": "",
    " ╚════╝  ╚══▀▀▀╝      ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ": "",
    "          ": "|",
    "START HERE": "v",
    "Run this command on the command line": "jq -r '.quests[0]' W00-intro.json"
}

const quest0 = {
    quest: "Each \"World\" file has a quests array, with a challenge to complete with jq.\nthis is the beginning of your jq journey.\n\nStart by running 'jq --help' on the command line. Look for the example and try \nrunning it. Save the output of the example by adding '> questlog/00-0.json' to \nthe end of the example command.\n\n" +
        "" +
        "?> Save the output from the example in `jq --help` to your questlog." +
        "\n\nIf you need a hint, run `cat W00-intro.json | jq '.hints[0][0]'` on the command line.\n\nTo test your result, run './doquest 00 0'\n\nWhen you're ready to move on, run `jq -r '.quests[1]' W00-intro.json`",
    hints: [
        "The result should look something like `echo ___ | jq ___ > questlog/00-0.json` \n\nRun `cat W00-intro.json | jq '.hints[0][1]' -r` For the next hint.",
        "Try `echo '{\"foo\": \"bar\"}' | jq '.' > questlog/00-0.json`"
    ]
};

const quest1 = {
    quest: "Some things to know:\n\n  ~ You should output these quests with the \"raw\" option (i.e. `cat W00-intro.json | jq -r '.quests[1]'`) for better reading and accurate copy/pasting.\n\n  ~ The answer will always be the output of the correct jq, written to a file saved under questlog/. Name formatting is WW-Q.json, where WW is the two digit world, and Q is the single digit quest number.\n\nEXAMPLE:\n  To read this you performed jq on "+chalk.green("W00-intro.json")+". World is 00.\n  You accessed the 1st index in the quests array (`.quests[1]`). Quest is 1.\n  combined, that's 00-1.json\n  (don't forget to use `tee` or redirect output (`> questlog/00-1.json`) to quickly save." +
        "" +
        "\n\n"+chalk.bold("?> In the last quest you used `jq .` to pretty-print a json string. Can you cat the contents of this entire file using jq?")+
        "\n\n(remember to save it as questlog/00-1.json\n" +
        `(For hints, run \`cat ${FILENAME} | jq '.hints[1][0]`,

    hints: ['You just printed this with `jq .hints[1][0]`. Printing _everything_ would involve just a dot for the jq expression.']
};

const quest2 = {
    quest: `${chalk.cyan("QUEST TIP: You can pipe your jq to ")+chalk.yellow(DOQUEST_COMMAND)+chalk.cyan(" to check an answer before you save it.\n" +
        "For example, the following solves the previous quest: ")+chalk.yellow("\ncat "+FILENAME+" | jq . | "+DOQUEST_COMMAND+" 00 0")}

The \`.\` in jq is the "identity" filter, which simply prints the entire contents. Adding a word after access the key and print the value.

${chalk.bold("?> Most worlds have a .data property containing lots more json to operate on for the quest. Can you output the entire\ncontents of the data property in this file?")}`,
    hints: ['You just printed this with `jq \'.hints[2][0]`. Printing the entire contents of the hints array would be\n ' +
    '`jq \'.hints\'. The name of the key you\'re trying to print the entire contents of now is `data`']
}


module.exports = {
    filename: FILENAME,
    header,
    footer: {"":"", "What are you doing down here?": "If you ran `cat` on this file, maybe try running `head` instead."},
    quests: [quest0, quest1, quest2],
    data: {hello: 'jq warrior!'}
}