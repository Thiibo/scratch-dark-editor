import { readFile } from "./fs";

export default {
    header: await readFile("@/src/header.txt"),
}
