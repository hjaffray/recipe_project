import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap/modal';
import {CreateReviewComponent} from "./createReview.component";

@NgModule({
    imports: [
        ModalModule.forRoot(),
        BrowserModule,
        FormsModule,
        ModalModule.forRoot()
    ],
    declarations: [
        CreateReviewComponent,
    ],

    exports: [
        CreateReviewComponent,
    ],

    providers: [],
})
export class CreateReviewModule {}
