import {Direction} from "../types/Direction";

export default interface Car {
    top: number,
    offset: number,
    speed: number,
    amount: number,
    direction: Direction
}