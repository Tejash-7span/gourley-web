import { WorkType } from '../enums/worktype.enum';

export function GetWorkTypeName(type: WorkType) {
    switch (type) {
        case WorkType.DryWall:
            return 'Draywall';
        case WorkType.Stone:
            return 'Stone';
        case WorkType.Stucco:
            return 'Stucco';
        default:
            return null;
    }
}

export function isTypeValid(workType: any) {
    return (workType === WorkType.DryWall) || (workType === WorkType.Stone) || (workType === WorkType.Stucco);
}
