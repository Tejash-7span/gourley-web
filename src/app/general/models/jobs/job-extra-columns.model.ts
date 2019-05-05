import { JobTypeEnum } from '../../enums/worktype.enum';

export class JobExtraColumnsModel {
    constructor(column1: Column, column2: Column, column3: Column, column4: Column) {
        this.column1 = column1;
        this.column2 = column2;
        this.column3 = column3;
        this.column4 = column4;
    }
    column1: Column;
    column2: Column;
    column3: Column;
    column4: Column;

    public static createInstance(type: number): JobExtraColumnsModel {
        switch (JobTypeEnum[JobTypeEnum[type]]) {
            case JobTypeEnum.DryWall:
                return new JobExtraColumnsModel(
                    new Column('Stock', 'stockStatusId', 'stockWorkerId'),
                    new Column('Hang', 'hangStatusId', 'hangWorkerId'),
                    new Column('Finish', 'finishStatusId', 'finishWorkerId'),
                    new Column('Spray', 'sprayStatusId', 'sprayWorkerId'));
            case JobTypeEnum.Stone:
                return new JobExtraColumnsModel(
                    new Column('Stock', 'stockStatusId', 'stockWorkerId'),
                    new Column('Measure', 'measureStatusId', 'measureWorkerId'),
                    new Column('Order', 'orderStatusId', 'orderWorkerId'),
                    new Column('Set', 'setStatusId', 'setWorkerId'));
            case JobTypeEnum.Stucco:
                return new JobExtraColumnsModel(
                    new Column('Take Off', 'takeOffStatusId', 'takeOffWorkerId'),
                    new Column('Lathe', 'latheStatusId', 'latheWorkerId'),
                    new Column('Setup', 'setupStatusId', 'setupWorkerId'),
                    new Column('Crew', 'crewStatusId', 'crewWorkerId'));
        }
    }
}

export class Column {
    name: string;
    statusId: string;
    workerId: string;

    constructor(name: string, statusId: string, workerId: string) {
        this.name = name;
        this.statusId = statusId;
        this.workerId = workerId;
    }
}
