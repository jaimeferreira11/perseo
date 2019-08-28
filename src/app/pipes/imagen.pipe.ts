import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, metodo: string = 'public' ): any {


    let url = environment.API + '/' + metodo + '/images';


    if ( !img ) {

      return url + '/commons/no-img.jpg';
    }

    if (typeof img === 'undefined') {

      return url + '/commons/no-img.jpg';
    }

    if ( img.indexOf('http') >= 0 ) {
        return img;
    }

    return url  + '/' + img;
  }

}
