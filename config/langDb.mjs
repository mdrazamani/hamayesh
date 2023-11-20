// import mongoose from "mongoose";
// import { loadLanguageSetting } from "./readLang.mjs";

// const connections = {};

// export const langDbConnection = async () => {
//     const lang = loadLanguageSetting();

//     if (!connections[lang]) {
//         connections[lang] = mongoose.createConnection(
//             `mongodb://127.0.0.1:27017/${lang}_Db`,
//             {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true,
//             }
//         );
//     }

//     return connections[lang];
// };

// export const closeAllConnections = () => {
//     Object.values(connections).forEach((conn) => conn.close());
// };
