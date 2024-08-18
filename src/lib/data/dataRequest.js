import instance from "../axios/api";

//set you own api key here
const apiKey = "";

const get = async ({ url, offset = 0 }) => {
    return await instance.get(url + "apiKey=" + apiKey + "&offset=" + offset);
};

const getCurrentMatches = async (offset) => {
    const res = await get({ url: "cricScore?", offset: offset });
    return { data: res?.data?.data, offset: res?.data?.info?.totalRows ?? 0 };
};

const getPlayers = async (offset) => {
    const res = await get({ url: "players?", offset: offset });
    return { data: res?.data?.data, offset: res?.data?.info?.totalRows ?? 0 };
};

const getPlayer = async (id) => {
    const res = await get({ url: `players_info?id=${id}&` });
    return res?.data?.data;
};

export { getCurrentMatches, getPlayers, getPlayer };
