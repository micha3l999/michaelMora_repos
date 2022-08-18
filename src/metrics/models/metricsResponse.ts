import { OmitType } from "@nestjs/mapped-types";
import { Metrics } from "../../entities";

export class MetricsResponse extends OmitType(Metrics, ['coverage', 'repository'] as const) {
    public name: string;
    public tribe: string;
    public organization: string;
    public verificationState: string | null;
    public state: string;
    public coverage: string;
}