import { FormGroup } from '@angular/forms';

export class PartModel {
    id = 0;
    description = '';
    averagePrice = 0;
    crewCost = 0;
    priceB = 0;
    priceC = 0;
    active = true;
    jobTypeId = 0;

    public static createInstance(id: number, form: FormGroup) {
        const part = new PartModel();
        part.id = id;
        part.description = form.value['description'];
        part.averagePrice = form.value['averagePrice'];
        part.crewCost = form.value['crewCost'];
        part.priceB = form.value['priceB'];
        part.priceC = form.value['priceC'];
        part.active = form.value['active'];
        part.jobTypeId = form.value['jobTypeId'];
        return part;
    }

    public static cloneInstance(existing: PartModel): PartModel {
        const part = new PartModel();
        part.id = existing.id;
        part.description = existing.description;
        part.averagePrice = existing.averagePrice;
        part.crewCost = existing.crewCost;
        part.priceB = existing.priceB;
        part.priceC = existing.priceC;
        part.active = existing.active;
        part.jobTypeId = existing.jobTypeId;
        return part;
    }
}
