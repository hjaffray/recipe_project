import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { TooltipModule, TooltipConfig } from 'ngx-bootstrap/tooltip';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RecipesComponent } from './recipes.component';
import { ReviewsComponent} from "../reviews/reviews.component";
import {CreateReviewModule} from "../../components/modals/createReview/createReview.module";
import { DemoTooltipPlacementComponent} from "../reviews/toolTip.component";


export const ROUTES: Routes = [
    { path: 'recipes/:id', component: RecipesComponent },
    { path: 'recipes/:id/reviews/:reviewId', component: ReviewsComponent}
];

// update @NgModule declaration to be as follows:
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        RouterModule.forChild(ROUTES),
        TooltipModule.forRoot(),
        CreateReviewModule,
    ],
    declarations: [
        RecipesComponent,
        ReviewsComponent,
        DemoTooltipPlacementComponent,
    ],

    exports: [
        RecipesComponent,
        ReviewsComponent,
        DemoTooltipPlacementComponent,
    ],

    providers: []
})
export class RecipesModule {}
