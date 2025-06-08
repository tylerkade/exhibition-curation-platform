import { Filter } from "bad-words";

const profanityFilter = new Filter();
profanityFilter.removeWords("hell"); // I'm Removing hell due to it being depiected in many (religious) artworks

export default profanityFilter;
