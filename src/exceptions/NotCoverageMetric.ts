import { HttpException, HttpStatus } from "@nestjs/common";

export class NotCoverageMetric extends HttpException {
    constructor() {
        super('La Tribu no tiene repositorios que cumplan con la cobertura necesaria', HttpStatus.NOT_FOUND)
    }
}