import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { TooltipModule, TooltipConfig } from 'ngx-bootstrap/tooltip';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainComponent } from './main.component';
import { ChildComponent} from "./child.component";
import {UserService} from '../../components/services/user.service';
import {UpdateUserModule} from '../../components/modals/updateUser/updateUser.module';
import { CreateUserModule } from '../../components/modals/createUser/createUser.module';
import { CreateRecipeModule} from '../../components/modals/createRecipe/createRecipe.module';
import {RecipeService} from "../../components/services/recipe.service";
import {UpdateRecipeModule} from "../../components/modals/updateRecipe/updateRecipe.module";

export const ROUTES: Routes = [
    { path: 'home', component: MainComponent },
];

// update @NgModule declaration to be as follows:
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        UpdateUserModule,
        CreateUserModule,
        CreateRecipeModule,
        UpdateRecipeModule,

        RouterModule.forChild(ROUTES),

        TooltipModule.forRoot(),
    ],
    declarations: [
        MainComponent,
        ChildComponent,

    ],

    exports: [
        MainComponent,
        ChildComponent,
    ],

    providers: [
        UserService,
        RecipeService,
    ]
})
export class MainModule {}
