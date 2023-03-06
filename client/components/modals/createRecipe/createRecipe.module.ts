import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap/modal';
import {CreateRecipeComponent} from './createRecipe.component';

@NgModule({
    imports: [
        ModalModule.forRoot(),
        BrowserModule,
        FormsModule,
        ModalModule.forRoot()
    ],
    declarations: [
        CreateRecipeComponent
    ],

    exports: [
        CreateRecipeComponent,
    ],

    providers: [],
})
export class CreateRecipeModule {}
