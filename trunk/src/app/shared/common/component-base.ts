import { Injector } from '@angular/core';
// import { _HttpClient } from '@delon/theme';

export abstract class ComponentBase {

    // protected http: _HttpClient;

    constructor(injector: Injector){
        // this.http = injector.get(_HttpClient);
    }
}