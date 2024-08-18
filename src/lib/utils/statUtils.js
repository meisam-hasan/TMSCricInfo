export const MatchType = ["test", "odi", "t20i"];
export const BattingStatsConstant = [
    "m",
    "inn",
    "no",
    "runs",
    "hs",
    "avg",
    "bf",
    "sr",
];

export const BattingStatsRunsConstant = ["100s", "200s", "50s", "4s", "6s"];

export const BowlingStatsConstant = [
    "m",
    "inn",
    "b",
    "runs",
    "wkts",
    "bbi",
    "bbm",
    "econ",
];

export const BowlingStatsRunsConstants = ["avg", "sr", "5w", "10w"];

const getTableRowArray = (player = [], skill, matchType, stats) => {
    return player
        .filter((item) => item.fn === skill && item.matchtype === matchType)
        .reduce((table, item) => {
            table[stats.indexOf(item.stat)] = item.value;
            return table;
        }, Array(stats.length).fill(0));
};

const getTableArray = (player, skill, stats) => {
    return MatchType.map((type) =>
        getTableRowArray(player, skill, type, stats)
    );
};

export { getTableArray };
