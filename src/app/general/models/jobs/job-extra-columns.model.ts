import { WorkType } from '../../enums/worktype.enum';

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

    public static createInstance(type: WorkType): JobExtraColumnsModel {
        switch (type) {
            case WorkType.DryWall:
                return new JobExtraColumnsModel(
                    new Column('Stock', 'stock'),
                    new Column('Hang', 'hang'),
                    new Column('Finish', 'finish'),
                    new Column('Spray', 'spray'));
            case WorkType.Stone:
                return new JobExtraColumnsModel(
                    new Column('Stock', 'stock'),
                    new Column('Measure', 'measure'),
                    new Column('Order', 'orderActivity'),
                    new Column('Set', 'setActivity'));
            case WorkType.Stucco:
                return new JobExtraColumnsModel(
                    new Column('Take Off', 'takeOff'),
                    new Column('Lathe', 'lathe'),
                    new Column('Setup', 'setup'),
                    new Column('Crew'));
        }
    }
}

export class Column {
    name: string;
    property: string;

    constructor(name: string, property: string = null) {
        this.name = name;
        this.property = property == null ? name : property;
    }
}
