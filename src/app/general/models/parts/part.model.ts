import { FormGroup } from '@angular/forms';

export class PartModel {
    id = 0;
    description = '';
    averagePrice = 0;
    crewCost = 0;
    priceB = 0;
    priceC = 0;
    active = true;

    public static createInstance(id: number, form: FormGroup) {
        const part = new PartModel();
        part.id = id;
        part.description = form.value['description'];
        part.averagePrice = form.value['averagePrice'];
        part.crewCost = form.value['crewCost'];
        part.priceB = form.value['priceB'];
        part.priceC = form.value['priceC'];
        part.active = form.value['active'];
        return part;
    }
}
