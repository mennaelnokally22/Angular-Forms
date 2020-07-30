import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TemplateDrivenFormComponent } from "./template-driven-form/template-driven-form.component";
import { ReactiveFormComponent } from "./reactive-form/reactive-form.component";

const routes: Routes = [
  { path: "template-driven", component: TemplateDrivenFormComponent },
  { path: "", component: ReactiveFormComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
