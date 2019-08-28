import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { DocPipe } from './doc.pipe';




@NgModule({
  declarations: [ ImagenPipe, DocPipe ],
  imports: [ ],
  exports: [ ImagenPipe, DocPipe ]
})
export class PipesModule { }
