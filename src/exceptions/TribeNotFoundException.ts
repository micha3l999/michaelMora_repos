import { HttpException, HttpStatus } from "@nestjs/common";

export class TribeNotFoundException extends HttpException {
    constructor() {
        super('La tribu no se encuentra registrada', HttpStatus.BAD_REQUEST)
    }
}