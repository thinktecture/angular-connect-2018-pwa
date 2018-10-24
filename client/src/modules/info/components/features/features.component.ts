import {Component, OnInit} from '@angular/core';
import {FeatureService} from '../../../shared/services/feature.service';

@Component({
    templateUrl: 'features.component.html',
})
export class FeaturesComponent implements OnInit {
    features: Array<any>;
    title: string;

    constructor(private _featureService: FeatureService) {
    }

    ngOnInit() {
        this.features = this._featureService.detectFeatures();
        this.title = `${this._featureService.getBrowserName().toUpperCase()} - ${this._featureService.getBrowserVersion()}`;
    }
}
