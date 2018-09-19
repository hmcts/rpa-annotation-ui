import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AnnotationUiLibModule, ViewerComponent } from '../../projects/annotation-ui-lib/src/public_api';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { LineComponent } from './line/line.component';

const appRoutes: Routes = [
  { path: '',  component: ViewerComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    LineComponent
  ],
  imports: [
    BrowserModule,
    AnnotationUiLibModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
